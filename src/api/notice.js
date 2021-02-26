import request from '../utils/request'

export function getNoticeInfo(){
  return request({
    url:"/notice/info",
    method:"GET",
  })
}
export function readNoticeInfo(data){
  return request({
    url:"/notice/readinfo",
    method:"POST",
    data
  })
}
