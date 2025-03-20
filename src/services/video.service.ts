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
        categoryId
    })
    return data
}

export const removeCategoryToVideos = async (videoId: string, categoryId: string[]) => {
    const { data } = await backendInstance.patch(`/video/modify/${videoId}/remove`, {
        categoryId
    })
    return data
}
