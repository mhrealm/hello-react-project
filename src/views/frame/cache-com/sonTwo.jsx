import React, { useState } from 'react'

const SonTwo = () => {
  const [value, setValue] = useState('')

  const changeInput = e => {
    setValue(e.target.value)
  }
  console.log('我是组件二')
  return (
    <div>
      <h2>tab2内容</h2>
      <input type="text" value={value} onInput={changeInput} />
    </div>
  )
}

export default SonTwo
