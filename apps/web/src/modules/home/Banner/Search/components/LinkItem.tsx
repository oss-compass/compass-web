/**
 * 链接项组件
 * 显示搜索结果中的单个项目链接
 */

import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { Level } from '@modules/analyze/constant';
import { LinkItemProps } from '../types';
import { getSearchItemContent, getSearchItemLink } from '../utils';
import { STYLE_CLASSES } from '../constants';
import Icon from './Icon';

/**
 * 链接项组件
 * @param item 搜索结果项
 * @param active 是否为激活状态
 * @returns 链接项组件
 */
const LinkItem: React.FC<LinkItemProps> = ({ item, active }) => {
  const { t } = useTranslation();

  // 获取项目内容信息
  const contentInfo = getSearchItemContent(item, t);

  /**
   * 渲染项目内容
   * @returns 内容元素
   */
  const renderContent = () => {
    if (contentInfo.type === 'repository') {
      return (
        <>
          <span className="mb-0.5 truncate text-base font-medium">
            {contentInfo.title}
          </span>
          <span className="flex items-center text-xs">
            {contentInfo.showIcon && contentInfo.icon && (
              <Icon name={contentInfo.icon} />
            )}
            <span className="ml-1 truncate text-gray-600">
              {contentInfo.subtitle}
            </span>
          </span>
        </>
      );
    }

    return (
      <span className="flex items-center">
        <span className="truncate text-base font-medium">
          {contentInfo.title}
        </span>
        <span className="ml-2 rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs text-[#D98523]">
          {contentInfo.subtitle}
        </span>
      </span>
    );
  };

  return (
    <Link
      key={item.label}
      href={getSearchItemLink(item)}
      className={classnames(STYLE_CLASSES.LINK_ITEM_BASE, {
        'bg-gray-100': active,
      })}
    >
      <span className="flex min-w-0 flex-1 flex-col overflow-hidden pr-4">
        {renderContent()}
      </span>
      <span className="text-primary flex flex-shrink-0 items-center text-sm font-medium">
        {t('home:compass_report')}
        <AiOutlineRightCircle className="ml-2 text-base" />
      </span>
    </Link>
  );
};

export default LinkItem;
