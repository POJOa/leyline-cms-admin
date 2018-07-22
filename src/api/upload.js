import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getUploadFileURL() {
  return request.baseURL + 'upload/'
}

export function getUploadToken() {
  return {'X-Authorization':'Bearer '+request.token}
}

