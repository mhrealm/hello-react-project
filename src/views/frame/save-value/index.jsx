import React, { useState, useRef } from 'react'
import './index.less'

const Son1 = () => {
  const [value, setValue] = useState('')
  const [prevValue, setPrevValue] = useState('')

  const handleChange = event => {
    setPrevValue(() => value) // 更新前保存当前值
    setValue(() => event.target.value) // 更新新值
  }
  return (
    <div className="box">
      <p>将更新前的值保存在一个state变量中</p>
      <input type="text" value={value} onChange={handleChange} />
      <p>当前值: {value}</p>
      <p>更新前的值: {prevValue}</p>
    </div>
  )
}

const Son2 = () => {
  const [value, setValue] = useState('')
  const prevValueRef = useRef('')

  const handleChange = event => {
    prevValueRef.current = value // 保存当前值
    setValue(event.target.value) // 更新新值
  }
  return (
    <div className="box">
      <p>使用useRef保存临时状态</p>
      <input type="text" value={value} onChange={handleChange} />
      <p>当前值: {value}</p>
      <p>更新前的值: {prevValueRef.current}</p>
    </div>
  )
}

const Index = () => {
  return (
    <div className="saveValue">
      <Son1 />
      <Son2 />
    </div>
  )
}

export default Index
