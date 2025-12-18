import React from 'react'
import { TabBar } from 'antd-mobile'
import styles from './index.less'
import Style from '@/views/style.jsx'
import Function from '@/views/function.jsx'
import Frame from '@/views/frame.jsx'
import Todo from '@/views/todo.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
const tabs = [
  {
    key: '/frame',
    title: '框架',
    icon: <AppOutline />,
    components: <Frame />
  },
  {
    key: '/todo',
    title: '待办',
    components: <Todo />,
    icon: <UnorderedListOutline />
  },
  {
    key: '/function',
    title: '功能',
    components: <Function />,
    icon: <MessageOutline />
  },
  {
    key: '/style',
    title: '样式',
    components: <Style />,
    icon: <UserOutline />
  }
]

const Nav = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const setRouteActive = value => {
    navigate(value)
    // 设置文档标题
    let title = tabs.find(i => i.key === value).title
    document.title = title
  }
  return (
    <div className={styles.app}>
      <div className={styles.body}>{tabs.find(item => item.key === pathname).components}</div>
      <div className={styles.bottom}>
        <TabBar activeKey={pathname} onChange={setRouteActive}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Nav
