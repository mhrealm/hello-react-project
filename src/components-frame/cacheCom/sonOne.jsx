import React, { useState } from 'react'

const SonOne = React.memo(() => {
  const [value, setValue] = useState('')
  const changeInput = e => {
    setValue(e.target.value)
  }
  console.log('我是组件一')
  return (
    <div>
      <h2>tab1内容</h2>
      <input type="text" value={value} onInput={changeInput} />
    </div>
  )
})

export default SonOne
