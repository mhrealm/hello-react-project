import { createBrowserRouter, Navigate } from 'react-router-dom'
// 页面组件导入
import MainLayout from '../App.js' // 主布局组件
import PageCanvas from '@/components-style/canvas/index.jsx'
import Page3dAnimation from '@/components-style/3dAnimation/index.jsx'

// 自定义Hook组件导入
import UseState from '@/components-frame/useState/index.jsx'
import UseCallback from '@/components-frame/useCallback/index.jsx'
import UseContext from '@/components-frame/useContext/index.jsx'
import UseEffect from '@/components-frame/useEffect/index.jsx'
import UseLayoutEffect from '@/components-frame/useLayoutEffect/index.jsx'
import UseMemo from '@/components-frame/useMemo/index.jsx'
import UseReducer from '@/components-frame/useReducer/index.jsx'
import UseRef from '@/components-frame/useRef/index.jsx'
import UseImperativeHandle from '@/components-frame/useImperativeHandle/index.jsx'
import UseTransition from '@/components-frame/useTransition/index.jsx'
import ReduxPages from '@/components-frame/reduxCase/index.jsx'
import MobxPages from '@/components-frame/mobxCase/index.jsx'
import SaveValue from '@/components-frame/saveValue/index.jsx'
import CustomHooks from '@/components-frame/customHooks/index.jsx'
import Hoc from '@/components-frame/hoc/index.jsx'
import CacheCom from '@/components-frame/cacheCom/index.jsx'
import DevServer from '@/components-frame/devServer/index.jsx'

import Slide from '@/components-style/slide/index.jsx'
import RealizeStyle from '@/components-style/realizeStyle/index.jsx'
import Refresh from '@/components-style/refresh/index.jsx'

// 路由配置数组
const routeConfig = [
  // 根路径重定向到首页
  {
    path: '/',
    element: <Navigate to="/home" />
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
  // "框架"页面子路由
  {
    path: 'frame',
    children: [
      {
        path: 'useState',
        name: 'useState',
        element: <UseState />
      },
      {
        path: 'useCallback',
        name: 'useCallback',
        element: <UseCallback />
      },
      {
        path: 'useContext',
        name: 'useContext',
        element: <UseContext />
      },
      {
        path: 'useEffect',
        name: 'useEffect',
        element: <UseEffect />
      },
      {
        path: 'useLayoutEffect',
        name: 'useLayoutEffect',
        element: <UseLayoutEffect />
      },
      {
        path: 'useMemo',
        name: 'useMemo',
        element: <UseMemo />
      },
      {
        path: 'useReducer',
        name: 'useReducer',
        element: <UseReducer />
      },
      {
        path: 'useRef',
        name: 'useRef',
        element: <UseRef />
      },
      {
        path: 'useImperativeHandle',
        name: 'useImperativeHandle',
        element: <UseImperativeHandle />
      },
      {
        path: 'useTransition',
        name: 'useTransition',
        element: <UseTransition />
      },
      {
        path: 'saveValue',
        name: '展示更新前后的值',
        element: <SaveValue />
      },
      {
        path: 'customHooks',
        name: '自定义Hook',
        element: <CustomHooks />
      },
      {
        path: 'hoc',
        name: '高阶组件',
        element: <Hoc />
      },
      {
        path: 'cacheCom',
        name: '缓存组件',
        element: <CacheCom />
      },
      {
        path: 'devServer',
        name: '配置代理服务器',
        element: <DevServer />
      },
      {
        path: 'reduxPages',
        name: 'redux初体验',
        element: <ReduxPages />
      },
      {
        path: 'mobxPages',
        name: 'mobx初体验',
        element: <MobxPages />
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
        element: <PageCanvas />
      },
      {
        path: '3d-animation',
        name: '炫酷3D',
        element: <Page3dAnimation />
      },
      {
        path: 'slide',
        name: '滑动切换',
        element: <Slide />
      },
      {
        path: 'realizeStyle',
        name: '常见的样式实现',
        element: <RealizeStyle />
      },
      {
        path: 'refresh',
        name: '刷新',
        element: <Refresh />
      }
    ]
  }
]

export { routeConfig }
let router = createBrowserRouter(routeConfig)
// 创建路由实例
export default router
