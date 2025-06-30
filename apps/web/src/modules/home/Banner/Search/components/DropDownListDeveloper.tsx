/**
 * 开发者下拉列表组件
 * 显示开发者搜索结果
 */

import React from 'react';
import { DropDownListDeveloperProps } from '../types';
import DeveloperItem from './DeveloperItem';

/**
 * 开发者下拉列表组件
 * @param result 搜索结果数组
 * @returns 开发者下拉列表组件
 */
const DropDownListDeveloper: React.FC<DropDownListDeveloperProps> = ({
  result,
}) => {
  return (
    <>
      {/* 开发者结果列表 */}
      {result.map((item, index) => (
        <DeveloperItem
          key={item.label}
          item={item}
          active={false} // 开发者列表暂不支持键盘导航高亮
        />
      ))}
    </>
  );
};

export default DropDownListDeveloper;
