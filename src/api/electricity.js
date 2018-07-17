import request from '@/utils/request'

export function getList() {
  return request({
    url: '/electricity/',
    method: 'get',
  })
}

export function queryList(p) {
  return request({
    url: '/electricity/query',
    method: 'get',
    params: p
  })
}


export function getById(id) {
  return request({
    url: '/electricity/'+id,
    method: 'get',
  })
}

export function deleteById(id) {
  return request({
    url: '/electricity/'+id,
    method: 'delete',
  })
}

export function updateOne(data) {
  return request({
    url: '/electricity/',
    method: 'post',
    data: data
  })
}

export function generate(season,data) {
  return request({
    url: '/electricity/season/'+season+'/gen',
    method: 'post',
    data: data
  })
}



export function getSeasonList(d) {
  return request({
    url: '/electricity/query',
    method: 'get',
    params:d
  })
}

export function saveSeasonList(d) {
  return request({
    url: '/electricity/batch',
    method: 'post',
    data:d
  })
}
export function downloadSeasonList(d){
  let url = '/electricity/season/'+d.year+'/'+d.season+'/resident/'+d.resident+'/sheet'
  return request({
    url: url,
    method: 'get',
    responseType: 'blob', // important
  })
  // window.open('/bill/monthly/'+d.year+'/'+d.month+'/resident/'+d.resident+'/sheet')
}
