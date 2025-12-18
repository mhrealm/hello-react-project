import React, { memo } from 'react'

const Child2 = memo(() => {
  console.log('Child2重新渲染了')
  return (
    <div>
      <p>Child2</p>
      <div>当前的日期的时间戳：{new Date().getTime()}</div>
    </div>
  )
})

export default Child2
