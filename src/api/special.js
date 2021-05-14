import request from '@/utils/request'
import { parseTime } from '@/utils'

// 获取所有专题类型
export function fetchAllSpecialCategory() {
  return request({
    url: '/special/categories/all',
    method: 'get'
  })
}

// 获取专题类型
export function fetchSpecialCategory(page) {
  return request({
    url: '/special/categories',
    method: 'get',
    params: page
  })
}

// 创建新的专题类型
export function createSpecialCategory(data) {
  return request({
    url: '/special/categories',
    method: 'post',
    data
  })
}

// 根据 id 修改专题类型的标题
export function updateSpecialCategory(data) {
  return request({
    url: `/special/categories`,
    method: 'put',
    data
  })
}

// 根据 id 删除专题类型的标题
export function removeSpecialCategory(params) {
  return request({
    url: `/special/categories`,
    method: 'delete',
    params
  })
}

// 创建新的专题
export function createSpecial(data) {
  return request({
    url: '/special',
    method: 'post',
    data
  })
}

// 获取所有专题
export function fetchSpecialList() {
  return request({
    url: '/special',
    method: 'get'
  })
}

// 根据 category 获取专题
export function fetchSpecialByCategory(category, page) {
  return request({
    url: '/special',
    method: 'get',
    params: { category, ...page }
  })
}

// 根据 id 获取专题
export function fetchSpecialById(id) {
  return request({
    url: `/special/${id}`,
    method: 'get'
  })
}

// 根据 id 更新专题
export function updateSpecialById(data) {
  // 处理时间格式
  data.publishTime = parseTime(new Date(data.publishTime))
  return request({
    url: `/special/${data.id}`,
    method: 'put',
    data
  })
}

// 根据 id 移除专题
export function removeSpecialById(id) {
  return request({
    url: `/special/${id}`,
    method: 'delete'
  })
}

// 获取所有专题数量
export function fetchSpecialCount() {
  return request({
    url: `/special/count`,
    method: 'get'
  })
}
