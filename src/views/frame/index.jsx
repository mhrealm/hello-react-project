import React from 'react'
import styles from './index.less'
import router from '@/router/router.js'
import { useNavigate } from 'react-router-dom'
const Frame = () => {
  let list = router.routes.find(i => i.path == 'frame' && i.children?.length > 0)?.children
  const navigate = useNavigate()
  const toLink = item => {
    navigate(item.path, { state: { title: item.name } })
    document.title = item.name
  }
  return (
    <div className={styles.frameContainer}>
      {list?.map(item => (
        <div
          className={styles.frameItem}
          key={item.path}
          onClick={() => {
            toLink(item)
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Frame
