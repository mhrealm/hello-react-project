import React, { useState, useRef, useEffect, forwardRef } from 'react'
const Index = () => {
  return (
    <div className="container">
      <VariateComparison />
      <UpdateRef />
      <FocusingInput />
      <CustomComponent />
    </div>
  )
}

const VariateComparison = () => {
  let [num, setNum] = useState(1)
  let ref = useRef(null)
  let variate = null

  const handleChange = () => {
    setNum(a => a + 1)
  }

  useEffect(() => {
    ref.current = num
    // 对于variate的赋值会在每次渲染前丢失
    // variate = num
  }, [num])

  if (num !== 1) {
    console.log('ref.current', ref.current) // 获取的是每次num更新前的值
    console.log('variate', variate) // 获取的始终是全局状态null
  }

  return (
    <div className="box">
      <p>1.useRef存储的变量和常规变量的区别</p>
      <button onClick={handleChange}>更新数字：{num}</button>
    </div>
  )
}

const UpdateRef = () => {
  const num = useRef(1)
  const handleChange = () => {
    num.current = 2
  }

  return (
    <div className="box">
      <p>2.更改useRef不会触发重新渲染</p>
      <button onClick={handleChange}>更新数字：{num.current}</button>
    </div>
  )
}

const FocusingInput = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.focus()
  }
  return (
    <div className="box">
      <p>3.使用useRef操作DOM,聚焦文本输入</p>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  )
}

const CustomComponent = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    console.log(inputRef.current)
  }

  const MyInput = forwardRef((props, ref) => {
    return <input ref={ref} />
  })

  return (
    <div className="box">
      <p>4.使用forwardRef获取自定义组件的引用</p>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>获取DOM</button>
    </div>
  )
}

export default Index
