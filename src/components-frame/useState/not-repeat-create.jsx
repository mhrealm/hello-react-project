import React, { useState } from 'react'

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
    <div className="min-module">
      <h1>3、如何避免重新创建初始化状态</h1>
      <input value={text} onChange={onChange} />
      <button onClick={addClick}>Add</button>
      <ul>
        {todos.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}
export default NotRepeatCreate
