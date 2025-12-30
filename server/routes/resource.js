const express = require('express')
const { success, clientError } = require('../utils/response')

const router = express.Router()

module.exports = (dbData, saveDatabase) => {
  // 获取图片资源列表 - 优化版：添加参数验证和请求数量限制
  router.get('/imageAddress/:num', (req, res) => {
    const num = parseInt(req.params.num, 10)
    // 参数验证
    if (isNaN(num) || num <= 0) {
      return clientError(res, 400, 'Invalid number parameter. Please provide a positive integer.')
    }
    const urls = []
    // 生成图片地址
    for (let i = 0; i < num; i++) {
      // 使用robohash生成唯一的机器人图片
      const url = `https://robohash.org/${i}.png?set=set4`
      urls.push(url)
    }
    return success(res, urls, '图片地址获取成功')
  })

  return router
}
