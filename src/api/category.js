import request from '@/utils/request'

export function getList() {
  return request({
    url: '/category/',
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: '/category/'+id,
    method: 'get',
  })
}

export function updateOne(data) {
  return request({
    url: '/category/',
    method: 'post',
    data: data
  })
}

export function deleteById(id) {
  return request({
    url: '/category/'+id,
    method: 'delete',
  })
}
