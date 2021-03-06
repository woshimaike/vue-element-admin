import request from '@/utils/request'
// import { login } from '@/api/api'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }

  // login({
  //   username: username,
  //   password: password
  // }).then((result) => {
  //   if (result.data.status === 'ok') {
  //     console.log(result.data.data)
  //     return request({
  //       url: '/login/login',
  //       method: 'post',
  //       data
  //     })
  //   }
  // })
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

