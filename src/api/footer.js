import request from '@/utils/request'

// 获取页脚
export function fetchFooter() {
  return request({
    url: 'http://localhost:8888/footer',
    method: 'get'
  })
}

// 更新页脚
export function updateFooter(data) {
  return request({
    url: `http://localhost:8888/footer`,
    method: 'put',
    data
  })
}
