import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.less';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // 用于记录哪些含有子菜单的项是展开状态
  const [openSubMenus, setOpenSubMenus] = useState({});
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '首页' },
    {
      path: '/animation',
      label: '动画',
      children: [
        {
          path: '/animation/mix-blend-mode',
          label: '混合模式',
        },
      ],
    },
    { path: '/frame', label: '框架' },
    { path: '/function', label: '功能' },
    { path: '/todo', label: '待办事项' },
  ];

  // 切换子菜单展开/收起
  const toggleSubMenu = label => {
    setOpenSubMenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // 渲染菜单逻辑
  const renderMenuItems = items => {
    return items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = location.pathname === item.path;
      const isOpen = openSubMenus[item.label];

      if (hasChildren) {
        return (
          <li key={item.label} className="menuItemWrapper">
            <div
              className={`menuItem subMenuTitle ${isOpen ? 'open' : ''}`}
              onClick={() => toggleSubMenu(item.label)}
            >
              <span>{item.label}</span>
              <span
                className={`arrow ${isOpen ? 'arrow-down' : 'arrow-right'}`}
              >
                ▶
              </span>
            </div>
            {isOpen && (
              <ul className="subMenu">{renderMenuItems(item.children)}</ul>
            )}
          </li>
        );
      }

      return (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`menuItem ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="headerLeft">
          <button
            className="menuToggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </div>
      </header>
      <div className="main">
        <aside
          className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        >
          <nav className="nav">
            <ul className="menu">{renderMenuItems(menuItems)}</ul>
          </nav>
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
