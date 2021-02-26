import request from '../utils/request'

export function getNoticeInfo(){
  return request({
    url:"/notice/info",
    method:"GET",
  })
}

