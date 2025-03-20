import { Org, OrgInfo, VerifyUser } from '@/types'
import { authInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export const getUserInfo = async (accessToken: string | null) => {
    if (!accessToken) {
        return null
    }
    const { data } = await authInstance.get<VerifyUser>(`/auth/verify/${accessToken}`)
    return data
}

const getOrgInfo = async (orgId: string | undefined) => {
    if (!orgId) {
        return null
    }
    const { data } = await authInstance.get<OrgInfo>(`/org/${orgId}`)
    return data
}

export const useOrgInfo = (orgId: string | undefined) => {
    return useQuery({
        queryKey: ['org', orgId],
        queryFn: () => getOrgInfo(orgId)
    })
}

export const createOrg = async (name: string) => {
    const { data } = await authInstance.post<OrgInfo>('/org/create', { name })
    return data
}

export const updateOrg = async (orgId: string, name: string) => {
    const { data } = await authInstance.put<Org>(`/org/${orgId}`, { name })
    return data
}

export const addMemberToOrg = async (orgId: string | undefined, email: string) => {
    if (!orgId) {
        return null
    }
    const { data } = await authInstance.put<OrgInfo>(`/org/${orgId}/add`, { usersEmail: [email] })
    return data
}

export const removeMemberFromOrg = async (orgId: string | undefined, email: string) => {
    if (!orgId) {
        return null
    }
    const { data } = await authInstance.put<OrgInfo>(`/org/${orgId}/remove`, { email })
    return data
}

export const leaveOrg = async (orgId: string | undefined) => {
    if (!orgId) {
        return null
    }
    await authInstance.put(`/org/${orgId}/leave`)
}

export const updatePermission = async (orgId: string | undefined, email: string, permission: string) => {
    if (!orgId) {
        return null
    }
    const { data } = await authInstance.put<OrgInfo>(`/org/${orgId}/permission`, { email, permission })
    return data
}
export const deleteOrg = async (orgId: string | undefined) => {
    if (!orgId) {
        return null
    }
    await authInstance.delete(`/org/${orgId}`)
}
