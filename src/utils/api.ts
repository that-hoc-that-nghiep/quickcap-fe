import axios from 'axios'
import { service } from './constant'

export const authInstance = axios.create({
    baseURL: service.auth
})
