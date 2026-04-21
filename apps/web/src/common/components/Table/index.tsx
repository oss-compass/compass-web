import React, { useEffect, useState, useRef } from 'react';
import { Table, ConfigProvider } from 'antd';
import getLocale from '@common/utils/getLocale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

const MyTable = (props) => {
  const [local, setLocale] = useState(enUS);
  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);

  // 处理 pagination，确保分页器的 Select 下拉框不被容器裁剪
  const enhancedProps = { ...props };
  if (enhancedProps.pagination) {
    enhancedProps.pagination = {
      ...enhancedProps.pagination,
      showSizeChanger: {
        popupMatchSelectWidth: false,
        getPopupContainer: () => document.body,
        placement: 'topLeft',
      },
    };
  }

  return (
    <ConfigProvider locale={local}>
      <Table {...enhancedProps} />
    </ConfigProvider>
  );
};
export default React.memo(MyTable);
