import React, { useState, useEffect } from 'react'
import './index.less'

const pageSize = 5

const LoadWithRefresh = () => {
  const [list, setList] = useState([])

  // ========== 模拟接口请求 ==========
  const fetchList = async currentPage => {
    return new Promise(resolve => {
      setTimeout(() => {
        const data = Array.from({ length: pageSize }, (_, i) => ({
          url: `https://robohash.org/${i}.png?grayscale&set=set4&size=200x200`,
          title: `兰博基尼 ${(currentPage - 1) * pageSize + i + 1}`,
          desc: `这是兰博基尼最新款 ${(currentPage - 1) * pageSize + i + 1}`
        }))
        resolve(data)
      }, 1000)
    })
  }

  const initPage = async () => {
    const data = await fetchList(1)
    setList(data)
  }

  useEffect(initPage, [])

  return (
    <section className="load-with-refresh">
      {list.map((item, index) => (
        <div key={index} className="list">
          <img src={item.url} alt={item.title} />
          <div className="desc">
            <span>{item.title}</span>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default LoadWithRefresh
