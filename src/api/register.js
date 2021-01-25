import request from '../utils/request'

export function Register(data){
  return request({
    url:"/user/register",
    method:"POST",
    data
  })
}