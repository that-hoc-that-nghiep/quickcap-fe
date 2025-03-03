import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState } from '../types/auth'

interface AuthStore extends AuthState {
    setAccessToken: (token: string) => void
    removeAccessToken: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: null,
            status: 'unauthenticated',

            setAccessToken: (token) =>
                set({
                    accessToken: token,
                    status: 'authenticated'
                }),

            removeAccessToken: () =>
                set({
                    accessToken: null,
                    status: 'unauthenticated'
                })
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                accessToken: state.accessToken
            })
        }
    )
)
