import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.less';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetch('/api/menus')
      .then(res => res.json())
      .then(res => {
        // 处理统一响应格式 { code, data, message } 或直接是数组
        const data = Array.isArray(res) ? res : res.data || [];
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error('加载菜单失败:', err);
        setMenuItems([]); // 失败时设置为空数组，防止 map 报错
      });
  }, []);

  // 切换子菜单展开/收起
  const toggleSubMenu = label => {
    setOpenSubMenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (loading) {
    return <div className="loading-spinner">加载中...</div>;
  }

  // 渲染菜单逻辑
  const renderMenuItems = items => {
    if (!Array.isArray(items)) {
      console.error('renderMenuItems: items is not an array', items);
      return null;
    }
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
