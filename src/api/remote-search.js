import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/dev-api/vue-admin-template/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/dev-api/vue-admin-template/transaction/list',
    method: 'get',
    params: query
  })
}
