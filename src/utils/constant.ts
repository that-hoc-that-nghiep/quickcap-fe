import { IconBell, IconCreditCard, IconHome, IconLibrary, IconSettings } from '@tabler/icons-react'

export const service = {
    auth: 'https://auth.quickcap.live',
    backend: 'https://backend.quickcap.live',
    sso: 'https://sso.quickcap.live'
}

export const menuItems = [
    {
        label: 'Home',
        icon: IconHome,
        path: '/home',
        show: true
    },
    {
        label: 'My library',
        icon: IconLibrary,
        path: '/library',
        show: true
    },
    {
        label: 'Notifications',
        icon: IconBell,
        path: '/notifications',
        show: true
    },
    {
        label: 'Billing',
        icon: IconCreditCard,
        path: '/billing',
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


export const mockNotifications = [
    'You have a new message from John Doe',
    'Your subscription is about to expire',
    'New video uploaded by John Doe',
    'Invitation to join a group',
    'Video was liked by John Doe',
    'Video was shared by John Doe'
]

export const MAX_FILE_SIZE = 50 // MB

export const CLOUD_FRONT_URL = 'https://d13e9bff825cyt.cloudfront.net'
