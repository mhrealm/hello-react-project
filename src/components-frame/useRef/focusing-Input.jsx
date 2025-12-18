import React, { useRef } from 'react'

const FocusingInput = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.focus()
  }
  return (
    <section>
      <h1>3.使用useRef操作DOM,聚焦文本输入</h1>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </section>
  )
}
export default FocusingInput
