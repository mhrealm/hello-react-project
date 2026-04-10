import React, { useEffect, useState, useLayoutEffect } from 'react'
import './index.less'
const Index = () => {
  return (
    <div className="container">
      <BasicUse />
      <ElementPosition />
    </div>
  )
}

const BasicUse = () => {
  const [num, setNum] = useState(1)

  useLayoutEffect(() => {
    // console.log('设置函数', num)
    return () => {
      // console.log('清理函数', num)
    }
  }, [num])

  const onChange = () => {
    setNum(a => a + 1)
  }

  return (
    <div className="box">
      <p>1.useLayoutEffect中设置函数和清理函数的区别</p>
      <button onClick={onChange}>点击加1</button>
    </div>
  )
}

const ElementPosition = () => {
  const [isBig, setIsBig] = useState(false)
  const handleClick = () => {
    setIsBig(false)
  }

  // 人为减缓渲染速度
  let now = performance.now()
  while (performance.now() - now < 400) { }

  // useLayoutEffect(() => {
  // 	console.log('useLayoutEffect', isBig)
  // 	setIsBig(true)
  // }, [isBig])

  useEffect(() => {
    console.log('useEffect', isBig)
    setIsBig(true)
  }, [isBig])

  return (
    <div className="box">
      <p>2.useLayoutEffect和useEffect用法对比</p>
      <div className={isBig ? 'big' : 'small'} />
      <button onClick={handleClick}>变小</button>
    </div>
  )
}

export default Index
