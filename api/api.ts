import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development'
const api = axios.create({
  baseURL: isDev ? process.env.NEXT_PUBLIC_DEV_HOST : process.env.NEXT_PUBLIC_PRODUCTION_HOST,
})

export default api