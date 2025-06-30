/**
 * 提交项目组件
 * 显示提交项目的提示和按钮
 */

import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { SubmitYourProjectProps } from '../types';
import { MIN_HEIGHT } from '../constants';

/**
 * 提交项目组件
 * @param content 显示内容
 * @param noResult 是否为无结果状态
 * @param className 额外的样式类
 * @param hidden 是否隐藏按钮
 * @returns 提交项目组件
 */
const SubmitYourProject: React.FC<SubmitYourProjectProps> = ({
  content,
  noResult = false,
  className,
  hidden = false,
}) => {
  const { t } = useTranslation();

  return (
    <p
      className={classnames(
        className,
        'flex items-center justify-between pl-4 pr-2.5 text-lg text-gray-500',
        'md:px-2 md:text-sm',
        {
          [`min-h-[${MIN_HEIGHT.SUBMIT_PROJECT_NO_RESULT}]`]: noResult,
          [`min-h-[${MIN_HEIGHT.SUBMIT_PROJECT_NORMAL}]`]: !noResult,
        }
      )}
    >
      <span className="flex-wrap text-base leading-none">{content}</span>
      {!hidden && (
        <Link
          href="/submit-your-project"
          className={classnames(
            'flex-shrink-0 bg-black px-3 text-sm text-white shadow hover:opacity-90',
            'md:px-2 md:text-sm',
            {
              'py-2.5': noResult,
              'py-1': !noResult,
            }
          )}
        >
          {t('home:submit_your_project')}
        </Link>
      )}
    </p>
  );
};

export default SubmitYourProject;
