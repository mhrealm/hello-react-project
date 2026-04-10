import React from 'react';
import Headerbox from '@/components/headerbox/index.jsx';
// import Version1 from './version1.jsx';
// import Version2 from './version2.jsx';
import './index.less';

let list = [
  {
    title: '版本1: 上拉加载下拉刷新',
    path: '/loadAndRefresh/version1.html',
  },
];

const LoadAndRefresh = () => {
  return (
    <div>
      <Headerbox htmlList={list} showList={true}>
        上拉加载下拉刷新
      </Headerbox>
      <div className="load-and-refresh">
        {/* <Version1 /> */}
        {/* <Version2 /> */}
      </div>
    </div>
  );
};

export default LoadAndRefresh;
