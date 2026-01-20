import React from 'react';
import Headerbox from '@/components/headerbox/index.jsx';

let list = [
  {
    title: '如何展示省略号',
    path: '/layouts/displayEllpsis.html',
  },
];

const Index = () => {
  return <Headerbox htmlList={list}>布局</Headerbox>;
};

export default Index;
