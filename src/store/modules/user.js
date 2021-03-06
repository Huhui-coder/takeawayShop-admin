import { login, getInfo, register, putUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    info: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { merchantName, merchantPwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ merchantName: merchantName.trim(), merchantPwd: merchantPwd }).then(response => {
        const { data, token } = response
        commit('SET_NAME', data.merchantName)
        commit('SET_INFO', data)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_TOKEN', `Bearer ${token}`)
        setToken(`Bearer ${token}`)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
    const { merchantName, merchantPwd, merchantAddress, merchantPhone, merchantDesc } = userInfo
    return new Promise((resolve, reject) => {
      register({ merchantName: merchantName.trim(), merchantPwd: merchantPwd, merchantAddress, merchantPhone, merchantDesc }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        commit('SET_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('RESET_STATE')
      resolve()
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      // reject(error)
      // })
    })
  },

  putUserInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      putUserInfo(userInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

