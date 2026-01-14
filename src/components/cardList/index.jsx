import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Toast } from 'antd-mobile';

const Assemble = ({ list }) => {
  let [listing, setListing] = useState(list);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('questionTitle');
    };
  }, []);

  const showResolve = (item, index) => {
    if (item.result || item.com) {
      setListing(a =>
        a.map(i => {
          let t;
          if (i.title === item.title) {
            t = { ...i, show: true };
          } else {
            t = { ...i, show: false };
          }
          return t;
        })
      );
      sessionStorage.setItem('questionTitle', item.title);
    } else {
      Toast.show({
        content: '敬请期待',
      });
    }
  };
  return (
    <div className={styles.container}>
      {listing.map((i, index) => (
        <div key={index} className={styles.boxOut}>
          <p>
            <span>{i.biggerTitle}</span> <span>（{i.items.length}）</span>
          </p>
          {i?.items?.map((t, tIndex) => (
            <div key={tIndex} className={styles.box}>
              {/* 题目部分 */}
              <div
                className={t.result || t.com ? styles.link : styles.underline}
                onClick={() => {
                  showResolve(t, tIndex);
                }}
              >
                {tIndex + 1}. {t.title}
              </div>
              {/* 答案部分 */}
              {t.result &&
                sessionStorage.getItem('questionTitle') === t.title && (
                  <div className={styles.resolve}>
                    <p>答案：{t.result}</p>
                  </div>
                )}
              {/* 案例部分 */}
              {t.com && sessionStorage.getItem('questionTitle') === t.title && (
                <div className={styles.case}>
                  <span>案例：{t.com}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Assemble;
