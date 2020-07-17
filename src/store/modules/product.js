import { add, viewAll, del, put, statusProduct } from '@/api/product'

const state = {
  productList: [], // 商品列表
  product: {} // 单个商品属性
}

const mutations = {
  FETCH: (state, productList) => {
    state.productList = productList
  }
}

const actions = {
  fetch({ commit }, productInfo) {
    return new Promise((resolve, reject) => {
      viewAll().then(response => {
        const { data } = response
        commit('FETCH', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  add({ commit }, productInfo) {
    return new Promise((resolve, reject) => {
      add(productInfo).then(response => {
        const { code } = response
        resolve(code)
      }).catch(error => {
        reject(error)
      })
    })
  },
  statusProduct({ commit }, productInfo) {
    return new Promise((resolve, reject) => {
      statusProduct(productInfo).then(response => {
        const { code } = response
        resolve(code)
      }).catch(error => {
        reject(error)
      })
    })
  },
  del({ commit }, productInfo) {
    return new Promise((resolve, reject) => {
      del(productInfo).then(response => {
        const { code } = response
        resolve(code)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put({ commit }, productInfo) {
    return new Promise((resolve, reject) => {
      put(productInfo).then(response => {
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

