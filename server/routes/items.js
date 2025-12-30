const express = require('express')
const { success, created, clientError } = require('../utils/response')

// 创建路由实例
const router = express.Router()

// 导出路由函数，接收dbData和saveDatabase作为参数
module.exports = (dbData, saveDatabase) => {
  // GET /items
  router.get('/', (req, res) => {
    return success(res, dbData.items, '商品列表获取成功')
  })

  // GET /items/:id
  router.get('/:id', (req, res) => {
    const id = req.params.id
    const item = dbData.items.find(item => item.id === id)
    if (item) {
      return success(res, item, '商品获取成功')
    } else {
      return clientError(res, 404, '商品不存在')
    }
  })

  // POST /items
  router.post('/', (req, res) => {
    const newItem = {
      id: Date.now().toString(),
      ...req.body
    }
    dbData.items.push(newItem)
    saveDatabase()
    return created(res, newItem, '商品添加成功')
  })

  // PUT /items/:id
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const index = dbData.items.findIndex(item => item.id === id)
    if (index !== -1) {
      dbData.items[index] = {
        ...dbData.items[index],
        ...req.body
      }
      saveDatabase()
      return success(res, dbData.items[index], '商品更新成功')
    } else {
      return clientError(res, 404, '商品不存在')
    }
  })

  // DELETE /items/:id
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    const initialLength = dbData.items.length
    dbData.items = dbData.items.filter(item => item.id !== id)

    if (dbData.items.length < initialLength) {
      saveDatabase()
      return success(res, null, '商品删除成功')
    } else {
      return clientError(res, 404, '商品不存在')
    }
  })

  return router
}
