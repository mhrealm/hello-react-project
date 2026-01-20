import React, { useState, useRef, useEffect } from 'react'

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
    <section>
      <h1>1.useRef存储的变量和常规变量的区别</h1>
      <button onClick={handleChange}>更新数字：{num}</button>
    </section>
  )
}

export default VariateComparison
