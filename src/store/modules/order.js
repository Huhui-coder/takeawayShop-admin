import { viewAll, view, put } from '@/api/order'

const state = {
  orderList: [], // 商品列表
  order: {} // 单个商品属性
}

const mutations = {
  FETCH: (state, orderList) => {
    state.orderList = orderList
  },
  VIEW: (state, order) => {
    state.order = order
  }
}

const actions = {
  fetch({ commit }, orderInfo) {
    const { _id } = orderInfo
    return new Promise((resolve, reject) => {
      viewAll({ _id: _id }).then(response => {
        const { data } = response
        commit('FETCH', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  view({ commit }, orderInfo) {
    const { o_id } = orderInfo
    return new Promise((resolve, reject) => {
      view({ o_id: o_id }).then(response => {
        const { data } = response
        commit('VIEW', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  put({ commit }, orderInfo) {
    return new Promise((resolve, reject) => {
      put(orderInfo).then(response => {
        const { code } = response
        resolve(code)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

