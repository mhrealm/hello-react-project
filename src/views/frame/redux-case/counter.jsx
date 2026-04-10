import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
// import { increment, incrementByAmount, decrement } from '../../store/redux/redux-slices/counterSlice'

const Index = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => {
    return state.counterReducer.value
  })
  return (
    <div>
      <button
        onClick={() => {
          // 第一种写法
          // dispatch(increment())
          // 第二种写法
          dispatch({ type: 'counterName/increment' })
        }}
      >
        increment
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          dispatch({ type: 'counterName/decrement' })
        }}
      >
        decrement
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'counterName/incrementByAmount', payload: 10 })
        }}
      >
        incermentByAmount
      </button>
    </div>
  )
}

export default Index
