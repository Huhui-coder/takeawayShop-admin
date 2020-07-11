import request from '@/utils/request'

// 用户新增商品
export function add(data) {
  return request({
    url: '/merchant/product',
    method: 'post',
    data
  })
}

// 用户查看所有商品
export function viewAll(params = { _id: '5f081ab8c1553e4b6979763e' }) {
  return request({
    url: '/merchant/allProduct',
    method: 'get',
    params
  })
}

// 用户查看单个商品
export function view(data) {
  return request({
    url: '/merchant/product',
    method: 'get',
    data
  })
}

// 用户删除商品
export function del(data) {
  return request({
    url: '/merchant/product',
    method: 'delete',
    data
  })
}
// 用户编辑商品
export function put(data) {
  return request({
    url: '/merchant/product',
    method: 'put',
    data
  })
}

// 用户编辑商品状态
export function statusProduct(data) {
  return request({
    url: '/merchant/statusProduct',
    method: 'put',
    data
  })
}

