import React from 'react'
import './index.less'
import Headerbox from '@/components/headerbox/index.jsx'

let list = [
  {
    title: 'canvas绘制基础图形详解',
    path: '/3dAnimation/photoAlbum.html'
  }
]

const Index = () => {
  return (
    <div className="canvas-pages">
      <Headerbox htmlList={list}>canvas</Headerbox>
    </div>
  )
}

export default Index
