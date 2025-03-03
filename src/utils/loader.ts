import { useAuthStore } from '@/stores/authStore'
import { service } from './constant'
import { redirect } from 'react-router'

export const authLoader = () => {
    const { accessToken } = useAuthStore.getState()
    // If user is not authenticated, redirect to SSO
    if (!accessToken) {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
        const ssoUrl = `${service.sso}/login?redirect_uri=${redirectUri}`

        window.location.href = ssoUrl
        // Return null or a redirect to prevent the route from loading
        return redirect('/')
    }

    // User is authenticated, continue with route loading
    return { authenticated: true }
}
