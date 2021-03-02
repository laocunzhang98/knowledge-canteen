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
export function getUserArticle(params){
  return request({
    url:"/classic/userarticle",
    method:"GET",
    params
  })
}
export function editUserInfo(data){
  return request({
    url:"/user/update",
    method:"PUT",
    data
  })
}
export function getuserArticleNum(params){
  return request({
    url:"/classic/articleall",
    method:"GET",
    params
  })
}
// 获取关注列表
export function getFollowUser(params){
  return request({
    url:"/follow/user",
    method:"GET",
    params
  })
}
