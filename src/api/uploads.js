import request from '../utils/request'

export function uploadFile(data){
  return request({
    url:"/uploads/addfile",
    method:"POST",
    data
  })
}

