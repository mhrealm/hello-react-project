import React, { useRef, useState } from 'react'
import './index.less'

// 模拟请求
const fetchData = (index, size) => {
  console.log('index', index)
  console.log('size', size)
  return new Promise((resolve, reject) => {
    let datas = []
    for (let i = index * size - size; i < index * size; i++) {
      datas.push({
        id: i,
        content: `${i}我是商品列表元素`
      })
    }
    setTimeout(() => {
      if (datas.length >= 10) {
        resolve(datas)
      } else {
        reject([])
      }
    }, 1000)
  })
}

const Index = () => {
  const pageSise = 10
  const pageIndex = useRef(1)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  // 初始化页面数据
  let pageInit = async () => {
    try {
      setLoading(true)
      let data = await fetchData(pageIndex.current, pageSise)
      setItems([...items, ...data])
      console.log('data', data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // 实现下拉加载功能
  const handlyScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollTop + clientHeight === scrollHeight) {
      pageIndex.current++
      // console.log('pageIndex', pageIndex.current)
      pageInit()
    }
  }

  // 实现上拉刷新

  // useEffect(() => {
  //   pageInit()
  // }, [])

  return (
    <div className="refresh">
      <div className="list" onScroll={handlyScroll}>
        {items.map(item => (
          <div className="item" key={item.id}>
            {item.content}
          </div>
        ))}
        {loading && <div className="loading">loadding...</div>}
      </div>
    </div>
  )
}

export default Index
