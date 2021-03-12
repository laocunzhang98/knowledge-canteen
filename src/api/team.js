import request from '../utils/request'

export function createdTeam(data){
  return request({
    url:"/organize/create",
    method:"POST",
    data
  })
}
export function getTeamInfo(params){
  return request({
    url:"/organize/orginfo",
    method:"GET",
    params
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

export function getTeamList(){
  return request({
    url:"/organize/orglist",
    method:"GET",
  })
}

export function updateTeamInfo(data){
  return request({
    url:"/organize/updateinfo",
    method:"POST",
    data
  })
}
export function JoinTeam(data){
  return request({
    url:"/organize/join",
    method:"POST",
    data
  })
}

export function getOrgMembers(params){
  return request({
    url:"/organize/members",
    method:"GET",
    params
  })
}
export function modifyMemberLevle(data){
  return request({
    url:"/organize/modifylevel",
    method:"POST",
    data
  })
}

export function removeMember(data){
  return request({
    url:"/organize/remove",
    method:"DELETE",
    data
  })
}


export function LeaveOrg(data){
  return request({
    url:"/organize/leave",
    method:"POST",
    data
  })
}
export function dissolutionOrg(data){
  return request({
    url:"/organize/dissolution",
    method:"POST",
    data
  })
}
export function modifyOrgOpen(data){
  return request({
    url:"/organize/open",
    method:"POST",
    data
  })
}
export function getManagerMember(params){
  return request({
    url:"/organize/manager",
    method:"GET",
    params
  })
}