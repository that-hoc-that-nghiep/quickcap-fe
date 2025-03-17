import { Comment } from '@/types/comment'
import { BackendResponse } from '@/types/common'
import { backendInstance } from '@/utils/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const createComment = async (videoId: string, content: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.post<BackendResponse<Comment>>(`/comment/${videoId}`, {
        content
    })
    return data
}

export const getComments = async (videoId: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.get<BackendResponse<Comment[]>>(`/comment/${videoId}`)
    return data
}

export const useComments = async (videoId: string) => {
    return useSuspenseQuery({
        queryKey: ['comments', videoId],
        queryFn: () => getComments(videoId)
    })
}
export const deleteComment = async (commentId: string) => {
    if (!commentId) return null
    const { data } = await backendInstance.delete<BackendResponse<Comment>>(`/comment/${commentId}`)
    return data
}
