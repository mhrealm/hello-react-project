import React, { useState, useEffect, useRef, useCallback } from 'react';

const PAGE_SIZE = 10;
const MAX_TOTAL = 100;

// 模拟 API
const fetchListApi = async page => {
  await new Promise(r => setTimeout(r, 800));
  const currentTotal = (page - 1) * PAGE_SIZE;
  const remain = MAX_TOTAL - currentTotal;
  const len = remain > PAGE_SIZE ? PAGE_SIZE : remain;
  if (len <= 0) return [];
  return Array.from({ length: len }, (_, i) => ({
    url: `https://robohash.org/${currentTotal + i}.png?set=set4&size=200x200`,
    title: `机器猫 ${currentTotal + i + 1}`,
    desc: `描述 ${currentTotal + i + 1}`,
  }));
};

const LoadWithRefresh = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0); // 拉伸距离

  const containerRef = useRef(null);
  const startY = useRef(0);

  // 【关键点 1】：使用 Ref 保存最新状态，避免 useEffect 频繁卸载绑定
  const stateRef = useRef({ loading, hasMore, page, refreshing });
  useEffect(() => {
    stateRef.current = { loading, hasMore, page, refreshing };
  }, [loading, hasMore, page, refreshing]);

  const onRefresh = useCallback(async () => {
    if (stateRef.current.refreshing) return;
    setRefreshing(true);
    const data = await fetchListApi(1);
    console.log(99999, data);
    setList(data);
    setPage(1);
    setHasMore(MAX_TOTAL > PAGE_SIZE);
    setRefreshing(false);
    setPullDistance(0);
  }, []);

  const onLoadMore = useCallback(async () => {
    // 从 ref 中读取最新的状态
    const { loading, hasMore, page, refreshing } = stateRef.current;
    if (loading || refreshing || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;
    const data = await fetchListApi(nextPage);

    if (data.length > 0) {
      setList(prev => [...prev, ...data]);
      setPage(nextPage);
      if (list.length + data.length >= MAX_TOTAL) setHasMore(false);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [list.length]);

  // 【关键点 2】：只在挂载时绑定一次滚动事件
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      // 距离底部 100px 触发，增加灵敏度
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        onLoadMore();
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]); // 这里的 onLoadMore 引用相对稳定

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  // 下拉逻辑保持不变...
  const handleTouchStart = e => {
    if (containerRef.current.scrollTop === 0)
      startY.current = e.touches[0].pageY;
  };
  const handleTouchMove = e => {
    if (containerRef.current.scrollTop > 0) return;
    const diff = e.touches[0].pageY - startY.current;
    if (diff > 0) {
      setPullDistance(Math.pow(diff, 0.8));
    }
  };
  const handleTouchEnd = () => {
    if (pullDistance > 60) onRefresh();
    else setPullDistance(0);
  };

  return (
    <section
      className="version version1"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="pull-refresh"
        style={{
          height: pullDistance,
          opacity: pullDistance > 0 ? 1 : 0,
        }}
      >
        {refreshing ? '正在刷新...' : '下拉刷新'}
      </div>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <img src={item.url} alt="" />
            <div>
              <p className="title">{item.title}</p>
              <p className="desc">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
        {loading ? '加载中...' : hasMore ? '上拉加载' : '没有更多了'}
      </div>
    </section>
  );
};

export default LoadWithRefresh;
