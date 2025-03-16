import { Conversation } from '@/types/conversation'
import { backendInstance } from '@/utils/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const createConversation = async (videoId: string, question: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.post<{ data: Conversation }>(`/conversation/${videoId}`, { question })
    return data
}

const getConversation = async (videoId: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.get<{ data: Conversation }>(`/conversation/${videoId}`)
    return data
}

export const useConversation = (videoId: string) => {
    return useSuspenseQuery({
        queryKey: ['conversation', videoId],
        queryFn: () => getConversation(videoId)
    })
}
