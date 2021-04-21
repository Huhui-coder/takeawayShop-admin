import request from '@/utils/request'

// 用户查看所有订单
export function viewAll(params) {
  return request({
    url: '/merchant/allOrder',
    method: 'get',
    params
  })
}

// 用户查看单个订单
export function view(params) {
  return request({
    url: '/merchant/order',
    method: 'get',
    params
  })
}

// 用户编辑订单状态
export function put(data) {
  return request({
    url: '/merchant/order',
    method: 'put',
    data
  })
}

// 用户发送邮件通知
export function attend(params) {
  return request({
    url: '/merchant/attend',
    method: 'get',
    params
  })
}
