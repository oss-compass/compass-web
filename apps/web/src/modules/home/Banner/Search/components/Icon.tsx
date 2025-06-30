/**
 * 图标组件
 * 根据名称渲染对应的图标
 */

import React from 'react';
import { SiGitee, SiGithub } from 'react-icons/si';
import { IconProps } from '../types';
import { ICON_NAMES } from '../constants';

/**
 * 图标组件
 * @param name 图标名称
 * @param restProps 其他属性
 * @returns 图标元素
 */
const Icon: React.FC<IconProps> = ({ name, ...restProps }) => {
  switch (name) {
    case ICON_NAMES.GITEE:
      return (
        <SiGitee className="flex-shrink-0 text-[#c71c27]" {...restProps} />
      );
    case ICON_NAMES.GITHUB:
      return <SiGithub className="flex-shrink-0" {...restProps} />;
    default:
      return null;
  }
};

export default Icon;
