const { spawn } = require('child_process')
const path = require('path')

// 设置端口
const PORT = process.env.PORT || 3001
const dbPath = path.join(__dirname, 'db.json')

// 使用npx启动json-server
const jsonServerProcess = spawn('npx', ['json-server', '--watch', dbPath, '--port', PORT], {
  stdio: 'inherit',
  shell: true
})

// 处理退出事件
jsonServerProcess.on('exit', code => {
  if (code !== 0) {
    console.error(`json-server exited with code ${code}`)
  }
})

// 处理错误事件
jsonServerProcess.on('error', error => {
  console.error('Error starting json-server:', error)
})

console.log(`Starting JSON Server on http://localhost:${PORT}`)
