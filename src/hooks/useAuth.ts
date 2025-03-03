import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
    const { accessToken, status, setAccessToken, removeAccessToken } = useAuthStore()

    const isAuthenticated = status === 'authenticated'

    return {
        accessToken,
        status,
        isAuthenticated,
        setAccessToken,
        removeAccessToken
    }
}
