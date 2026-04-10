import React from 'react'

const Index = () => {
  console.log('Child1重新渲染了')
  return (
    <div>
      <p>Child1</p>
      <div>当前的日期的时间戳：{new Date().getTime()}</div>
    </div>
  )
}

export default Index
