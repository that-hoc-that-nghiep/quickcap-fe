export interface Organization {
    id: string
    name: string
    image: string
    type: string
    timestamp: string
    is_owner: boolean
    is_permission: 'ALL' | string
}

export interface User {
    id: string
    email: string
    verified_email: number
    name: string
    given_name: string
    family_name: string
    picture: string
    locale: string
    subscription: string
    timestamp: string
    organizations: Organization[]
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading'

export interface AuthState {
    accessToken: string | null
    status: AuthStatus
}
