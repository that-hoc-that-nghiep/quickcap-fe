import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading'
export interface AuthState {
    accessToken: string | null
    status: AuthStatus
}

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
