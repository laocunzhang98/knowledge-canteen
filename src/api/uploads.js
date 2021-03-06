import request from '../utils/request'

export function uploadFile(data){
  return request({
    url:"/uploads/addfile",
    method:"POST",
    data,
  })
}
export async function createFolder(data){
  return request({
    url:"/uploads/destination",
    method:"POST",
    data
  })
}
export function getFileList(params){
  return request({
    url:"/download/filelist",
    method:"GET",
    params
  })
}
export function getCataLog(params){
  return request({
    url:"/download/catalog",
    method:"GET",
    params
  })
}

export function getFolderId(params){
  return request({
    url:"/download/folderid",
    method:"GET",
    params
  })
}

export function getCateFile(params){
  return request({
    url:"/download/catefile",
    method:"GET",
    params
  })
}

export function deleteFile(data){
  return request({
    url:"/download/delfile",
    method:"DELETE",
    data
  })
}
export function getAllCate(params){
  return request({
    url:"/download/allcate",
    method:"GET",
    params
  })
}
export function moveFile(data){
  return request({
    url:"/download/movefile",
    method:"POST",
    data
  })
}

// 分片上传文件
export function uploadChunkFile(data){
  return request({
    url:"/uploads/filechucks",
    method:"POST",
    data
  })
}