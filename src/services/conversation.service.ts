import { BackendResponse } from '@/types/common'
import { VideoMessage } from '@/types/conversation'
import { backendInstance } from '@/utils/api'

export const createConversation = async (videoId: string, question: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.post<BackendResponse<VideoMessage[]>>(`/conversation/${videoId}`, {
        question
    })
    return data
}

export const getConversation = async (videoId: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.get<BackendResponse<VideoMessage[]>>(`/conversation/${videoId}`)
    return data
}
