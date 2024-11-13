import React, { useRef, useState, useEffect } from 'react';
import { ModelMetric } from '@oss-compass/graphql';
import { useTranslation } from 'next-i18next';
import { Popover } from 'antd';

const MetricsName: React.FC<{
  metrics: ModelMetric[];
  modelId: Number;
}> = ({ metrics, modelId }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null); // 父 div
  const [overflowedItems, setOverflowedItems] = useState([]);
  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (container) {
        const overflowItems = metrics.filter((item, index) => {
          const itemDiv = document.getElementById(
            `metric-item-${modelId}-${index}`
          );
          return itemDiv.offsetTop > container.offsetTop;
        });
        setOverflowedItems(overflowItems);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow); // 监听窗口大小变化

    return () => {
      window.removeEventListener('resize', checkOverflow); // 清理事件监听器
    };
  }, []);

  return (
    <Popover
      key={2234}
      content={
        overflowedItems.length > 0
          ? overflowedItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="text-slate-auto-700 mr-2 box-border inline-block h-6 truncate rounded bg-slate-100 px-2 py-0 text-xs leading-6 dark:bg-gray-800"
                >
                  {t(`lab_metrics:${item.category}.${item.ident}`)}
                </div>
              );
            })
          : ''
      }
    >
      <div
        ref={containerRef}
        className="line-clamp-1 my-1 h-[24px] w-full break-all px-0"
      >
        {metrics.map((item, index) => {
          return (
            <div
              id={`metric-item-${modelId}-${index}`}
              key={item.id}
              className="text-slate-auto-700 mr-2 box-border inline-block h-6 max-w-[50%] truncate rounded bg-slate-100 px-2 py-0 text-xs leading-6 dark:bg-gray-800"
            >
              {t(`lab_metrics:${item.category}.${item.ident}`)}
            </div>
          );
        })}
      </div>
    </Popover>
  );
};

export default MetricsName;
