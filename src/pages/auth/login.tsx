import { useUser } from '@/hooks/useUser'
import { authInstance } from '@/utils/api'
import { Button, Card, Stack, Text, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function LoginPage() {
    const navigate = useNavigate()
    const { user, isLoading } = useUser()

    useEffect(() => {
        if (user) {
            if (user.organizations.length === 0) {
                navigate('/create-org')
            } else {
                navigate(`/${user.organizations[0].id}/home`)
            }
        }
    }, [user, isLoading, navigate])

    const handleGoogleLogin = async () => {
        try {
            const { data } = await authInstance.post('/auth/login', {
                provider: 'google',
                redirectAfterLogin: `${window.location.origin}/auth/callback`
            })
            if (data) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Lỗi',
                message: 'Đã xảy ra lỗi khi đăng nhập',
                color: 'red'
            })
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200'>
            <Card className='w-full max-w-lg p-8'>
                <Stack gap={6}>
                    <Title className='text-2xl font-bold text-center mt-2'>Welcome to Quickcap</Title>
                    <Text className='text-center text-lg mt-2'>Login using your Google account</Text>
                </Stack>
                <Stack className='flex justify-center mt-8'> 
                    <Button
                        onClick={handleGoogleLogin}
                        size='lg'
                        leftSection={
                            <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'> 
                                <path
                                    fill='currentColor'
                                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                />
                                <path
                                    fill='currentColor'
                                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                />
                                <path
                                    fill='currentColor'
                                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                                />
                                <path
                                    fill='currentColor'
                                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                                />
                            </svg>
                        }
                    >
                        Login with Google
                    </Button>
                </Stack>
                <Stack className='mt-6'>
                    <p className='text-center text-sm text-gray-600'>
                        By logging in, you agree to our{' '}
                        <a href='#' className='font-medium text-primary hover:underline'>
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href='#' className='font-medium text-primary hover:underline'>
                            Privacy Policy
                        </a>
                    </p>
                </Stack>
            </Card>
        </div>
    )
}
