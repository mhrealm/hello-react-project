const express = require('express')
const { success, created, clientError } = require('../utils/response')

// 创建路由实例
const router = express.Router()

// 导出路由函数，接收dbData和saveDatabase作为参数
module.exports = (dbData, saveDatabase) => {
  // GET /cartItems
  router.get('/', (req, res) => {
    return success(res, dbData.cartItems, '购物车列表获取成功')
  })

  // GET /cartItems/:id
  router.get('/:id', (req, res) => {
    const id = req.params.id
    const item = dbData.cartItems.find(item => item.id === id)
    if (item) {
      return success(res, item, '购物车项获取成功')
    } else {
      return clientError(res, 404, '购物车项不存在')
    }
  })

  // POST /cartItems
  router.post('/', (req, res) => {
    const newItem = {
      id: Date.now().toString(),
      ...req.body
    }
    dbData.cartItems.push(newItem)
    saveDatabase()
    return created(res, newItem, '购物车项添加成功')
  })

  // PUT /cartItems/:id
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const index = dbData.cartItems.findIndex(item => item.id === id)
    if (index !== -1) {
      dbData.cartItems[index] = {
        ...dbData.cartItems[index],
        ...req.body
      }
      saveDatabase()
      return success(res, dbData.cartItems[index], '购物车项更新成功')
    } else {
      return clientError(res, 404, '购物车项不存在')
    }
  })

  // DELETE /cartItems/:id
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    const initialLength = dbData.cartItems.length
    dbData.cartItems = dbData.cartItems.filter(item => item.id !== id)

    if (dbData.cartItems.length < initialLength) {
      saveDatabase()
      return success(res, null, '购物车项删除成功')
    } else {
      return clientError(res, 404, '购物车项不存在')
    }
  })

  return router
}
