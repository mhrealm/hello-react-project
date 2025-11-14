import React from 'react'
import './index.less'
import Headerbox from '@/components/headerbox/index.jsx'

let list = [
  {
    title: '视频全屏播放被暂停？',
    path: '/videoRelated/videoPlaying.html'
  }
]

const Index = () => {
  return (
    <div className="canvas-pages">
      <Headerbox htmlList={list}>视频相关</Headerbox>
    </div>
  )
}

export default Index
