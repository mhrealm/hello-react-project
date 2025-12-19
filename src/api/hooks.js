import api from '@/utils/request'

export const getUseTansitionCartItems = () => {
  return api.get('/cartItems')
}

export const updateQuantity = async value => {
  // 模拟API延迟，保持与原mock一致的2秒延迟
  await new Promise(resolve => setTimeout(resolve, 2000))

  return api
    .patch('/cartItems/1', {
      quantity: parseInt(value)
    })
    .then(res => res.quantity)
}

// 获取列表数据
export const generateMockData = async count => {
  // 从json-server获取基础数据
  const items = await api.get('/items')

  // 如果需要的数量超过现有数据，则复制现有数据
  if (count > items.length) {
    const originalItems = [...items]
    for (let i = items.length; i < count; i++) {
      const originalIndex = i % originalItems.length
      items.push({
        ...originalItems[originalIndex],
        id: i + 1,
        name: `${originalItems[originalIndex].name}-${Math.floor(i / originalItems.length) + 1}`
      })
    }
  } else if (count < items.length) {
    // 如果需要的数量少于现有数据，则截断
    items = items.slice(0, count)
  }

  return items
}
