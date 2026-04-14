// server/renderer.js
module.exports = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (req.method === 'GET') {
      const data = JSON.parse(body);
      // 包装响应对象
      return originalSend.call(
        this,
        JSON.stringify({
          code: 200,
          success: true,
          message: '操作成功',
          data: data,
        })
      );
    }
    return originalSend.call(this, body);
  };
  next();
};
