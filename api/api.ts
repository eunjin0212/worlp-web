import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development'
const api = axios.create({
  baseURL: isDev ? process.env.DEV_HOST : process.env.PRODUCTION_HOST,
})

export default api