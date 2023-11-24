import React, { useEffect, useState, useRef } from 'react';
import { Table, ConfigProvider } from 'antd';
import getLocale from '@common/utils/getLocale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

const MyTable = (props) => {
  // const [scrollY, setScrollY] = useState<string | number>(400);
  // let countRef = useRef(null);
  // useEffect(() => {
  //   let scrolly = getTableScroll({ ref: countRef });
  //   if (countRef) setScrollY(scrolly);
  // }, [countRef]);

  const [local, setLocale] = useState(enUS);
  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);
  return (
    <div>
      <ConfigProvider locale={local}>
        <Table
          {...props}
          rowClassName={(_record, i) => (i % 2 === 1 ? '!bg-[#fafafa]' : '')}
          // bordered
        />
      </ConfigProvider>
    </div>
  );
};
export default MyTable;
