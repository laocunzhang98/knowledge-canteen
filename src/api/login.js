import request from '../utils/request'

export function Login(data){
  return request({
    url:"/token",
    method:"POST",
    data
  })
}