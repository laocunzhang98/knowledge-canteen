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
export function getApplyInfo(){
  return request({
    url:"/notice/applyinfo",
    method:"GET",
  })
}

export function readApplyInfo(data){
  return request({
    url:"/notice/readapply",
    method:"POST",
    data
  })
}
export function refuseApply(data){
  return request({
    url:"/notice/refuseapply",
    method:"POST",
    data
  })
}