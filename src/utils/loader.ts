import { useAuthStore } from '@/stores/authStore'
import { redirect } from 'react-router'

export const authLoader = () => {
    const { accessToken } = useAuthStore.getState()
    // If user is not authenticated, redirect to SSO
    if (!accessToken) {
        return redirect('/auth/login')
    }

    // User is authenticated, continue with route loading
    return { authenticated: true }
}
