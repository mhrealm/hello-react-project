/**
封装的组件属性说明：
children：标题
back：返回区域的文字；
backIcon：是否显示返回区域的箭头；默认显示
onBack：点击返回区域后的回调
rightIcon：右侧图标，支持自定义
htmlList：跳转到html页面
*/

import React, { useState } from 'react';
import './index.less';
import {
  LeftOutline,
  SetOutline,
  AppstoreOutline,
  CloseOutline,
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router';

const Headerbox = ({
  children,
  back,
  backIcon,
  onBack,
  rightIcon,
  htmlList,
}) => {
  const navigate = useNavigate();
  const [isSpreadList, setIsSpreadList] = useState(true);
  const toBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="header-content">
      <div className="nav-bar">
        <div className="left" onClick={toBack}>
          <div className="back-icon header-icon">
            {backIcon ? backIcon : <LeftOutline fontSize={20} />}
          </div>
          <div className="back">{back ? back : '返回'}</div>
        </div>
        <div className="title">{children ? children : '标题'}</div>
        <div className="right">
          <span className="set-outline-icon header-icon">
            {rightIcon ? rightIcon : <SetOutline fontSize={20} />}
          </span>
          {Array.isArray(htmlList) && (
            <ul>
              <li className="header-icon">
                {!isSpreadList && (
                  <AppstoreOutline
                    fontSize={20}
                    onClick={() => setIsSpreadList(true)}
                  />
                )}
              </li>
              <li className="header-icon">
                {isSpreadList && (
                  <CloseOutline
                    fontSize={20}
                    onClick={() => setIsSpreadList(false)}
                  />
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
      {Array.isArray(htmlList) && (
        <ul
          className={`html-list ${isSpreadList ? 'unfold-list' : 'hide-list'}`}
        >
          {htmlList?.map(item => {
            return (
              <li
                key={item.path}
                onClick={() => {
                  window.location.href = item?.path;
                }}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { Headerbox };

export default Headerbox;
