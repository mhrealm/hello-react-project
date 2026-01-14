import React from 'react';
import Headerbox from '@/components/headerbox/index.jsx';

let list = [
  {
    title: '立体相册',
    path: '/animation/photoAlbum.html',
  },
];

const Index = () => {
  return <Headerbox htmlList={list}>canvas</Headerbox>;
};

export default Index;
