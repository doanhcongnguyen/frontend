import axios from 'axios'
import { Message } from 'element-ui'
import { showErrorWithMessage } from '@/utils/commons'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { redirectToLogin } from '@/utils/commons'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_AA_SERVER, // url = base url + request url
  timeout: 30 * 1000 // request timeout: 30s
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status = response.status
    if (status === 200 || status === 201 || status === 204) {
      return res
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    const response = error.response
    if (response && response.data) {
      const data = response.data
      if (data.error === 'invalid_token' || data.status === 401) {
        redirectToLogin()
      } else {
        showErrorWithMessage(data.message)
        return Promise.reject(error)
      }
    }
  }
)

export default service
