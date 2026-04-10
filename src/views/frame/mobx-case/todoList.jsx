import React from 'react'
import { inject, observer } from 'mobx-react'

const TodoList = inject('todoListStore')(
  observer(({ todoListStore }) => {
    console.log(todoListStore)
    const addProduct = () => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ name: '小米', price: '$2000' })
        }, 1000)
      }, 1000).then(res => {
        todoListStore.addList(res)
      })
    }
    return (
      <div>
        <button onClick={addProduct}>添加产品</button>
        {todoListStore.list.map((item, index) => (
          <div key={index}>
            <span>产品：{item.name}</span>
            &nbsp;&nbsp;
            <span>价格：{item.price}</span>
          </div>
        ))}
      </div>
    )
  })
)

export default TodoList
