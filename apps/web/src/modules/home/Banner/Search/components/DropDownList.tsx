/**
 * 下拉列表组件
 * 显示仓库和社区搜索结果
 */

import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useDropDown from '@common/hooks/useDropDown';
import { DropDownListProps } from '../types';
import { getSearchItemLink } from '../utils';
import LinkItem from './LinkItem';
import SubmitYourProject from './SubmitYourProject';

/**
 * 下拉列表组件
 * @param result 搜索结果数组
 * @returns 下拉列表组件
 */
const DropDownList: React.FC<DropDownListProps> = ({ result }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // 使用下拉框键盘导航Hook
  const { active } = useDropDown({
    totalLength: result.length,
    onPressEnter: () => {
      const activeItem = result[active];
      if (activeItem) {
        router.push(getSearchItemLink(activeItem));
      }
    },
  });

  return (
    <>
      {/* 搜索结果列表 */}
      {result.map((item, index) => (
        <LinkItem key={item.label} item={item} active={active === index} />
      ))}

      {/* 提交项目提示 */}
      <SubmitYourProject
        content={t('home:cant_find_the_right_option')}
        className="border-t-2 border-black"
      />
    </>
  );
};

export default DropDownList;
