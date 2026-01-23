import React, { useEffect } from 'react';

const PAGE_SIZE = 10;
const MAX_TOTAL = 100;
const fetchListApi = pageIndex => {
  let leng = PAGE_SIZE * pageIndex;
  let currentTotal = (pageIndex - 1) * PAGE_SIZE;
  console.log(99999, currentTotal);

  let res = Array.from({ length: PAGE_SIZE }, (v, index) => ({
    url: `https://robohash.org/${currentTotal + index}.png?set=set4&size=200x200`,
    title: `机器猫 ${currentTotal + index + 1}`,
    desc: `描述 ${currentTotal + index + 1}`,
  }));

  return Promise.resolve(res);
};

const Version2 = () => {
  const initPage = async () => {
    const res = await fetchListApi(2);
    console.log(res);
  };
  useEffect(() => {
    initPage();
  }, []);
  return (
    <div>
      <ul>
        <li>1111</li>
      </ul>
    </div>
  );
};

export default Version2;
