import { logout } from '@/api/user'
import { login } from '@/api/auth'
import { getToken, setToken, removeToken, setRoles } from '@/utils/auth'
import { resetRouter } from '@/router'
import jwt_decode from 'jwt-decode'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
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
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    function getRole(token) {
      var decoded = jwt_decode(token)
      return decoded.authorities
    }

    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        const token = data.access_token
        commit('SET_TOKEN', token)
        setToken(token)
        const roles = getRole(token)
        commit('SET_ROLES', roles)
        setRoles(roles)
        commit('SET_NAME', data.fullName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
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

