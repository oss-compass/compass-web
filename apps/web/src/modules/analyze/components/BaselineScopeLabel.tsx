import React from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { getSecondIdentName } from '@common/collectionsI18n';
import { CategoryScope } from '@modules/analyze/hooks/useQueryCategory';

export type BaselineScopeKind = 'global' | 'category' | 'unknown';

export interface BaselineScopeDescriptor {
  kind: BaselineScopeKind;
  /** 规范分类标识（kind 为 category 时） */
  ident?: string;
  /** 展示用的分类名（优先本地化名，缺则退回 ident） */
  displayName?: string;
  /** URL 里给的原始值（kind 为 unknown 时用于提示） */
  requested?: string;
}

export interface CategoryNameOption {
  name?: string;
  nameCn?: string;
}

/**
 * 把 scope 变成一个可断言的描述。
 *
 * **关键约定**：`invalid` 的分类必须是 `unknown`，**绝不能退化成 `global`**。
 * 若 URL 说了一个不存在的分类、界面却按全局渲染，用户看到的是全局基准
 * 却被声称是某个分类——正是验收条目 A09 禁止的那类误标。
 */
export const describeBaselineScope = (
  scope: CategoryScope,
  option?: CategoryNameOption
): BaselineScopeDescriptor => {
  if (scope.invalid) {
    return { kind: 'unknown', requested: scope.requested };
  }
  if (!scope.ident) {
    return { kind: 'global' };
  }
  const displayName = option?.nameCn || option?.name || scope.ident;
  return {
    kind: 'category',
    ident: scope.ident,
    displayName,
    requested: scope.requested,
  };
};

/**
 * 范围词只在这里出现两次。**它们本应放进 i18n 仓库**
 * （`oss-compass/i18n`，是独立子模块），但那个仓库不属本次补丁的范围，
 * 故暂时放在组件内的一个小表里；待上游接受本改动后再迁入。
 * 分类名不走这张表：它由 `getSecondIdentName` 按语言取，不需要新键。
 */
const SCOPE_TEXT: Record<string, { global: string; unknown: string }> = {
  en: { global: 'Global baseline', unknown: 'Unknown category' },
  zh: { global: '全局基准', unknown: '未知分类' },
};

export interface BaselineScopeLabelProps {
  scope: CategoryScope;
  /** 分类名的候选（优先 nameCn）。不传则按当前语言从分类名单里取。 */
  option?: CategoryNameOption;
  className?: string;
}

/**
 * 基准范围标识。
 *
 * 它存在的唯一理由是验收条目 A09：**全局/分类可辨**。
 * `data-scope-kind` 属性让测试与样式都能直接按范围分支，不必解析文案。
 *
 * 取名优先级：显式传入的 `option` > 按语言从名单里取 > 规范 ident。
 */
const BaselineScopeLabel: React.FC<BaselineScopeLabelProps> = ({
  scope,
  option,
  className,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n?.language || 'en';
  const text = SCOPE_TEXT[lang] || SCOPE_TEXT.en;

  const descriptor = describeBaselineScope(scope, option);

  let content: string;
  if (descriptor.kind === 'category') {
    const ident = descriptor.ident as string;
    content =
      option?.nameCn ||
      option?.name ||
      getSecondIdentName(ident, lang) ||
      ident;
  } else if (descriptor.kind === 'unknown') {
    content = `${text.unknown}: ${descriptor.requested}`;
  } else {
    content = text.global;
  }

  return (
    <span
      data-testid="baseline-scope"
      data-scope-kind={descriptor.kind}
      data-scope-ident={descriptor.ident || ''}
      className={classnames(
        'ml-2 rounded px-1.5 py-0.5 text-xs',
        descriptor.kind === 'category' && 'bg-gray-100 text-gray-700',
        descriptor.kind === 'global' && 'text-gray-400',
        descriptor.kind === 'unknown' && 'bg-red-50 text-red-600',
        className
      )}
    >
      {content}
    </span>
  );
};

export default BaselineScopeLabel;
