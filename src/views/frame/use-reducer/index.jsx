import React, { useReducer, useState } from 'react'
import './index.less'
const Index = () => {
  return (
    <div className="container">
      <Counter />
      <TodoList />
      <AvoidRepeatCreate />
    </div>
  )
}

const Counter = () => {
  function reducer(state, action) {
    if (action.type === 'incremented_age') {
      return {
        age: state.age + 1
      }
    } else if (action.type === 'decrement_age') {
      return {
        age: state.age - 1
      }
    }
    throw Error('Unknown action.')
  }

  const [state, dispatch] = useReducer(reducer, { age: 10 })

  const incrementClick = () => {
    dispatch({
      type: 'incremented_age'
    })
  }

  const decrementClick = () => {
    dispatch({
      type: 'decrement_age'
    })
  }
  return (
    <div className="box">
      <p>1. 增加和减少年龄</p>
      <button onClick={incrementClick}>Increment age</button>
      <button onClick={decrementClick}>decrement age</button>
      <p>Hello! You are {state.age}.</p>
    </div>
  )
}

let ids = 3
const TodoList = () => {
  const initTasks = [
    { id: 0, text: '吃早饭', done: true },
    { id: 1, text: '上学校', done: false },
    { id: 2, text: '去游乐园', done: false }
  ]

  function reducer(tasks, action) {
    switch (action.type) {
      case 'add':
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false
          }
        ]
      case 'checked':
        return tasks.map(item => {
          if (item.id === +action.id) {
            item.done = !item.done
          }
          return item
        })
      case 'delete':
        return tasks.filter(item => item.id !== +action.id)
      case 'edit':
        return tasks.map(item => {
          if (item.id === +action.id) {
            item.text = action.text
          }
          return item
        })
      default:
        throw Error('Unknown action.')
    }
  }

  const [state, dispatch] = useReducer(reducer, initTasks)
  const [text, setText] = useState('')
  const [switchover, setSwitchover] = useState(true)

  const handleTextChange = e => {
    setText(e.target.value)
  }

  const handleAddClick = () => {
    dispatch({
      type: 'add',
      text: text,
      id: ids++
    })
  }

  const handleCheckChange = e => {
    dispatch({
      type: 'checked',
      id: e.target.id
    })
  }
  const handleDeleteClick = e => {
    dispatch({
      type: 'delete',
      id: e.target.id
    })
  }

  const handleEditChange = e => {
    dispatch({
      type: 'edit',
      id: e.target.id,
      text: e.target.value
    })
  }

  const handleClick = () => {
    setSwitchover(a => !a)
  }

  return (
    <div className="box">
      <p>2. 代办事项的案例</p>
      <label>
        <input value={text} onChange={handleTextChange} />
        <button onClick={handleAddClick}>add</button>
      </label>
      <ul>
        {state.map(item => {
          return (
            <li key={item.id}>
              <input type="checkbox" id={item.id} checked={item.done} onChange={handleCheckChange} />
              {switchover ? (
                <span>{item.text}</span>
              ) : (
                <span>
                  <input id={item.id} type="text" value={item.text} onChange={handleEditChange} />
                  <button onClick={handleClick}>Save</button>
                </span>
              )}
              <button onClick={handleClick}>Edit</button>
              <button id={item.id} onClick={handleDeleteClick}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

let ID = 51
const AvoidRepeatCreate = () => {
  function createInitialState() {
    const initialTodos = []
    for (let i = 0; i < 50; i++) {
      initialTodos.push({
        id: i,
        text: '列表' + (i + 1)
      })
    }
    console.log('重新执行了')
    return initialTodos
  }

  function reducer(todos, action) {
    if (action.type === 'add') {
      return [
        {
          text: action.value,
          id: ID++
        },
        ...todos
      ]
    }
  }
  const [text, setText] = useState('')
  // 没有使用初始化函数
  // const [state, dispatch] = useReducer(reducer, createInitialState())

  // 使用初始化函数
  const [state, dispatch] = useReducer(reducer, null, createInitialState)

  const handleChange = ({ target }) => {
    setText(target.value)
  }

  const handleAdd = () => {
    dispatch({
      type: 'add',
      value: text
    })
  }

  return (
    <div className="box">
      <p>3. 避免重新创建初始值。</p>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>add</button>
      <ul className="secondUl">
        {state.map(item => {
          return <li key={item.id}> {item.text}</li>
        })}
      </ul>
    </div>
  )
}

export default Index
