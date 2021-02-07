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
export function getUserArticle(){
  return request({
    url:"/classic/userarticle",
    method:"GET",
  })
}
export function editUserInfo(data){
  return request({
    url:"/user/update",
    method:"PUT",
    data
  })
}