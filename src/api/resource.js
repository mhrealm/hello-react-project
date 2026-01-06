import request from '@/utils/request'

/**
 * 获取图片资源列表（机器人图片）
 * @param {Object} data - 请求参数
 * @param {number} data.amount - 请求图片的数量
 * @param {string} data.type - 图片的类型，例如 'set=set2' 添加 `?set=setX` 参数（X 为 1-4，对应 4 种不同机器人风格） 添加 `?grayscale` 参数 代表灰度模式
 * @returns {Promise<Array<string>>} 图片地址列表
 */
export const getImageAddress = data => {
  return request({
    url: `/resource/imageAddress`,
    method: 'post',
    data
  })
}
