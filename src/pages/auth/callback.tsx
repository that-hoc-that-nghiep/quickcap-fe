import { useAuth } from '@/hooks/useAuth'
import { useNavigate, useSearchParams } from 'react-router'
import { ErrorPage } from '../404'
import { useEffect, useState } from 'react'

const AuthCallbackPage = () => {
    const { setAccessToken } = useAuth()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            setAccessToken(token)
            navigate('/')
        } else {
            setError(true)
        }
    }, [searchParams, setAccessToken, navigate])

    if (error) {
        return <ErrorPage />
    }

    return <div>Processing authentication...</div>
}

export default AuthCallbackPage
