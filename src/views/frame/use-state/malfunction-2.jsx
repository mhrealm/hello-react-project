import React, { useState } from 'react'

const Malfunction2 = () => {
  const [person, SetPerson] = useState({ name: 'zhaungshan', age: 18 })

  const handleChange = () => {
    // 🙅错误示范
    SetPerson({ ...person, age: person.age + 1 })
    console.log(person.age) // 18

    // 🙆正确做法
    // const Nage = person.age + 1
    // SetPerson({ ...person, age: Nage })
  }

  return (
    <section>
      <h1>6、故障排查:状态改变，日志记录没有更新?</h1>
      <button onClick={handleChange}>age:{person.age}</button>
    </section>
  )
}
export default Malfunction2
