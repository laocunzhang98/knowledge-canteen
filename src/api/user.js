import request from '../utils/request'

export function getUserInfo(params){
  return request({
    url:"/user/userinfo",
    method:"GET",
    params
  })
}
export function postFollow(data){
  return request({
    url:"/follow",
    method:"POST",
    data
  })
}
export function getIsFollow(params){
  return request({
    url:"/follow/isfollow",
    method:"GET",
    params
  })
}