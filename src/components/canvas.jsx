import React from 'react';
import Headerbox from '@/components/headerbox/index.jsx';

let list = [
  {
    title: 'canvas绘制基础图形详解',
    path: '/canvas/canvasTutorial.html',
  },
  {
    title: 'canvas基础版本电子签名',
    path: '/canvas/signature.html',
  },
  {
    title: 'canvas中变形的应用',
    path: '/canvas/transformations.html',
  },
  {
    title: 'canvas实现简单动画',
    path: '/canvas/simpleAnimation.html',
  },
  {
    title: 'canvas序列帧渲染',
    path: '/canvas/equenceFrame.html',
  },
];

const Index = () => {
  return <Headerbox htmlList={list}>canvas</Headerbox>;
};

export default Index;
