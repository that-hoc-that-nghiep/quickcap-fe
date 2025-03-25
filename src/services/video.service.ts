import { Video } from '@/types'
import { BackendResponse } from '@/types/common'
import { BackendChunkStatusResponse, BackendChunkUploadResponse, UploadStatus } from '@/types/upload'
import { backendInstance } from '@/utils/api'
import { FileWithPath } from '@mantine/dropzone'
import { useSuspenseQuery } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

// Default chunk size: 5MB
const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024

export const uploadVideo = async (file: FileWithPath) => {
    const { data } = await backendInstance.postForm<BackendResponse<Video>>('/video', {
        file
    })
    return data
}

/**
 * Upload a video file in chunks for parallel processing
 * @param file The video file to upload
 * @param chunkSize Size of each chunk in bytes (default: 5MB)
 * @param onProgress Optional progress callback
 * @returns The upload response
 */
export const uploadVideoChunked = async (
    file: File,
    chunkSize = DEFAULT_CHUNK_SIZE,
    onProgress?: (progress: { uploaded: number; total: number; percentage: number }) => void
): Promise<BackendResponse<Video>> => {
    const fileId = uuidv4()
    const fileSize = file.size
    const totalChunks = Math.ceil(fileSize / chunkSize)

    console.log(`Starting chunked upload: fileId=${fileId}, totalChunks=${totalChunks}, fileSize=${fileSize}`)

    // Initialize progress
    if (onProgress) {
        onProgress({
            uploaded: 0,
            total: totalChunks,
            percentage: 0
        })
    }

    // Function to upload a single chunk
    const uploadChunk = async (chunkIndex: number): Promise<BackendChunkUploadResponse | null> => {
        const start = chunkIndex * chunkSize
        const end = Math.min(start + chunkSize, fileSize)
        const chunk = file.slice(start, end)

        // Create a FormData object for this chunk
        const formData = new FormData()
        formData.append('chunk', chunk, file.name)

        try {
            console.log(`Uploading chunk ${chunkIndex}/${totalChunks}, size: ${chunk.size} bytes`)

            const response = await backendInstance.post<BackendChunkUploadResponse>('/video/chunks', formData, {
                params: {
                    fileId,
                    chunkIndex,
                    totalChunks,
                    originalFilename: file.name
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(`Chunk ${chunkIndex} uploaded successfully:`, response.data)

            // If this is the final response with complete video data
            if (response.data?.data?.uploadStatus?.complete) {
                // Return the original response data which already has the correct type
                return response.data
            }

            return response.data
        } catch (error) {
            console.error(`Error uploading chunk ${chunkIndex}:`, error)
            throw error
        }
    }

    // Check upload status
    const checkStatus = async (): Promise<UploadStatus> => {
        try {
            console.log(`Checking status for fileId=${fileId}`)
            const response = await backendInstance.get<BackendChunkStatusResponse>('/video/chunks/status', {
                params: {
                    fileId,
                    totalChunks
                }
            })
            console.log('Status response:', response.data)
            return response.data.data.status
        } catch (error) {
            console.error('Error checking upload status:', error)
            return { uploaded: 0, total: totalChunks, complete: false }
        }
    }

    // Create an array of chunk indexes
    const chunkIndexes = Array.from({ length: totalChunks }, (_, i) => i)

    // Track completed chunks
    const completedChunks = new Set<number>()

    // Upload all chunks in parallel, but limit concurrency
    const MAX_CONCURRENT_UPLOADS = 3
    let activeUploads = 0
    let videoData: BackendResponse<Video> | null = null

    // Process chunks until all are complete or we get a final response
    while (completedChunks.size < totalChunks && !videoData) {
        // Get current status from server
        const status = await checkStatus()

        // Update progress with safe access to properties
        if (onProgress) {
            const uploaded = status?.uploaded || 0
            onProgress({
                uploaded,
                total: totalChunks,
                percentage: Math.round((uploaded / totalChunks) * 100)
            })
        }

        // Add safety check for status before accessing complete property
        if (status && status.complete === true) {
            console.log('Upload is complete according to status check')
            break
        }

        // Determine which chunks need to be uploaded - with safe access
        const chunksToUpload = chunkIndexes.filter(
            (idx) => !completedChunks.has(idx) && (!status?.missingChunks || status.missingChunks.includes(idx))
        )

        console.log(`Chunks to upload in this batch: ${chunksToUpload.length}`)

        // Upload chunks with limited concurrency
        const uploadPromises: Promise<void>[] = []

        for (const chunkIndex of chunksToUpload) {
            if (activeUploads < MAX_CONCURRENT_UPLOADS && !videoData) {
                activeUploads++

                const promise = uploadChunk(chunkIndex)
                    .then((result) => {
                        completedChunks.add(chunkIndex)
                        activeUploads--

                        // If this response contains the final processed video
                        if (result && 'data' in result && 'data' in result.data) {
                            videoData = result as unknown as BackendResponse<Video>
                            console.log('Found completed video in chunk response:', videoData)
                        }
                    })
                    .catch((err) => {
                        console.error(`Error with chunk ${chunkIndex}:`, err)
                        activeUploads--
                    })

                uploadPromises.push(promise)
            }
        }

        if (uploadPromises.length > 0) {
            // Wait for the current batch of uploads to complete
            console.log(`Waiting for ${uploadPromises.length} chunks to complete...`)
            await Promise.all(uploadPromises)
        } else if (activeUploads === 0 && completedChunks.size < totalChunks) {
            // If we're not making progress, wait a bit before checking again
            console.log('No active uploads but upload not complete, waiting...')
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }

    // Final check for completion if we don't have video data yet
    if (!videoData) {
        console.log('Upload process finished but no video data received, doing final checks')

        // Get the final status
        const finalStatus = await checkStatus()

        if (finalStatus && finalStatus.complete === true) {
            console.log('Upload is complete, requesting final video data')

            // Make one additional request to get the processed video data
            try {
                // One last upload of the final chunk to trigger completion
                const finalChunkResponse = await uploadChunk(totalChunks - 1)

                if (finalChunkResponse && 'data' in finalChunkResponse && 'data' in finalChunkResponse.data) {
                    // Cast through unknown first as the server response structure differs but contains the video data
                    videoData = finalChunkResponse as unknown as BackendResponse<Video>
                    console.log('Final video data retrieved:', videoData)
                }
            } catch (error) {
                console.error('Error getting final video data:', error)
            }
        }

        // If we still don't have video data but all chunks are uploaded,
        // we might need to wait for processing to complete
        if (!videoData && completedChunks.size >= totalChunks) {
            console.log('All chunks uploaded but still waiting for processing')

            // Polling for status until we get the video data or timeout
            const startTime = Date.now()
            const TIMEOUT = 30000 // 30 seconds timeout

            while (!videoData && Date.now() - startTime < TIMEOUT) {
                await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds

                const status = await checkStatus()
                if (status && status.complete === true) {
                    try {
                        // Make a separate request for the final processed video
                        console.log(`Getting latest video for fileId=${fileId}`)

                        const response = await backendInstance.get('/video/latest', {
                            params: { fileId }
                        })

                        console.log('Latest video response:', response)

                        if (response.data?.data) {
                            videoData = response.data
                            break
                        }
                    } catch (err) {
                        console.error('Error getting latest video:', err)
                    }
                }
            }
        }
    }

    if (videoData) {
        return videoData
    } else {
        // Add more detailed error information
        const finalStatus = await checkStatus()
        const errorMessage = finalStatus
            ? `Upload incomplete: ${finalStatus.uploaded}/${finalStatus.total} chunks processed`
            : 'Failed to complete video upload: Could not retrieve upload status'
        throw new Error(errorMessage)
    }
}

/**
 * Helper function to check if browser supports the File API and chunked uploads
 */
export const isChunkedUploadSupported = (): boolean => {
    return 'File' in window && 'Blob' in window && 'slice' in Blob.prototype
}

export const getVideosByOrgId = async ({
    orgId,
    limit = 100,
    page = 1,
    keyword,
    categoryId,
    order
}: {
    orgId: string
    limit?: number
    page?: number
    keyword?: string | undefined
    categoryId?: string | undefined
    order?: string
}) => {
    const { data } = await backendInstance.get<BackendResponse<{ videos: Video[] }>>(`video/all/${orgId}`, {
        params: {
            limit,
            page,
            keyword,
            categoryId,
            order
        }
    })

    return data
}

export const useVideos = (
    orgId: string,
    options?: {
        limit?: number
        page?: number
        keyword?: string | undefined
        categoryId?: string | undefined
        order?: string
    }
) => {
    return useSuspenseQuery({
        queryKey: ['videos', orgId, options],
        queryFn: () => getVideosByOrgId({ orgId, ...options })
    })
}

export const getVideoById = async (videoId: string) => {
    const { data } = await backendInstance.get<BackendResponse<Video>>(`video/${videoId}`)
    return data
}

export const useVideo = (videoId: string) => {
    return useSuspenseQuery({
        queryKey: ['video', videoId],
        queryFn: () => getVideoById(videoId)
    })
}

export const updateVideo = async (
    videoId: string,
    body: {
        title?: string
        description?: string
        transcript?: string
        like?: number
        views?: number
        categoryId?: string[]
    }
) => {
    const { data } = await backendInstance.patch<BackendResponse<Video>>(`/video/${videoId}`, {
        ...body
    })
    return data
}

export const addVideoToOrgs = async (payload: { videoId: string; orgId: string; categoryId: string }[]) => {
    const { data } = await backendInstance.patch(`/video/addToOrg`, {
        videoAdds: payload
    })
    return data
}

export const getVideoByOrgIdUnique = async (orgId: string) => {
    const { data } = await backendInstance.get<BackendResponse<Video[]>>(`video/unique/${orgId}`)
    return data
}

export const useVideoByOrgIdUnique = (orgId: string) => {
    return useSuspenseQuery({
        queryKey: ['videos-unique', orgId],
        queryFn: () => getVideoByOrgIdUnique(orgId)
    })
}

export const addCategoryToVideos = async (videoId: string, categoryId: string[]) => {
    const { data } = await backendInstance.patch(`/video/modify/${videoId}/add`, {
        categoryId: [categoryId]
    })
    return data
}

export const removeCategoryToVideos = async (videoId: string, categoryId: string[]) => {
    const { data } = await backendInstance.patch(`/video/modify/${videoId}/remove`, {
        categoryId: categoryId
    })
    return data
}

export const analyticsVideosByOrgId = async (orgId: string) => {
    const { data } = await backendInstance.get<
        BackendResponse<{ totalVideo: number; totalLike: number; totalView: number }>
    >(`video/analytics/${orgId}`)
    return data
}

export const useAnalyticsVideosByOrgId = (orgId: string) => {
    return useSuspenseQuery({
        queryKey: ['analytics-videos', orgId],
        queryFn: () => analyticsVideosByOrgId(orgId)
    })
}

export const deleteVideoById = async (videoId: string, orgId: string) => {
    const { data } = await backendInstance.delete<BackendResponse<Video>>(`/video/${videoId}/${orgId}`)
    return data
}

export const removeVideoFromOrg = async (videoId: string, orgId: string, categoryId: string[]) => {
    const { data } = await backendInstance.patch<BackendResponse<Video>>(`/video/remove/${videoId}/${orgId}`, {
        categoryId
    })
    return data
}
