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
export function getLimitOrg(){
  return request({
    url:"/organize/limitorg",
    method:"GET",
  })
}
export function getTeamId(params){
  return request({
    url:"/organize/teamid",
    method:"GET",
    params
  })
}
export function getTeamLevel(params){
  return request({
    url:"/organize/level",
    method:"GET",
    params
  })
}