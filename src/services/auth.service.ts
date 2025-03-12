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
