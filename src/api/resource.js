import request from '@/utils/request'

// 获取图片资源列表
export const getImageAddress = params => {
  return request({
    url: `/resource/imageAddress`,
    method: 'get',
    params
  })
}
