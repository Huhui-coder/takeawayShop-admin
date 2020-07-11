import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/merchant/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/merchant/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/merchant/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/merchant/logout',
    method: 'post'
  })
}
