import React, { useCallback, useState, memo } from 'react'
import './index.less'

const Submit = memo(({ handleSubmit }) => {
  console.log('当输入框变化时才渲染页面')
  const submitRequest = () => {
    handleSubmit()
  }
  return <button onClick={submitRequest}>提交</button>
})

const Index = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isDark, setIsDark] = useState(false)

  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handleName = e => {
    setName(e.target.value)
  }

  const changeDark = e => {
    setIsDark(e.target.checked)
  }

  // 使用 useCallback
  const handleSubmit = useCallback(() => {
    console.log(`拿到name${name},email${email}进行数据请求`)
  }, [name, email])

  // 不使用 useCallback
  // const handleSubmit = () => {
  //   console.log(`拿到name${name},email${email}进行数据请求`)
  // }

  return (
    <div className="container">
      <div className="box" style={{ background: isDark ? '#999' : '#eaeaea' }}>
        <p>1.跳过组件的重新渲染？</p>
        <label>
          <input type="checkbox" checked={isDark} onChange={changeDark} />
          Dark mode
        </label>
        <br />
        <div>
          <label>姓名：</label>
          <input type="text" id="name" value={name} onChange={handleName} />
          <br />
          <label>邮箱：</label>
          <input type="email" id="email" value={email} onChange={handleEmail} />
          <br />
          <Submit handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Index
