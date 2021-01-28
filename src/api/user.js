import request from '../utils/request'

export function getUserInfo(){
  return request({
    url:"/user/userinfo",
    method:"GET"
  })
}
