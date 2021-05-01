import request from '@/utils/request'

// 获取页脚
export function fetchFooter() {
  return request({
    url: '/footer',
    method: 'get'
  })
}

// 更新页脚
export function updateFooter(data) {
  return request({
    url: `/footer`,
    method: 'put',
    data
  })
}
