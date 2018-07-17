import request from '@/utils/request'

export function getList() {
  return request({
    url: '/tag/',
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: '/tag/'+id,
    method: 'get',
  })
}

export function updateOne(data) {
  return request({
    url: '/tag/',
    method: 'post',
    data: data
  })
}
export function deleteById(id) {
  return request({
    url: '/tag/'+id,
    method: 'delete',
  })
}

export function queryList(p) {
  return request({
    url: '/tag/query',
    method: 'get',
    params: p
  })
}
