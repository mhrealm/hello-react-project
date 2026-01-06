const express = require('express')
const { success, clientError } = require('../utils/response')

const router = express.Router()

module.exports = (dbData, saveDatabase) => {
  // 获取图片资源列表
  router.post('/imageAddress', (req, res) => {
    const { amount, type } = req.body
    // 参数验证
    const num = parseInt(amount, 10)
    if (isNaN(num) || num <= 0) {
      return clientError(res, 400, 'Invalid amount parameter. Please provide a positive integer.')
    }
    const urls = []
    // 生成图片地址
    for (let i = 0; i < amount; i++) {
      // 使用placehold.co生成图片
      let url = `https://robohash.org/${i}.png`
      if (type) {
        url += `?${type}`
      }
      urls.push(url)
    }
    return success(res, urls, '图片地址获取成功')
  })

  return router
}
