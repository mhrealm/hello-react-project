import React, { forwardRef, useImperativeHandle, useRef } from 'react'
const Index = () => {
  return (
    <div className="container">
      <InputFocus />
    </div>
  )
}

const Son = forwardRef((props, ref) => {
  const inputRef = useRef()

  // 自定义的子组件的中的聚焦方法
  const focusHandle = () => {
    inputRef.current.focus()
  }

  // 用于暴露子组件中的方法
  useImperativeHandle(ref, () => {
    return {
      focusHandle
    }
  })

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  )
})

const InputFocus = () => {
  const ref = useRef()
  const changeFocus = () => {
    // 通过ref去调用子组件中的方法
    ref.current.focusHandle()
  }
  return (
    <div className="box">
      <Son ref={ref} />
      <button onClick={changeFocus}>点击输入框聚焦</button>
    </div>
  )
}

export default Index
