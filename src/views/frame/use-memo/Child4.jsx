import React, { memo } from 'react'

const Child4 = memo(({ person }) => {
  console.log('Child4重新渲染了', person)
  return (
    <div>
      <p>Child4</p>
      <div>姓名：{person.name}</div>
      <div>年龄：{person.age}</div>
    </div>
  )
})

export default Child4
