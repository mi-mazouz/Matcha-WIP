import axios from 'axios'

import { getToken, logout } from '../utils'
import history from './history'

const initInterceptorRequest = () => {
  axios.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
      config.headers['authorization'] = token
    }

    return config
  })

  axios.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 401 && error.response.data.message === 'TOKEN_INVALID') {
      logout()
      history.push('/signin')
    }

    return Promise.reject(error)
  })
}

export {
 initInterceptorRequest
}