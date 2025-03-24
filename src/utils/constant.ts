import { IconBell, IconHome, IconLibrary, IconSettings } from '@tabler/icons-react'

export const service = {
    auth: 'https://auth.quickcap.live',
    backend: 'https://backend.quickcap.live',
    sso: 'https://sso.quickcap.live'
}

export const menuItems = [
    {
        label: 'Organization Dashboard',
        icon: IconHome,
        path: '/home',
        show: true
    },
    {
        label: `Organization's Video`,
        icon: IconLibrary,
        path: '/library',
        show: true
    },
    {
        label: 'Invites',
        icon: IconBell,
        path: '/invites',
        show: true
    },
    {
        label: 'Settings',
        icon: IconSettings,
        path: '/settings',
        show: true
    },
    {
        label: 'Upload video',
        icon: IconSettings,
        path: '/upload',
        show: false
    }
]

export const MAX_FILE_SIZE = 50 // MB

export const CLOUD_FRONT_URL = 'https://d13e9bff825cyt.cloudfront.net'
