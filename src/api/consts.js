import request from '@/utils/request'

export function getList() {
  return request({
    url: '/consts/',
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: '/consts/'+id,
    method: 'get',
  })
}

export function updateOne(data) {
  return request({
    url: '/consts/',
    method: 'post',
    data: data
  })
}

export function updateBatch(data) {
  return request({
    url: '/consts/batch',
    method: 'post',
    data: data
  })
}

export function deleteById(id) {
  return request({
    url: '/consts/'+id,
    method: 'delete',
  })
}

export function queryList(p) {
  return request({
    url: '/consts/query',
    method: 'get',
    params: p
  })
}
