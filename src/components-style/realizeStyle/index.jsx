import React from 'react'

import './index.less'

const Index = () => {
  return (
    <div className="realize-style">
      <Background />
    </div>
  )
}

const Background = () => {
  return (
    <div>
      <p>实现一个头像的效果</p>
      <div className="background">
        <div className="left"></div>
        <div className="right">
          <span>昵称: 你好</span>
          <span>微信号: 00mh</span>
          <span>地区: 中国大陆</span>
        </div>
      </div>
    </div>
  )
}

export default Index
