import request from '@/utils/request'

export function getList() {
  return request({
    url: '/user/',
    method: 'get',
  })
}

export function queryList(p) {
  return request({
    url: '/user/query',
    method: 'get',
    params: p
  })
}


export function getById(id) {
  return request({
    url: '/user/'+id,
    method: 'get',
  })
}

export function deleteById(id) {
  return request({
    url: '/user/'+id,
    method: 'delete',
  })
}

export function updateOne(data) {
  return request({
    url: '/user/',
    method: 'post',
    data: data
  })
}
