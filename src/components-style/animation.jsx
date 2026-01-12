import React from 'react';
import Headerbox from '@/components/headerbox/index.jsx';

let list = [
  {
    title: 'canvas绘制基础图形详解',
    path: '/3dAnimation/photoAlbum.html',
  },
];

const Index = () => {
  return <Headerbox htmlList={list}>canvas</Headerbox>;
};

export default Index;
