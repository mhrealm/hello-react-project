import { createBrowserRouter, Navigate } from 'react-router-dom'
// 页面组件导入
import MainLayout from '../App.js' // 主布局组件
import RecordBill from '@/views/me/recordBill/index.jsx'
import BillDetail from '@/views/me/billDetail/index.jsx'
import Statistics from '@/views/me/billDetail/statistics/index.jsx' // 统计页面

import ReactQuestion from '@/views/todo/react/index.jsx'
import OptimizeQuestion from '@/views/todo/optimize/index.jsx'
import BuiltInHook from '@/views/todo/builtInHook/index.jsx'
import AdvancedFeatures from '@/views/todo/highAction/index.jsx'
import PageFeatures from '@/views/todo/pageAction/index.jsx'
import PageCanvas from '@/views/todo/canvas/index.jsx'
import Page3dAnimation from '@/views/todo/3dAnimation/index.jsx'
import Schedule from '@/views/home/schedule/index.jsx'
import VideoRelated from '@/views/todo/videoRelated/index.jsx'

// 路由配置数组
const routeConfig = [
  // 根路径重定向到首页
  {
    path: '/',
    element: <Navigate to="/home" />
  },

  // 主页面路由 - 使用主布局
  {
    path: '/home',
    element: <MainLayout />
  },
  {
    path: '/me',
    element: <MainLayout />
  },
  {
    path: '/message',
    element: <MainLayout />
  },
  {
    path: '/todo',
    element: <MainLayout />
  },

  {
    path: 'home',
    children: [
      {
        path: 'schedule',
        name: '课程表',
        element: <Schedule />
      }
    ]
  },

  // "我的"页面子路由
  {
    path: 'me',
    children: [
      {
        path: 'record-bill',
        name: '记录账单',
        element: <RecordBill />
      },
      {
        path: 'bill-detail',
        name: '账单明细',
        element: <BillDetail />
      },
      {
        path: 'statistics',
        name: '数据图表',
        element: <Statistics />
      }
    ]
  },

  // "待办"页面子路由
  {
    path: 'todo',
    children: [
      {
        path: 'optimize',
        name: '性能优化',
        element: <OptimizeQuestion />
      },
      {
        path: 'video-related',
        name: '视频相关',
        element: <VideoRelated />
      },
      {
        path: 'react',
        name: 'react相关',
        element: <ReactQuestion />
      },
      {
        path: 'built-in-hook',
        name: '内置 Hook',
        element: <BuiltInHook />
      },
      {
        path: 'advanced-features',
        name: '进阶功能',
        element: <AdvancedFeatures />
      },
      {
        path: 'page-features',
        name: '页面功能',
        element: <PageFeatures />
      },
      {
        path: 'page-canvas',
        name: '画布实现',
        element: <PageCanvas />
      },
      {
        path: '3d-animation',
        name: '炫酷3D',
        element: <Page3dAnimation />
      }
    ]
  }
]

export { routeConfig }
let router = createBrowserRouter(routeConfig)
// 创建路由实例
export default router
