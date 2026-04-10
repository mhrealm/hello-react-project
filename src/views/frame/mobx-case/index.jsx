import React from 'react'
import './index.less'
import Counter from './counter.jsx'
import TodoList from './todoList.jsx'

const Index = () => {
  return (
    <div className="index">
      <Counter />
      <TodoList />
    </div>
  )
}

export default Index
