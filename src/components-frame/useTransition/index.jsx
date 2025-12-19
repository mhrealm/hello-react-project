import React from 'react'
import ShoppingTrolley from '@/components-frame/useTransition/shopping-trolley.jsx'
import ListFiltering from '@/components-frame/useTransition/list-filtering.jsx'
import DataVisualization from '@/components-frame/useTransition/data-visualization.jsx'
import './index.less'

const Index = () => {
  return (
    <div className="useTransition">
      {/* 场景1: 购物车异步更新 */}
      <ShoppingTrolley />

      {/* 场景2: 大型列表过滤 */}
      <ListFiltering />

      {/* 场景3: 数据可视化的动态更新 */}
      <DataVisualization />
    </div>
  )
}

export default Index
