import React, { useState, useRef, useEffect, useCallback } from 'react';

const PAGE_SIZE = 10;
const MAX_TOTAL = 100;

const fetchListApi = pageIndex => {
  let leng = PAGE_SIZE * pageIndex;
  let currentTotal = (pageIndex - 1) * PAGE_SIZE;
  let res = Array.from({ length: PAGE_SIZE }, (v, index) => ({
    url: `https://robohash.org/${currentTotal + index}.png?set=set4&size=200x200`,
    title: `机器猫 ${currentTotal + index + 1}`,
    desc: `描述 ${currentTotal + index + 1}`,
  }));
  return Promise.resolve(res);
};

const Version2 = () => {
  const [robotList, setRobotList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const onLoadMore = useCallback(async () => {
    const data = await fetchListApi(1);
    console.log(9999);
    if (data.length > 0) {
      setRobotList(prev => [...prev, ...data]);
    }

    if (robotList.length > MAX_TOTAL) {
      setHasMore(false);
    }
  }, [robotList.length]);

  useEffect(() => {
    console.log(8888);
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        onLoadMore();
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

  useEffect(() => {
    onLoadMore(); // 显式调用一次，获取首屏数据
  }, []); // 仅在挂载时执行一次

  return (
    <div className="version">
      <ul ref={containerRef}>
        {robotList.map(item => {
          return (
            <li key={item.title}>
              <img src={item.url} alt="robot" />
              <div className="text">
                <p className="title">{item.title}</p>
                <p className="desc">{item.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Version2;
