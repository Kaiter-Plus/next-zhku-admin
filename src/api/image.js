import request from '@/utils/request'

// 创建新的图片
export function createImage(data) {
  return request({
    url: '/image',
    method: 'post',
    data
  })
}

// 获取图片类型
export function fetchImageCategory() {
  return request({
    url: '/image/categories',
    method: 'get'
  })
}

// 获取所有图片
export function fetchImageList() {
  return request({
    url: '/image',
    method: 'get'
  })
}

// 根据 category 获取图片
export function fetchImageByCategory(category, page) {
  return request({
    url: '/image',
    method: 'get',
    params: {
      category,
      ...page
    },
    // 图片比较大，时间久，重新设置超时时间
    timeout: 20000
  })
}

// 根据 id 获取图片
export function fetchImageById(id) {
  return request({
    url: `/image/${id}`,
    method: 'get'
  })
}

// 根据 id 更新图片
export function updateImageById(data) {
  return request({
    url: `/image/${data.id}`,
    method: 'put',
    data
  })
}

// 根据 id 移除图片
export function removeImageById(id) {
  return request({
    url: `/image/${id}`,
    method: 'delete'
  })
}

// 获取所有图片数量
export function fetchImageCount() {
  return request({
    url: `/image/count`,
    method: 'get'
  })
}
