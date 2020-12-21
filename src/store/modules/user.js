import { handleLogin, handleRouter, handleLoginOut } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: undefined,
    roles: []
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
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录提交state
  handleLoginCom({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      handleLogin({ username: username.trim(), password: password }).then(response => {
        try {
          const { token, userId, personName } = response
          // commit('SET_ROLES', list)
          commit('SET_NAME', personName)
          commit('SET_TOKEN', token)
          commit('SET_USERID', userId)
          setToken(token)
          // const listVal = JSON.stringify(list)
          // sessionStorage.setItem('name', personName)
          // sessionStorage.setItem('userId', userId)
          // sessionStorage.setItem('roles', listVal)
          resolve()
        } catch (e) {
          console.log(e)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重新写入用户数据
  // getInfo({ commit }, userInfo) {
  //   const { userId, personName, roles } = userInfo
  //   return new Promise((resolve, reject) => {
  //     commit('SET_ROLES', roles)
  //     commit('SET_NAME', personName)
  //     // commit('SET_TOKEN', token)
  //     commit('SET_USERID', userId)
  //     resolve()
  //   })
  // },
  // get user info
  getInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      try {
        // const { userId, personName } = userInfo
        handleRouter({}).then(response => {
          // console.log('faslfjdlasjfldsa', response)
          const { name, userId, list } = response
          if (!list) {
            reject('路由权限未获取, 请重新登录')
          }
          if (!list || list.length <= 0) {
            reject('路由必须为不为空的数组!')
          }
          commit('SET_ROLES', list)
          commit('SET_NAME', name)
          commit('SET_USERID', userId)
          resolve(list)
        }).catch(error => {
          reject(error)
        })
      } catch (e) {
        console.log(e)
      }
    })
  },
  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      handleLoginOut({ userId: state.userId }).then(() => {
        try {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          sessionStorage.removeItem('name')
          sessionStorage.removeItem('userId')
          sessionStorage.removeItem('roles')
          resolve()
        } catch (e) {
          console.log(e)
        }
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

