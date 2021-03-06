import request from '@/utils/request'

// 获取所有链接类型
export function fetchAllLinkCategory() {
  return request({
    url: '/link/categories/all',
    method: 'get'
  })
}

// 获取链接类型
export function fetchLinkCategory(page) {
  return request({
    url: '/link/categories',
    method: 'get',
    params: page
  })
}

// 创建新的链接类型
export function createLinkCategory(data) {
  return request({
    url: '/link/categories',
    method: 'post',
    data
  })
}

// 根据 id 修改链接类型的标题
export function updateLinkCategory(data) {
  return request({
    url: `/link/categories`,
    method: 'put',
    data
  })
}

// 根据 id 删除链接类型的标题
export function removeLinkCategory(params) {
  return request({
    url: `/link/categories`,
    method: 'delete',
    params
  })
}

// 根据 category 获取链接
export function fetchLinkByCategory(category, page) {
  return request({
    url: '/link',
    method: 'get',
    params: { category, ...page }
  })
}

// 根据 id 获取链接
export function fetchLinkById(id) {
  return request({
    url: `/link/${id}`,
    method: 'get'
  })
}

// 根据 id 更新链接
export function updateLinkById(data) {
  return request({
    url: `/link/${data.id}`,
    method: 'put',
    data
  })
}

// 根据 id 移除链接
export function removeLinkById(id) {
  return request({
    url: `/link/${id}`,
    method: 'delete'
  })
}

// 创建新的链接
export function createLink(data) {
  return request({
    url: '/link',
    method: 'post',
    data
  })
}

// 获取所有链接数量
export function fetchLinkCount() {
  return request({
    url: `/link/count`,
    method: 'get'
  })
}
