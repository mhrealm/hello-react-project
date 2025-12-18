import React, { useEffect, useRef, useState } from 'react'
import './index.less'
const Index = () => {
  return (
    <div className="container">
      <Simulation />
      <ConnectionExternal />
      <BeforeStateUpdate />
      <NeedlessObjectRely />
    </div>
  )
}

const Simulation = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 相当于 componentDidMount 中的代码
    // console.log('组件挂载后执行')
  }, [])

  useEffect(() => {
    // 相当于 componentDidUpdate 中的代码，当 count 变化时执行
    // console.log(`count 更新为: ${count}`)
  }, [count])

  useEffect(() => {
    // 组件挂载或更新时执行的代码
    const timer = setInterval(() => {
      // console.log('每秒执行一次')
    }, 1000)

    // 返回一个清理函数，组件卸载前执行
    return () => {
      clearInterval(timer)
      // console.log('组件卸载，清除定时器')
    }
  }, [])

  return (
    <div className="box">
      <p>1.useEffect分别模拟了类组件中的哪些生命周期? </p>
      <button onChange={() => setCount(a => a + 1)}>计数器:{count}</button>
    </div>
  )
}

const ConnectionExternal = () => {
  const ModalDialog = ({ isOpen, children }) => {
    const ref = useRef()
    useEffect(() => {
      const dialog = ref.current
      if (!isOpen) {
        return
      }
      dialog.showModal()
      return () => {
        dialog.close()
      }
    }, [isOpen])
    return <dialog ref={ref}>{children}</dialog>
  }

  const [show, setShow] = useState(false)

  const openDialog = () => {
    setShow(true)
  }

  const onClose = () => {
    setShow(false)
  }

  return (
    <div className="box">
      <p>2.连接外部系统，控制模态对话框</p>
      <button onClick={openDialog}>open dialog</button>
      <ModalDialog isOpen={show}>
        Hello!
        <br />
        <button onClick={onClose}>Close</button>
      </ModalDialog>
    </div>
  )
}

const BeforeStateUpdate = () => {
  const [count, setCount] = useState(0)
  // 第一种使用count作为副作用的依赖值
  // useEffect(() => {
  // 	const intervalId = setInterval(() => {
  // 		setCount(count + 1)
  // 	}, 1000)
  // 	return () => {
  // 		console.log('intervalId', intervalId)
  // 		clearInterval(intervalId)
  // 	}
  // }, [count])

  // 第二种不使用count作为副作用的依赖值
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(a => a + 1)
    }, 1000)
    return () => {
      // console.log('intervalId', intervalId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="box">
      <p>3.根据副作用的先前状态更新状态 </p>
      <div>状态：{count}</div>
    </div>
  )
}

const NeedlessObjectRely = () => {
  const [person, setPerson] = useState({
    name: 'zangsan',
    sex: 'man'
  })

  useEffect(() => {
    // 🙅错误示范： Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    // setPerson({
    // 	...person,
    // 	name: 'lisi'
    // })
  }, [person])

  // 🙆正确做法
  useEffect(() => {
    setPerson(p => {
      return {
        ...p,
        name: 'lisi'
      }
    })
  }, [])
  return (
    <div className="box">
      <p>4.避免将对象或者函数作为useEffect的依赖项。 </p>
      <div>姓名：{person.name}</div>
    </div>
  )
}

export default Index
