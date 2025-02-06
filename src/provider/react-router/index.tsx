import { HomePage } from '@/pages/(main)/[orgId]/home'
import { BillingPage } from '@/pages/(main)/[orgId]/billing'
import { MainLayout } from '@/pages/(main)/layout'
import { LibraryPage } from '@/pages/(main)/[orgId]/library'
import { NotificationsPage } from '@/pages/(main)/[orgId]/notifications'
import { SettingsPage } from '@/pages/(main)/[orgId]/settings'
import { ErrorPage } from '@/pages/404'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import { VideoPage } from '@/pages/(main)/video/[videoId]'
import { OrgLayout } from '@/pages/(main)/[orgId]/layout'

const routers = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    {
                        path: '/:orgId',
                        element: <OrgLayout />,
                        children: [
                            {
                                path: 'home',
                                element: <HomePage />
                            },
                            {
                                path: 'library',
                                element: <LibraryPage />
                            },
                            {
                                path: 'notifications',
                                element: <NotificationsPage />
                            },
                            {
                                path: 'billing',
                                element: <BillingPage />
                            },
                            {
                                path: 'settings',
                                element: <SettingsPage />
                            }
                        ]
                    },
                    {
                        path: 'video',
                        element: <Outlet />,
                        children: [
                            {
                                path: ':videoId',
                                element: <VideoPage />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])

export const ReactRouterProvider = () => {
    return <RouterProvider router={routers} />
}
