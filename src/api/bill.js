import request from '@/utils/request'

export function getList() {
  return request({
    url: '/bill/',
    method: 'get',
  })
}

export function queryList(p) {
  return request({
    url: '/bill/query',
    method: 'get',
    params: p
  })
}

export function genAnnualSheet(d) {
  return request({
    url: '/bill/annual/'+d.year+'/gen',
    method: 'get'
  })
}
export function getAnnualList(d) {
  return request({
    url: '/bill/annual/query',
    method: 'get',
    params:d
  })
}

export function saveAnnualList(d) {
  return request({
    url: '/bill/annual/batch',
    method: 'post',
    data:d
  })
}
export function downloadAnnualList(d){
  let url = '/bill/annual/'+d.year+'/resident/'+d.resident+'/sheet'
  return request({
    url: url,
    method: 'get',
    responseType: 'blob', // important
  })
  // window.open('/bill/monthly/'+d.year+'/'+d.month+'/resident/'+d.resident+'/sheet')
}


export function genSeasonSheet(d) {
  return request({
    url: '/bill/season/'+d.year+'/'+d.season+'/gen',
    method: 'get'
  })
}
export function getSeasonList(d) {
  return request({
    url: '/bill/season/query',
    method: 'get',
    params:d
  })
}

export function saveSeasonList(d) {
  return request({
    url: '/bill/season/batch',
    method: 'post',
    data:d
  })
}
export function downloadSeasonList(d){
  let url
  url = d.resident ? '/bill/season/'+d.year+'/'+d.season+'/resident/'+d.resident+'/sheet' : '/bill/season/'+d.year+'/'+d.season+'/sheet'
  return request({
    url: url,
    method: 'get',
    responseType: 'blob', // important
  })
  // window.open('/bill/monthly/'+d.year+'/'+d.month+'/resident/'+d.resident+'/sheet')
}

export function genMonthlySheet(d) {
  return request({
    url: '/bill/monthly/'+d.year+'/'+d.month+'/gen',
    method: 'get'
  })
}
export function getMonthlyList(d) {
  return request({
    url: '/bill/monthly/query',
    method: 'get',
    params:d
  })
}

export function saveMonthlyList(d) {
  return request({
    url: '/bill/monthly/batch',
    method: 'post',
    data:d
  })
}

export function getCheckinList(d) {
  return request({
    url: '/bill/checkin/query',
    method: 'get',
    params:d
  })
}

export function downloadCheckinList(year,month) {
  let url = '/bill/checkin/'+year+'/'+month+'/sheet'
  return request({
    url: url,
    method: 'get',
    responseType: 'blob', // important
  })
}


export function saveCheckinList(y,m,d) {
  return request({
    url: '/bill/checkin/'+y+'/'+m,
    method: 'post',
    data:d
  })
}

export function generateCorpBySeasonAndResident(season,resident,d) {
  return request({
    url: '/bill/corp/season/'+season+'/resident/'+resident+'/gen',
    method: 'post',
    data:d
  })
}

export function downloadMonthlyList(d){
  let url = '/bill/monthly/'+d.year+'/'+d.month+'/resident/'+d.resident+'/sheet'
  return request({
    url: url,
    method: 'get',
    responseType: 'blob', // important
  })
  // window.open('/bill/monthly/'+d.year+'/'+d.month+'/resident/'+d.resident+'/sheet')
}

export function getById(id) {
  return request({
    url: '/bill/'+id,
    method: 'get',
  })
}

export function getAnomalyByYearAndMonth(year,month) {
  return request({
    url: '/bill/anomaly/'+year+'/'+month,
    method: 'get',
  })
}


export function deleteById(id) {
  return request({
    url: '/bill/'+id,
    method: 'delete',
  })
}

export function updateOne(data) {
  return request({
    url: '/bill/',
    method: 'post',
    data: data
  })
}

export function queryCorpBill(year){
  return request({
    url: '/bill/corp/year/'+year,
    method: 'get',
  })
}