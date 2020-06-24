import service from '@/utils/service'

export function getList() {
  return service({
    url: '/api/users',
    method: 'get'
  })
}

export function create(data) {
  return service({
    url: '/api/user',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return service({
    url: '/api/user',
    method: 'put',
    data: data
  })
}

export function doDelete(id) {
  return service({
    url: '/api/user/' + id,
    method: 'delete'
  })
}

export function filter(data) {
  return service({
    url: '/api/user/search',
    method: 'post',
    data: data
  })
}
