import React, { useState, createContext, useContext } from 'react'
import './index.less'
const Index = () => {
  return (
    <div className="container">
      <UpdateState />
    </div>
  )
}

const UpdateState = () => {
  const Panel = ({ children }) => {
    return <section className="panel">{children}</section>
  }

  const Button = ({ children }) => {
    const theme = useContext(ThemeContext)
    return (
      <button className="button" style={{ background: theme }}>
        {children}
      </button>
    )
  }

  const UpdateForm = () => {
    return (
      <Panel>
        <Button>Sign up</Button>
        <Button>Log in</Button>
      </Panel>
    )
  }

  const [theme, setTheme] = useState('#eaeaea')
  const ThemeContext = createContext(null)

  const handleCheckChange = e => {
    e.target.checked ? setTheme('gray') : setTheme('#eaeaea')
  }
  return (
    <div className="box" style={{ background: theme }}>
      <p>1.切换主题更新子组件的主题</p>
      <ThemeContext.Provider value={theme}>
        <UpdateForm />
        <label>
          <input type="checkbox" checked={theme === 'gray'} onChange={handleCheckChange} />
          <span> Use dark mode</span>
        </label>
      </ThemeContext.Provider>
    </div>
  )
}

export default Index
