import Cookies from 'js-cookie'

const TokenKey = 'dcn_app_token'
const RoleKey = 'dcn_app_role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoles() {
  return Cookies.get(RoleKey)
}

export function setRoles(roles) {
  return Cookies.set(RoleKey, roles)
}
