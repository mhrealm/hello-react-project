import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.less';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '首页' },
    { path: '/animation', label: '动画' },
    { path: '/frame', label: '框架' },
    { path: '/function', label: '功能' },
    { path: '/todo', label: '待办事项' },
  ];

  return (
    <div className="layout">
      {/* 顶部菜单栏 */}
      <header className="header">
        <div className="headerLeft">
          <button
            className="menuToggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1 className="headerTitle">React 项目</h1>
        </div>
        <div className="headerRight">
          <button className="headerButton">设置</button>
          <button className="headerButton">用户</button>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="main">
        {/* 左边菜单栏 */}
        <aside
          className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        >
          <nav className="nav">
            <ul className="menu">
              {menuItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`menuItem ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 内容区域 */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
