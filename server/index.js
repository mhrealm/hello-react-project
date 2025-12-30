const express = require('express')
const fs = require('fs')
const path = require('path')

// 导入路由模块
const cartItemsRouter = require('./routes/cartItems')
const itemsRouter = require('./routes/items')
const resourceRouter = require('./routes/resource')

const app = express()
const PORT = process.env.PORT || 3001

// 读取数据文件
const dbPath = path.join(__dirname, 'db.json')
let dbData = {}

// 尝试读取数据库文件
function loadDatabase() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8')
    dbData = JSON.parse(data)
  } catch (error) {
    console.error('Error reading database file:', error.message)
    dbData = {
      cartItems: [],
      items: []
    }
  }
}

// 保存数据库到文件
function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8')
  } catch (error) {
    console.error('Error saving database file:', error.message)
  }
}

// 初始加载数据
loadDatabase()

// 中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS 中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// 注册路由
app.use('/cartItems', cartItemsRouter(dbData, saveDatabase))
app.use('/items', itemsRouter(dbData, saveDatabase))
app.use('/resource', resourceRouter(dbData, saveDatabase))

// 启动服务器
app.listen(PORT, () => {
  console.log(`JSON Server started on PORT: ${PORT}`)
  console.log('Endpoints:')
  console.log(`http://localhost:${PORT}/cartItems`)
  console.log(`http://localhost:${PORT}/items`)
  console.log(`http://localhost:${PORT}/resource/imageAddress/:num`)
})
