import { OrgInfo, VerifyUser } from '@/types'
import { authInstance } from '@/utils/api'

export const getUserInfo = async (accessToken: string | null) => {
    if (!accessToken) {
        return null
    }
    const { data } = await authInstance.get<VerifyUser>(`/auth/verify/${accessToken}`)
    return data
}

export const createOrg = async (name: string) => {
    const { data } = await authInstance.post<OrgInfo>('/org/create', { name })
    return data
}
