import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { addList } from '../../store/redux/redux-slices/todoListSlice.js'

export default function TodoList() {
  const list = useSelector(state => {
    return state.todoList.list
  })
  const dispatch = useDispatch()

  const request = name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === '小米') {
          resolve({ name: '小米', price: '$2000' })
        }
      }, 1000)
    })
  }

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            let product = await request('小米')
            dispatch({ type: 'todoList/addList', payload: product })
          }}
        >
          添加一项
        </button>
        <div>
          {list.map((item, index) => {
            return (
              <div key={index}>
                <span>产品：{item.name}</span>
                &nbsp;&nbsp;
                <span>价格：{item.price}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
