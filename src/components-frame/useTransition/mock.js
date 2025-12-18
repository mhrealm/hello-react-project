// 模拟一秒钟返回数据
const updateQuantity = async value => {
  return new Promise((resole, reject) => {
    setTimeout(() => {
      return resole(value)
    }, 2000)
  })
}

export { updateQuantity }
