import request from '@/utils/request'
import { parseTime } from '@/utils'

// 获取所有链接类型
export function fetchAllNewsCategory() {
  return request({
    url: '/news/categories/all',
    method: 'get'
  })
}

// 获取新闻类型
export function fetchNewsCategory(page) {
  return request({
    url: '/news/categories',
    method: 'get',
    params: page
  })
}

// 创建新的新闻类型
export function createNewsCategory(data) {
  return request({
    url: '/news/categories',
    method: 'post',
    data
  })
}

// 根据 id 修改新闻类型的标题
export function updateNewsCategory(data) {
  return request({
    url: `/news/categories`,
    method: 'put',
    data
  })
}

// 根据 id 删除新闻类型的标题
export function removeNewsCategory(params) {
  return request({
    url: `/news/categories`,
    method: 'delete',
    params
  })
}

// 创建新的新闻
export function createNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}

// 获取所有新闻
export function fetchNewsList() {
  return request({
    url: '/news',
    method: 'get'
  })
}

// 根据 category 获取新闻
export function fetchNewsByCategory(category, page) {
  return request({
    url: '/news',
    method: 'get',
    params: { category, ...page }
  })
}

// 根据 id 获取新闻
export function fetchNewsById(id) {
  return request({
    url: `/news/${id}`,
    method: 'get'
  })
}

// 根据 id 更新新闻
export function updateNewsById(data) {
  // 处理时间格式
  data.publishTime = parseTime(new Date(data.publishTime))
  return request({
    url: `/news/${data.id}`,
    method: 'put',
    data
  })
}

// 根据 id 移除新闻
export function removeNewsById(id) {
  return request({
    url: `/news/${id}`,
    method: 'delete'
  })
}
