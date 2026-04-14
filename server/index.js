const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// 1. 组合数据源：将不同文件合并为一个对象
const db = {
  menus: require('./data/menus.json'),
  users: require('./data/users.json'),
};

const router = jsonServer.router(db);

// 2. 引入你的响应格式化中间件
server.use(middlewares);
server.use(jsonServer.jsonParser);

// 统一响应格式逻辑
server.use((req, res, next) => {
  const isGet = req.method === 'GET';
  const originalSend = res.send;
  res.send = function (body) {
    // 只拦截成功的 API 请求
    if (res.statusCode >= 200 && res.statusCode < 300) {
      try {
        const data = JSON.parse(body);
        return originalSend.call(
          this,
          JSON.stringify({
            code: 200,
            success: true,
            message: '操作成功',
            data: data,
          })
        );
      } catch (e) {
        return originalSend.call(this, body);
      }
    }
    return originalSend.call(this, body);
  };
  next();
});

server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
