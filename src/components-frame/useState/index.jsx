import React, { useState } from 'react'
import './index.less'

const Index = () => {
  return (
    <div className="container">
      <AddState />
      <UpdateObject />
      <NotRepeatCreate />
      <KeyResetComponent />
      <Malfunction1 />
      <Malfunction2 />
    </div>
  )
}

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
    <div className="box">
      <p>1、向组件中添加状态,并根据之前的状态改变状态</p>
      <button onClick={handleClick}>age: {age} </button>
    </div>
  )
}

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
    <div className="box">
      <p>2、更新状态中的对象和数组</p>
      <button onClick={handleClick}>
        name: {person.name} == age:{person.age}
      </button>
    </div>
  )
}

const NotRepeatCreate = () => {
  function createInitialTodos() {
    const initialTodos = []
    for (let i = 0; i < 50; i++) {
      initialTodos.push({
        id: i,
        text: 'Item ' + (i + 1)
      })
    }
    // console.log('initialTodos', initialTodos)
    return initialTodos
  }

  // 🙅错误做法
  // const [todos, setTodos] = useState(createInitialTodos())
  const [todos, setTodos] = useState(createInitialTodos)
  const [text, setText] = useState('')

  const addClick = () => {
    setText('')
    setTodos([
      {
        id: todos.length,
        text: text
      },
      ...todos
    ])
  }
  const onChange = e => {
    setText(e.target.value)
  }
  return (
    <div className="box">
      <p>3、如何避免重新创建初始化状态</p>
      <input value={text} onChange={onChange} />
      <button onClick={addClick}>Add</button>
      <ul className="list">
        {todos.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

const KeyResetComponent = () => {
  function Input() {
    const [value, setValue] = useState('zhaungshan')
    return <input onChange={e => setValue(e.target.value)} value={value} />
  }
  const [key, setKey] = useState(0)
  const handleReset = () => {
    setKey(key + 1)
  }
  return (
    <div className="box">
      <p>4、通过键值重置组件状态</p>
      <button onClick={handleReset}>Reset</button>
      <Input key={key} />
    </div>
  )
}

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
    <div className="box">
      <p>5、故障排查:状态改变，页面没有更新?</p>
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}

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
    <div className="box">
      <p>6、故障排查:状态改变，日志记录没有更新?</p>
      <button onClick={handleChange}>age:{person.age}</button>
    </div>
  )
}
export default Index
