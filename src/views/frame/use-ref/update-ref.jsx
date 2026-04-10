import React, { useRef } from 'react'

const UpdateRef = () => {
  const num = useRef(1)
  const handleChange = () => {
    num.current = 2
  }

  return (
    <section>
      <h1>2.更改useRef不会触发重新渲染</h1>
      <button onClick={handleChange}>更新数字：{num.current}</button>
    </section>
  )
}

export default UpdateRef
