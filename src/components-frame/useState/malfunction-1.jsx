import React, { useState } from 'react'

const Malfunction1 = () => {
  const [person, SetPerson] = useState({ name: 'zhaungshan', age: 18 })
  const handleChange = () => {
    // 🙅错误示范
    // person.age = 19
    // console.log('person', person) // {name: 'zhaungshan', age: 19}
    // SetPerson(person)

    // 🙆正确做法
    SetPerson({ ...person, age: 19 })
  }

  return (
    <div className="min-module">
      <h1>5、故障排查:状态改变，页面没有更新?</h1>
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}

export default Malfunction1
