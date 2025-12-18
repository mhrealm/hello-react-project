import React, { useState } from 'react'

const UpdateObject = () => {
  const [person, setPerson] = useState({
    name: 'zhuangshan',
    age: 20
  })
  const handleClick = () => {
    // 🙅错误做法
    // person.name = 'lishi'

    // 🙆正确做法
    setPerson({
      ...person,
      name: 'lishi'
    })
  }
  return (
    <div className="min-module">
      <h1>2、更新状态中的对象和数组</h1>
      <button onClick={handleClick}>
        name: {person.name} == age:{person.age}
      </button>
    </div>
  )
}
export default UpdateObject
