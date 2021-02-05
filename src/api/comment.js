import request from '../utils/request'

export function comment(data){
  return request({
    url:"/comment",
    method:"POST",
    data
  })
}
export function getCommentList(params){
  return request({
    url:"/comment/getcomment",
    method:"GET",
    params
  })
}