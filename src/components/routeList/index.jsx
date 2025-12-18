import React from 'react'
import './index.less'
import router from '@/router/router.js'
import { useNavigate } from 'react-router-dom'

const RouteList = ({ path }) => {
  // 根据路径查找对应的子路由
  let list = router.routes.find(i => i.path == path && i.children?.length > 0)?.children
  const navigate = useNavigate()

  // 导航处理函数
  const toLink = item => {
    navigate(item.path, { state: { title: item.name } })
    document.title = item.name
  }

  return (
    <div className="route-list-container">
      {list?.map(item => (
        <div
          className="route-list-item"
          key={item.path}
          onClick={() => {
            toLink(item)
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default RouteList
