import request from '../utils/request'

export function comment(data){
  return request({
    url:"/comment",
    method:"POST",
    data
  })
}