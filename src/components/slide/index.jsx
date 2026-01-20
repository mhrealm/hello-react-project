import React, { useState, useRef } from 'react';
import './index.less';

const Index = () => {
  // 模拟聊天列表数据
  const [listData, setListData] = useState([
    { id: 1, name: '张三', message: '你好，最近怎么样？', time: '09:30' },
    { id: 2, name: '李四', message: '项目进展顺利吗？', time: '10:15' },
    { id: 3, name: '王五', message: '周末一起吃饭吗？', time: '11:00' },
    { id: 4, name: '赵六', message: '好的，我会尽快处理。', time: '12:30' },
    { id: 5, name: '钱七', message: '谢谢，辛苦了！', time: '14:20' },
  ]);

  // 存储每个列表项的滑动状态
  const [swipeState, setSwipeState] = useState({});
  // 存储触摸开始的X坐标
  const startXRef = useRef(0);
  // 存储当前正在滑动的元素ID
  const currentSwipeIdRef = useRef(null);

  // 处理触摸开始事件
  const handleTouchStart = (e, id) => {
    startXRef.current = e.touches[0].clientX;
    currentSwipeIdRef.current = id;
  };

  // 处理触摸移动事件
  const handleTouchMove = (e, id) => {
    if (id !== currentSwipeIdRef.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startXRef.current;

    // 计算新的滑动位置
    const currentPosition = swipeState[id] || 0;
    let newPosition = currentPosition + diffX;

    // 限制滑动范围
    newPosition = Math.max(-60, Math.min(newPosition, 0));

    // 更新滑动状态
    setSwipeState(prev => ({
      ...prev,
      [id]: newPosition,
    }));

    // 更新起始位置，以便后续的移动事件能够正确计算
    startXRef.current = currentX;
  };

  // 处理触摸结束事件
  const handleTouchEnd = (e, id) => {
    if (id !== currentSwipeIdRef.current) return;

    const currentPosition = swipeState[id] || 0;

    // 根据当前位置判断是否显示删除按钮
    if (currentPosition < -30) {
      // 位置超过-30px，显示删除按钮
      setSwipeState(prev => ({
        ...prev,
        [id]: -60,
      }));
    } else {
      // 位置不足-30px，隐藏删除按钮
      setSwipeState(prev => ({
        ...prev,
        [id]: 0,
      }));
    }

    currentSwipeIdRef.current = null;
  };

  // 处理删除操作
  const handleDelete = id => {
    setListData(prev => prev.filter(item => item.id !== id));
    // 删除后重置滑动状态
    setSwipeState(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  // 点击列表项时，重置所有滑动状态
  const handleItemClick = () => {
    setSwipeState({});
  };

  return (
    <div className="slide">
      <div className="listDelete">
        {listData.map(item => (
          <div key={item.id} className="list-item" onClick={handleItemClick}>
            <div
              className="content-wrapper"
              style={{
                transform: `translateX(${swipeState[item.id] || 0}px)`,
              }}
              onTouchStart={e => handleTouchStart(e, item.id)}
              onTouchMove={e => handleTouchMove(e, item.id)}
              onTouchEnd={e => handleTouchEnd(e, item.id)}
            >
              <div className="content">
                <div className="message-info">
                  <h3 className="name">{item.name}</h3>
                  <span className="time">{item.time}</span>
                </div>
                <p className="message">{item.message}</p>
              </div>
            </div>
            <button
              className="delete-btn"
              onClick={e => {
                e.stopPropagation(); // 阻止事件冒泡，避免触发列表项点击
                handleDelete(item.id);
              }}
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
