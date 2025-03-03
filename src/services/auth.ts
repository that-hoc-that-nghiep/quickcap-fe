import { User } from '@/types'
import { authInstance } from '@/utils/api'

export const getUserInfo = async (accessToken: string | null) => {
    if (!accessToken) {
        return null
    }
    const { data } = await authInstance.get<User>(`/auth/verify/${accessToken}`)
    return data
}
