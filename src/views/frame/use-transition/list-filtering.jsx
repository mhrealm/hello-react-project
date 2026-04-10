import React, { useState, useTransition, useEffect } from 'react'
import { generateMockData } from '@/api/hooks.js'

const ListFiltering = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取大型模拟数据（1000个项目）
    const fetchData = async () => {
      try {
        const data = await generateMockData(1000)
        setItems(data)
      } catch (error) {
        console.error('Failed to fetch items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="useTransition scene-title">加载中...</div>
  }

  return (
    <div className="useTransition">
      <div className="scene-title">场景2: 大型列表过滤</div>
      <div className="comparison-container">
        <LargeListWithoutTransition items={items} />
        <LargeListWithTransition items={items} />
      </div>
    </div>
  )
}

// 不使用useTransition的大型列表过滤
const LargeListWithoutTransition = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState(items)
  const [isPending, setIsPending] = useState(false)

  const handleSearch = ({ target }) => {
    const term = target.value
    setSearchTerm(term)
    setIsPending(true)

    // 模拟复杂过滤操作
    setTimeout(() => {
      const filtered = items.filter(
        item =>
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.description.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredItems(filtered)
      setIsPending(false)
    }, 200) // 模拟200ms的过滤延迟
  }

  return (
    <div className="shoppingTrolley">
      <div className="title">不使用useTransition</div>
      <div className="search-input">
        <input type="text" placeholder="搜索项目..." value={searchTerm} onChange={handleSearch} />
        {isPending && <span className="pending-indicator">🌀 Filtering...</span>}
      </div>
      <div className="list-container">
        <h4>搜索结果: {filteredItems.length} 项</h4>
        <ul className="large-list">
          {filteredItems.slice(0, 50).map(item => (
            <li key={item.id} className="list-item">
              <span className="item-name">{item.name}</span>
              <span className="item-desc">{item.description}</span>
            </li>
          ))}
          {filteredItems.length > 50 && (
            <li className="list-item more-items">+ 还有 {filteredItems.length - 50} 项未显示</li>
          )}
        </ul>
      </div>
    </div>
  )
}

// 使用useTransition的大型列表过滤
const LargeListWithTransition = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState(items)
  const [isPending, startTransition] = useTransition()

  const handleSearch = ({ target }) => {
    const term = target.value
    setSearchTerm(term) // 紧急更新：立即更新输入框内容

    // 非紧急更新：使用useTransition包装过滤操作
    startTransition(() => {
      // 模拟复杂过滤操作
      setTimeout(() => {
        const filtered = items.filter(
          item =>
            item.name.toLowerCase().includes(term.toLowerCase()) ||
            item.description.toLowerCase().includes(term.toLowerCase())
        )
        setFilteredItems(filtered)
      }, 200) // 模拟200ms的过滤延迟
    })
  }

  return (
    <div className="shoppingTrolley">
      <div className="title">使用useTransition</div>
      <div className="search-input">
        <input type="text" placeholder="搜索项目..." value={searchTerm} onChange={handleSearch} />
        {isPending && <span className="pending-indicator">🌀 Filtering...</span>}
      </div>
      <div className="list-container">
        <h4>搜索结果: {filteredItems.length} 项</h4>
        <ul className="large-list">
          {filteredItems.slice(0, 50).map(item => (
            <li key={item.id} className="list-item">
              <span className="item-name">{item.name}</span>
              <span className="item-desc">{item.description}</span>
            </li>
          ))}
          {filteredItems.length > 50 && (
            <li className="list-item more-items">+ 还有 {filteredItems.length - 50} 项未显示</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ListFiltering
