import request from '../utils/request'

export function Register(data){
  return request({
    url:"/user/register",
    method:"POST",
    data
  })
}
export function GetCode(data){
  return request({
    url:"/user/sendmail",
    method:"POST",
    data
  })
}