import React, { useState } from 'react'

const KeyResetComponent = () => {
  function Input() {
    const [value, setValue] = useState('zhaungshan')
    return <input onChange={e => setValue(e.target.value)} value={value} />
  }
  const [key, setKey] = useState(0)
  const handleReset = () => {
    setKey(key + 1)
  }
  return (
    <div className="min-module">
      <h1>4、通过键值重置组件状态</h1>
      <button onClick={handleReset}>Reset</button>
      <Input key={key} />
    </div>
  )
}

export default KeyResetComponent
