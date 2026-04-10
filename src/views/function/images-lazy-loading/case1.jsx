import React, { useState, useEffect, useRef } from 'react';
import { getImageAddress } from '@/api/resource';

const Case1 = () => {
  const [imageLists, setImageLists] = useState([]);
  const observerRef = useRef(null);

  const initPage = async () => {
    try {
      const res = await getImageAddress({
        amount: 300, // 请求图片的数量
        type: 'set=set2', //图片的类型
      });
      if (res.code === 200) {
        setImageLists(res.data);
      }
    } catch (error) {
      console.error('Error fetching image addresses:', error);
    }
  };

  const handleImageRef = imgElement => {
    if (!imgElement) return;
    observerRef.current?.observe(imgElement);
    // 图片加载完成后添加 loaded 类，隐藏 loading
    imgElement.onload = () => {
      imgElement.classList.add('loaded');
      const wrapper = imgElement.closest('.lazy-img-wrapper');
      if (wrapper) {
        wrapper.classList.add('img-loaded');
      }
    };
    // 图片加载失败的兜底处理
    imgElement.onerror = () => {};
  };

  useEffect(() => {
    initPage();
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // 当图片进入可视区域时
          if (entry.isIntersecting) {
            const img = entry.target;
            // 将 data-src 的真实地址赋值给 src
            img.src = img.dataset.url;
            // 停止观察该图片，避免重复触发
            observerRef.current.unobserve(img);
          }
        });
      },
      {
        // 配置项：图片进入距离底部200px的时候就开始加载
        rootMargin: '0px 0px -200px 0px',
      }
    );

    // 组件卸载时清理观察器
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="image-lazy-loading-case-1">
      {imageLists?.map((url, index) => (
        <div key={index} className="lazy-img-wrapper">
          {/* 添加loadding效果 */}
          <div className="loading-spinner"></div>
          <img
            ref={handleImageRef}
            className="lazy-img"
            data-url={url}
            key={index}
            alt={`robot ${index}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Case1;
