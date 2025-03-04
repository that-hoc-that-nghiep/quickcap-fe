import { redirect } from 'react-router'
import { useAuthStore } from '@/stores/authStore'

export const authLoader = () => {
    // Access store directly since we can't use hooks in loaders
    const { accessToken } = useAuthStore.getState()

    // Check if user is not authenticated
    if (!accessToken) {
        // Redirect to login page
        return redirect('/auth/login')
    }

    // User is authenticated, allow navigation to continue
    return null
}
