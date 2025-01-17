import { HomePage } from '@/pages'
import { ErrorPage } from '@/pages/404'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'

const routers = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    }
])

export const ReactRouterProvider = () => {
    return <RouterProvider router={routers} />
}
