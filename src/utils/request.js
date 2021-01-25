import axios from "axios"
import {Base64} from 'js-base64'
import router from '../router/index'
const service = axios.create({
  baseURL:"/api",
  timeout:5000
})

service.interceptors.request.use(
  config=>{
    let token = localStorage.getItem('token')
    // localStorage.setItem("token")
    let Authorization = "Basic "+Base64.encode(token+":")
    const headers = {
      "Authorization" :Authorization,
      'Content-Type': 'application/json',
    }
    config.headers = headers
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response=>{
    if(response.data.error_code===4001||response.data.error_code===4002){
      localStorage.removeItem('token')
      router.push('/login')
    }
    return response.data
  },
  error=>{
    console.log(error)
    return Promise.reject(error)
  }
)


export default service