import { HomePage } from '@/pages/(main)/[orgId]/home'
import { BillingPage } from '@/pages/(main)/[orgId]/billing'
import { MainLayout } from '@/pages/(main)/layout'
import { LibraryPage } from '@/pages/(main)/[orgId]/library'
import { InvitesPage } from '@/pages/(main)/[orgId]/invites'
import { SettingsPage } from '@/pages/(main)/[orgId]/settings'
import { ErrorPage } from '@/pages/404'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import { VideoPage } from '@/pages/(main)/[orgId]/video/[videoId]'
import { OrgLayout } from '@/pages/(main)/[orgId]/layout'
import { authLoader } from '@/utils/loader'
import AuthCallbackPage from '@/pages/auth/callback'
import { LoginPage } from '@/pages/auth/login'
import { BaseMantineProvider } from '@/provider/mantine'
import VideoUploadPage from '@/pages/(main)/[orgId]/upload'
import CategoryVideosPage from '@/pages/(main)/[orgId]/category/[categoryId]'
import AddVideoToOrgPage from '@/pages/(main)/[orgId]/add'

// Root layout component that includes Mantine providers
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return <BaseMantineProvider>{children}</BaseMantineProvider>
}

const routers = createBrowserRouter([
    {
        path: '/',
        element: (
            <RootLayout>
                <Outlet />
            </RootLayout>
        ),
        errorElement: (
            <RootLayout>
                <ErrorPage />
            </RootLayout>
        ),
        children: [
            {
                path: '/',
                element: <MainLayout />,
                loader: authLoader,
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
                                path: 'invites',
                                element: <InvitesPage />
                            },
                            {
                                path: 'billing',
                                element: <BillingPage />
                            },
                            {
                                path: 'settings',
                                element: <SettingsPage />
                            },
                            {
                                path: 'upload',
                                element: <VideoUploadPage />
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
                            },
                            {
                                path: 'category',
                                element: <Outlet />,
                                children: [
                                    {
                                        path: ':categoryId',
                                        element: <CategoryVideosPage />
                                    }
                                ]
                            },
                            {
                                path: 'add',
                                element: <AddVideoToOrgPage />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/auth',
                element: <Outlet />,
                children: [
                    {
                        path: 'callback',
                        element: <AuthCallbackPage />
                    },
                    {
                        path: 'login',
                        element: <LoginPage />
                    }
                ]
            }
        ]
    }
])

export const ReactRouterProvider = () => {
    return <RouterProvider router={routers} />
}
