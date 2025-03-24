import { BackendResponse } from '@/types/common'
import { Invite } from '@/types/invite'
import { backendInstance } from '@/utils/api'
import { useSuspenseQuery } from '@tanstack/react-query'

const getAllInvites = async (receiverId: string) => {
    const { data } = await backendInstance.get<BackendResponse<Invite[]>>(`/invite/all/${receiverId}`)
    return data
}

export const useInvites = (receiverId: string) => {
    return useSuspenseQuery({
        queryKey: ['invites', receiverId],
        queryFn: () => getAllInvites(receiverId)
    })
}

export const acceptInvite = async (inviteId: string) => {
    const { data } = await backendInstance.patch<BackendResponse<Invite>>(`/invite/${inviteId}`)
    return data
}

export const sendInvite = async (orgId: string, receiverId: string) => {
    const { data } = await backendInstance.post<BackendResponse<Invite>>(`/invite/${orgId}`, {
        receiverId
    })
    return data
}
