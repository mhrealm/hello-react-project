import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense, createElement } from 'react';
// 页面组件导入
import MainLayout from '../App.js'; // 主布局组件

// 可复用的懒加载组件包装函数
const lazyLoadComponent = importFunc => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {createElement(lazy(importFunc))}
    </Suspense>
  );
};

// 路由配置数组
const routeConfig = [
  // 根路径重定向到首页
  {
    path: '/',
    element: <Navigate to="/frame" />,
  },
  // 主页面路由 - 使用主布局
  {
    path: '/frame',
    element: <MainLayout />,
  },
  {
    path: '/style',
    element: <MainLayout />,
  },
  {
    path: '/function',
    element: <MainLayout />,
  },
  {
    path: '/todo',
    element: <MainLayout />,
  },
  {
    path: 'function',
    children: [
      {
        path: 'question-answer-session',
        name: '复刻网易云营销活动',
        grade: '1', // 难度等级
        element: lazyLoadComponent(
          () => import('@/components-function/questionAnswerSession/index.jsx')
        ),
      },
      {
        path: 'images-lazy-loading',
        name: '图片懒加载',
        grade: '1', // 难度等级
        element: lazyLoadComponent(
          () => import('@/components/imagesLazyLoading/index.jsx')
        ),
      },
      {
        path: 'load-with-refresh',
        name: '上拉加载下拉刷新',
        grade: '2', // 难度等级
        element: lazyLoadComponent(
          () => import('@/components/loadWithRefresh/index.jsx')
        ),
      },
    ],
  },
  // "框架"页面子路由
  {
    path: 'frame',
    children: [
      {
        path: 'useState',
        name: 'useState',
        grade: '1', // 难度等级
        element: lazyLoadComponent(
          () => import('@/components-frame/useState/index.jsx')
        ),
      },
      {
        path: 'useCallback',
        name: 'useCallback',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useCallback/index.jsx')
        ),
      },
      {
        path: 'useContext',
        name: 'useContext',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useContext/index.jsx')
        ),
      },
      {
        path: 'useEffect',
        name: 'useEffect',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useEffect/index.jsx')
        ),
      },
      {
        path: 'useLayoutEffect',
        name: 'useLayoutEffect',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useLayoutEffect/index.jsx')
        ),
      },
      {
        path: 'useMemo',
        name: 'useMemo',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useMemo/index.jsx')
        ),
      },
      {
        path: 'useReducer',
        name: 'useReducer',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useReducer/index.jsx')
        ),
      },
      {
        path: 'useRef',
        name: 'useRef',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useRef/index.jsx')
        ),
      },
      {
        path: 'useImperativeHandle',
        name: 'useImperativeHandle',
        grade: '2',
        element: lazyLoadComponent(
          () => import('@/components-frame/useImperativeHandle/index.jsx')
        ),
      },
      {
        path: 'useTransition',
        name: 'useTransition',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/useTransition/index.jsx')
        ),
      },
      {
        path: 'saveValue',
        name: '展示更新前后的值',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/saveValue/index.jsx')
        ),
      },
      {
        path: 'customHooks',
        name: '自定义Hook',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/customHooks/index.jsx')
        ),
      },
      {
        path: 'hoc',
        name: '高阶组件',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/hoc/index.jsx')
        ),
      },
      {
        path: 'cacheCom',
        name: '缓存组件',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/cacheCom/index.jsx')
        ),
      },
      {
        path: 'devServer',
        name: '配置代理服务器',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/devServer/index.jsx')
        ),
      },
      {
        path: 'reduxCase',
        name: 'redux初体验',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/reduxCase/index.jsx')
        ),
      },
      {
        path: 'mobxCase',
        name: 'mobx初体验',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components-frame/mobxCase/index.jsx')
        ),
      },
    ],
  },
  // "样式"页面子路由
  {
    path: 'style',
    children: [
      {
        path: 'mix-blend-mode',
        name: '混合模式',
        grade: '2',
        element: lazyLoadComponent(
          () => import('@/components/mixBlendMode/index.jsx')
        ),
      },
      {
        path: 'layouts',
        name: '布局',
        grade: '1',
        element: lazyLoadComponent(() => import('@/components/layouts.jsx')),
      },
      {
        path: 'background-shake',
        name: '背景抖动',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components/backgroundShake/index.jsx')
        ),
      },
      {
        path: 'canvas',
        name: 'canvas',
        grade: '1',
        element: lazyLoadComponent(() => import('@/components/canvas.jsx')),
      },
      {
        path: 'animation',
        name: '动画',
        grade: '1',
        element: lazyLoadComponent(() => import('@/components/animation.jsx')),
      },
      {
        path: 'slide',
        name: '滑动删除列表',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components/slide/index.jsx')
        ),
      },
      {
        path: 'refresh',
        name: '刷新',
        grade: '1',
        element: lazyLoadComponent(
          () => import('@/components/refresh/index.jsx')
        ),
      },
    ],
  },
];

export { routeConfig };
let router = createBrowserRouter(routeConfig);
// 创建路由实例
export default router;
