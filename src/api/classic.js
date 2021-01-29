import request from '../utils/request'
export function getArticleList(){
  return request({
    url:"/classic/latest",
    method:"GET",
  })
}

export function getAuthorInfo(id){
  return request({
    url:`/classic/article/follow/${id}`,
    method:"GET"
  })
}
export function pubArticle(data){
  return request({
    url:"/classic/pub",
    method:"POST",
    data,
  })
}
export function pubPic(data,headers){
  return request({
    url:"/uploads/addpic",
    method:"POST",
    data,
    headers
  })
}
export function Favor(data){
  return request({
    url:"/favor",
    method:"POST",
    data
  })
}

export function getArticleDetail(id){
  return request({
    url:`/classic/article/${id}`,
    method:"GET",
  })
}
