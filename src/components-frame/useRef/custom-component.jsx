import React, { useRef, forwardRef } from 'react'

const CustomComponent = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    console.log(inputRef.current)
  }

  const MyInput = forwardRef((props, ref) => {
    return <input ref={ref} />
  })

  return (
    <section>
      <h1>4.使用forwardRef获取自定义组件的引用</h1>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>获取DOM</button>
    </section>
  )
}
export default CustomComponent
