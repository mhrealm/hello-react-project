const express = require('express')
const fs = require('fs')
const path = require('path')

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

// API 端点

// GET /cartItems
app.get('/cartItems', (req, res) => {
  res.json(dbData.cartItems)
})

// GET /cartItems/:id
app.get('/cartItems/:id', (req, res) => {
  const id = req.params.id
  const item = dbData.cartItems.find(item => item.id === id)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

// POST /cartItems
app.post('/cartItems', (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    ...req.body
  }
  dbData.cartItems.push(newItem)
  saveDatabase()
  res.status(201).json(newItem)
})

// PUT /cartItems/:id
app.put('/cartItems/:id', (req, res) => {
  const id = req.params.id
  const index = dbData.cartItems.findIndex(item => item.id === id)
  if (index !== -1) {
    dbData.cartItems[index] = {
      ...dbData.cartItems[index],
      ...req.body
    }
    saveDatabase()
    res.json(dbData.cartItems[index])
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

// DELETE /cartItems/:id
app.delete('/cartItems/:id', (req, res) => {
  const id = req.params.id
  const initialLength = dbData.cartItems.length
  dbData.cartItems = dbData.cartItems.filter(item => item.id !== id)

  if (dbData.cartItems.length < initialLength) {
    saveDatabase()
    res.status(204).send()
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

// GET /items
app.get('/items', (req, res) => {
  res.json(dbData.items)
})

// GET /items/:id
app.get('/items/:id', (req, res) => {
  const id = req.params.id
  const item = dbData.items.find(item => item.id === id)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

// POST /items
app.post('/items', (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    ...req.body
  }
  dbData.items.push(newItem)
  saveDatabase()
  res.status(201).json(newItem)
})

// PUT /items/:id
app.put('/items/:id', (req, res) => {
  const id = req.params.id
  const index = dbData.items.findIndex(item => item.id === id)
  if (index !== -1) {
    dbData.items[index] = {
      ...dbData.items[index],
      ...req.body
    }
    saveDatabase()
    res.json(dbData.items[index])
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

// DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const id = req.params.id
  const initialLength = dbData.items.length
  dbData.items = dbData.items.filter(item => item.id !== id)

  if (dbData.items.length < initialLength) {
    saveDatabase()
    res.status(204).send()
  } else {
    res.status(404).json({ message: 'Item not found' })
  }
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`JSON Server started on PORT: ${PORT}`)
  console.log('Endpoints:')
  console.log(`http://localhost:${PORT}/cartItems`)
  console.log(`http://localhost:${PORT}/items`)
})
