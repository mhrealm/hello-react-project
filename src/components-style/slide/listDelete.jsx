import React, { useState } from 'react'

const ListItem = ({ item, onDelete }) => {
  const [swipeX, setSwipeX] = useState(0)

  const handleTouchStart = e => {
    // 记录触摸起始位置
    const touchStartX = e.touches[0].clientX
    setSwipeX(touchStartX)
  }

  const handleTouchMove = e => {
    // 计算滑动距离
    const touchCurrentX = e.touches[0].clientX
    const deltaX = touchCurrentX - swipeX
    if (deltaX < 0) {
      // 只允许左滑
      setSwipeX(deltaX)
    }
  }

  const handleTouchEnd = () => {
    // 处理滑动结束逻辑
    if (swipeX < -10) {
      // 删除阈值设置为30px
      setSwipeX(-60) // 完全显示删除按钮
    } else {
      setSwipeX(0) // 回归原位
    }
  }
  return (
    <div
      className="list-item"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${swipeX}px)` }}
    >
      <div className="content">{item.content}</div>
      <button
        className="delete-btn"
        onClick={() => {
          console.log(1111)
          onDelete(item.id)
        }}
      >
        删除
      </button>
    </div>
  )
}

const ListDelete = () => {
  const [items, setItems] = useState([
    { id: 1, content: '1 我是滑动可删除元素' },
    { id: 2, content: '2 我是滑动可删除元素' },
    { id: 3, content: '3 我是滑动可删除元素' }
  ])

  const handleDelete = id => {
    console.log(999, id)
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div>
      <p> 滑动删除功能(未完待续....)</p>
      <div className="listDelete">
        {items.map(item => (
          <ListItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default ListDelete
