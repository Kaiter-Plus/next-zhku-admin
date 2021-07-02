import Cookies from 'js-cookie'

// token 的 key 值
const TokenKey = 'Admin-Token'

// 返回 token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置 token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 移除 token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
