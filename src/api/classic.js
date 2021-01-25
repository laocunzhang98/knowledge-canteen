import request from '../utils/request'
export function getAticle(){
  return request({
    url:"/classic/latest",
    method:"GET",
  })
}


