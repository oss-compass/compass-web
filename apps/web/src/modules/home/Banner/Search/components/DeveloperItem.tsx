/**
 * 开发者项组件
 * 显示开发者搜索结果项
 */

import React from 'react';
import Link from 'next/link';
import ImageFallback from '@common/components/ImageFallback';
import { LinkItemProps } from '../types';
import { getDeveloperInfo } from '../utils';
import { MIN_HEIGHT } from '../constants';

/**
 * 开发者项组件
 * @param item 搜索结果项
 * @param active 是否为激活状态（暂未使用，保持接口一致性）
 * @returns 开发者项组件
 */
const DeveloperItem: React.FC<LinkItemProps> = ({ item, active }) => {
  // 获取开发者信息
  const developerInfo = getDeveloperInfo(item);

  return (
    <Link
      key={item.label}
      href={developerInfo.profileLink}
      className="flex min-h-[48px] cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
    >
      {/* 开发者头像 */}
      <div className="h-7 w-7 flex-shrink-0 overflow-hidden rounded-full border border-gray-100">
        <ImageFallback
          src={developerInfo.avatarUrl}
          referrerPolicy="no-referrer"
          unoptimized
          width={28}
          height={28}
          style={{
            objectFit: 'cover',
          }}
          fallbackSrc="/images/default.png"
          alt="开发者头像"
        />
      </div>

      {/* 开发者用户名 */}
      <span className="truncate text-base font-medium">
        {developerInfo.username}
      </span>
    </Link>
  );
};

export default DeveloperItem;
