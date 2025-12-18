import React, { memo } from 'react'

const Child3 = memo(({ person }) => {
  console.log('Child3重新渲染了', person)
  return (
    <div>
      <p>Child3</p>
      <div>姓名：{person.name}</div>
      <div>年龄：{person.age}</div>
    </div>
  )
})
export default Child3
