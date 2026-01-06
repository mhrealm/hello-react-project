import request from '@/utils/request'

// 获取图片资源列表
export const getImageAddress = data => {
  return request({
    url: `/resource/imageAddress`,
    method: 'post',
    data
  })
}
