import request from '@/utils/request'

export function getList() {
  return request({
    url: '/topic/',
    method: 'get',
  })
}

export function queryList(p) {
  return request({
    url: '/topic/query',
    method: 'get',
    params: p
  })
}


export function getById(id) {
  return request({
    url: '/topic/'+id,
    method: 'get',
  })
}

export function getByIdAdmin(id) {
  return request({
    url: '/topic/admin/'+id,
    method: 'get',
  })
}

export function deleteById(id) {
  return request({
    url: '/topic/'+id,
    method: 'delete',
  })
}

export function updateOne(data) {
  return request({
    url: '/topic/',
    method: 'post',
    data: data
  })
}

export function publish(id) {
  return request({
    url: '/topic/publish/'+id,
    method: 'get',
  })
}
