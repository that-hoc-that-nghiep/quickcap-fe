import axios from 'axios'
import { service } from './constant'
import { useAuthStore } from '../stores/authStore'

export const authInstance = axios.create({
    baseURL: service.auth
})

export const backendInstance = axios.create({
    baseURL: service.backend
})

// Add request interceptors to include access token in headers
authInstance.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

backendInstance.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})
