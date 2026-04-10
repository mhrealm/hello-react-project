import React, { useState } from 'react'

const AddState = () => {
  const [age, setAge] = useState(10)

  const handleClick = () => {
    // 直接变更状态
    // setAge(age + 1)
    // setAge(age + 1)
    // setAge(age + 1)

    // 传递一个更新函数
    setAge(val => val + 1)
    setAge(val => val + 1)
    setAge(val => val + 1)
  }
  return (
    <section>
      <h1>1、向组件中添加状态,并根据之前的状态改变状态</h1>
      <button onClick={handleClick}>age: {age} </button>
    </section>
  )
}

export default AddState
