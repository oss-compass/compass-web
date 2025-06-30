import React from 'react';
import classnames from 'classnames';
import { TabsProps } from '../types';

/**
 * 标签页组件
 * @param items 标签页配置项数组
 * @param onTabChange 标签页切换回调
 * @param activeTabKey 当前激活的标签页键值
 * @returns 标签页组件
 */
const Tabs: React.FC<TabsProps> = ({ items, onTabChange, activeTabKey }) => {
  /**
   * 处理标签页切换
   * @param key 标签页键值
   */
  const handleTabChange = (key: string) => {
    onTabChange(key);
  };

  return (
    <div>
      <div className="flex border-b">
        {items.map((item) => (
          <button
            key={item.key}
            className={classnames(
              'py-2 px-6 transition duration-150 ease-in-out focus:outline-none',
              {
                'border-b-2 border-blue-500 pb-[6px] text-blue-500':
                  item.key === activeTabKey,
                'text-gray-600 hover:text-blue-500': item.key !== activeTabKey,
              }
            )}
            onClick={() => handleTabChange(item.key)}
            type="button"
            aria-selected={item.key === activeTabKey}
            role="tab"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
