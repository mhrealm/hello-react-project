import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense, createElement } from 'react'
// 页面组件导入
import MainLayout from '../App.js' // 主布局组件

// 路由配置数组
const routeConfig = [
  // 根路径重定向到首页
  {
    path: '/',
    element: <Navigate to="/frame" />
  },
  // 主页面路由 - 使用主布局
  {
    path: '/frame',
    element: <MainLayout />
  },
  {
    path: '/style',
    element: <MainLayout />
  },
  {
    path: '/function',
    element: <MainLayout />
  },
  {
    path: '/todo',
    element: <MainLayout />
  },
  {
    path: 'function',
    children: [
      {
        path: 'imagesLazyLoading',
        name: 'imagesLazyLoading',
        grade: '1', // 难度等级
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-function/imagesLazyLoading/index.jsx')))}
          </Suspense>
        )
      }
    ]
  },
  // "框架"页面子路由
  {
    path: 'frame',
    children: [
      {
        path: 'useState',
        name: 'useState',
        grade: '1', // 难度等级
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useState/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useCallback',
        name: 'useCallback',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useCallback/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useContext',
        name: 'useContext',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useContext/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useEffect',
        name: 'useEffect',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useEffect/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useLayoutEffect',
        name: 'useLayoutEffect',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useLayoutEffect/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useMemo',
        name: 'useMemo',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useMemo/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useReducer',
        name: 'useReducer',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useReducer/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useRef',
        name: 'useRef',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useRef/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useImperativeHandle',
        name: 'useImperativeHandle',
        grade: '2',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useImperativeHandle/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'useTransition',
        name: 'useTransition',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/useTransition/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'saveValue',
        name: '展示更新前后的值',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/saveValue/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'customHooks',
        name: '自定义Hook',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/customHooks/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'hoc',
        name: '高阶组件',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/hoc/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'cacheCom',
        name: '缓存组件',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/cacheCom/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'devServer',
        name: '配置代理服务器',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/devServer/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'reduxCase',
        name: 'redux初体验',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/reduxCase/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'mobxCase',
        name: 'mobx初体验',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-frame/mobxCase/index.jsx')))}
          </Suspense>
        )
      }
    ]
  },
  // "样式"页面子路由
  {
    path: 'style',
    children: [
      {
        path: 'page-canvas',
        name: '画布实现',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-style/canvas/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: '3d-animation',
        name: '炫酷3D',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-style/3dAnimation/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'slide',
        name: '滑动切换',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-style/slide/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'realizeStyle',
        name: '常见的样式实现',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-style/realizeStyle/index.jsx')))}
          </Suspense>
        )
      },
      {
        path: 'refresh',
        name: '刷新',
        grade: '1',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {createElement(lazy(() => import('@/components-style/refresh/index.jsx')))}
          </Suspense>
        )
      }
    ]
  }
]

export { routeConfig }
let router = createBrowserRouter(routeConfig)
// 创建路由实例
export default router
