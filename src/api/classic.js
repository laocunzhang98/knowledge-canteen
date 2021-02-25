import request from '../utils/request'
export function getArticleList(params){
  return request({
    url:"/classic/latest",
    method:"GET",
    params
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
export function UpdateArticle(data){
  return request({
    url:"/classic/update",
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

export function getFavorList(){
  return request({
    url:"/favor/all/",
    method:"GET",
  })
}

export function Favor(data){
  return request({
    url:"/favor",
    method:"POST",
    data
  })
}

export function getArticleDetail(id,params){
  return request({
    url:`/classic/article/${id}`,
    method:"GET",
    params
  })
}

export function getCategoryList(){
  return request({
    url:`/classify`,
    method:"GET",
  })
}

export function getOrgArticleList(params){
  return request({
    url:`/classic/orglatest`,
    method:"GET",
    params
  })
}
export function getFavorArticle(){
  return request({
    url:`/favor/article`,
    method:"GET",
  })
}

export function DeleteArticle(data){
  return request({
    url:"/classic/del/",
    method:"DELETE",
    data
  })
}
