import request from '../utils/request'

export function createdTeam(data){
  return request({
    url:"/organize/create",
    method:"POST",
    data
  })
}
export function getTeamInfo(){
  return request({
    
  })
}
export function getOwnOrg(){
  return request({
    url:"/organize/ownorg",
    method:"GET"
  })
}
export function getOtherOrg(){
  return request({
    url:"/organize/otherorg",
    method:"GET"
  })
}