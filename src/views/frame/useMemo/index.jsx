import React, { useState, useMemo } from 'react'
import Child1 from './Child1.jsx'
import Child2 from './Child2.jsx'
import Child3 from './Child3.jsx'
import Child4 from './Child4.jsx'
const Index = () => {
  return (
    <div className="container">
      <RepeatRendering1 />
      <RepeatRendering2 />
      <RepeatRendering3 />
      <RepeatRendering4 />
      <ExpensiveComponent />
    </div>
  )
}

// 跳过昂贵的重复计算案例开始
function filterTodos(todos, tab) {
  if (tab === 'completed') {
    return todos.filter(item => item.completed)
  } else {
    return todos
  }
}
const TodoList = ({ tab, todos, theme }) => {
  const visibleTodos = useMemo(() => {
    console.log('filterTodo重新计算了')
    return filterTodos(todos, tab)
  }, [todos, tab])

  return (
    <div className={theme}>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

function createTodos() {
  const todos = []
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: 'Todo ' + (i + 1),
      completed: Math.random() > 0.9
    })
  }
  return todos
}

const todos = createTodos()

const ExpensiveComponent = () => {
  const [tab, setTab] = useState('completed')
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  return (
    <div className="box">
      <p>5.跳过昂贵的重新计算。</p>
      <label>
        <input type="checkbox" checked={isDark} onChange={darkChange} />
        Dark mode
      </label>
      <br />
      <button onClick={() => setTab('all')}>All</button>
      <button onClick={() => setTab('completed')}>completed</button>
      <TodoList tab={tab} todos={todos} theme={isDark ? 'dark' : 'light'} />
    </div>
  )
}

// 父组件的渲染会导致子组件的重新渲染
const RepeatRendering1 = () => {
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }
  return (
    <div className="box">
      <p>1.父组件的渲染会递归渲染它的子集</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <Child1 />
      </div>
    </div>
  )
}

//
const RepeatRendering2 = () => {
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }
  return (
    <div className="box">
      <p>2.父组件渲染时跳过子集的渲染</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <Child2 />
      </div>
    </div>
  )
}

const RepeatRendering3 = () => {
  const [isDark, setIsDark] = useState(false)
  const [person, setPerson] = useState({
    name: 'Jack',
    age: 10
  })
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  const addPersonAge = () => {
    setPerson(a => {
      return {
        age: a.age + 1,
        name: a.name
      }
    })
  }

  const per = {
    name: 'chen' + person.name,
    age: person.age
  }

  return (
    <div className="box">
      <p>3.父组件渲染时无法避免子组件的渲染</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <br />
        <button onClick={addPersonAge}>增加组件年龄</button>
        <Child3 person={per} />
      </div>
    </div>
  )
}

const RepeatRendering4 = () => {
  const [isDark, setIsDark] = useState(false)
  const [person, setPerson] = useState({
    name: 'Jack',
    age: 10
  })
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  const addPersonAge = () => {
    setPerson(a => {
      return {
        age: a.age + 1,
        name: a.name
      }
    })
  }

  const per = useMemo(() => {
    return {
      name: 'chen' + person.name,
      age: person.age
    }
  }, [person.age, person.name])

  return (
    <div className="box">
      <p>4.父组件渲染时有选择的渲染子集</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <br />
        <button onClick={addPersonAge}>增加组件年龄</button>
        <Child4 person={per} />
      </div>
    </div>
  )
}

export default Index
