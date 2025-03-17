import { Video } from '@/types'
import { BackendResponse } from '@/types/common'
import { backendInstance } from '@/utils/api'
import { FileWithPath } from '@mantine/dropzone'
import { useSuspenseQuery } from '@tanstack/react-query'

export const uploadVideo = async (file: FileWithPath) => {
    const { data } = await backendInstance.postForm<BackendResponse<Video>>('/video', {
        file
    })
    return data
}

export const getVideosByOrgId = async ({
    orgId,
    limit = 10,
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

const getVideoById = async (videoId: string) => {
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
    body: { title: string; description: string; transcript: string }
) => {
    const { data } = await backendInstance.patch<BackendResponse<Video>>(`/video/${videoId}`, body)
    return data
}
