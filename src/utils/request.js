import axios from "axios"
import {Base64} from 'js-base64'
import router from '../router/index'
import vue from "../main"

axios.defaults.timeout =  60000;

const service = axios.create({
  baseURL:"/api",
  timeout:5000
})

service.interceptors.request.use(
  config=>{
    let token = localStorage.getItem('token')
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
    if(response.data.code !=200){
      if(response.data.code ===404){
        router.push('/404')
      }
      if(response.data.message instanceof Array){
        vue.$message.warning(response.data.message[0])
      }
      else{
        vue.$message.warning(response.data.message)
      }
    }else{
      if(response.data.message !=="success"){
        vue.$message.success(response.data.message)
      }
    }
    return response.data
  },
  error=>{
    vue.$message.error("服务器内部错误！请尽快联系管理员！")
    return Promise.reject(error)
  }
)


export default service