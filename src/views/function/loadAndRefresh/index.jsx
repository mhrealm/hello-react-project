import React from 'react';
import Version1 from './version1.jsx';
import Version2 from './version2.jsx';
import './index.less';

const LoadAndRefresh = () => {
  return (
    <div className="load-and-refresh">
      {/* <Version1 /> */}
      <Version2 />
    </div>
  );
};

export default LoadAndRefresh;
