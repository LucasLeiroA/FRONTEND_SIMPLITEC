import axios from 'axios'
import { getTokenHelper } from '../helpers/getTokenHelper'

const defaultApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

defaultApi.interceptors.request.use((config) => {
    const token = getTokenHelper()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default defaultApi
