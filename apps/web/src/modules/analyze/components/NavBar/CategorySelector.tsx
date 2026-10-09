import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  useCategoryOptions,
  useCategoryScope,
} from '@modules/analyze/hooks/useQueryCategory';
import { getSecondIdentName } from '@common/collectionsI18n';

/**
 * 分类基准选择器。
 *
 * 落点 8 的一半：让前端能表达「要哪个分类的基准」。此前后端已加好
 * `argument :category`，但没有任何界面传它——整条读侧功能从界面看是休眠的。
 *
 * 走 URL 查询参数（`?category=<ident>`），与 `range` 一致：范围属于视图身份，
 * 应当可分享、可回退。空值表示全局。
 *
 * 范围词本应放进 i18n 子模块（`oss-compass/i18n`，独立仓库，不属本次补丁范围），
 * 故暂用组件内的小表，与 `BaselineScopeLabel` 同源，待上游接受后迁入。
 * 分类名不走这张表——`getSecondIdentName` 按语言从既有数据里取。
 */
const TEXT: Record<string, { all: string; other: string }> = {
  en: { all: 'All categories', other: 'Other' },
  zh: { all: '全部分类', other: '其他' },
};

const CategorySelector: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const lang = i18n?.language || 'en';
  const text = TEXT[lang] || TEXT.en;
  const options = useCategoryOptions();
  const scope = useCategoryScope(options);

  const grouped = useMemo(() => {
    const byDomain = new Map<string, { label: string; idents: string[] }>();
    options.forEach((option) => {
      // 名单里有、菜单里没有的分类没有领域，归入最后一组
      const key = option.domainIdent;
      if (!byDomain.has(key)) {
        byDomain.set(key, {
          label: key
            ? (lang === 'en' ? option.domainName : option.domainNameCn) ||
              option.domainIdent
            : text.other,
          idents: [],
        });
      }
      byDomain.get(key)?.idents.push(option.ident);
    });
    // 有领域的排前面，无领域的（其他）放最后
    return Array.from(byDomain.entries())
      .sort(([a], [b]) => (a === '' ? 1 : b === '' ? -1 : 0))
      .map(([, group]) => group);
  }, [options, lang, text.other]);

  const onChange = (value: string) => {
    const query = { ...router.query };
    if (value) {
      query.category = value;
    } else {
      delete query.category;
    }
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return (
    <label className="mr-2 flex items-center text-xs text-gray-600">
      <select
        data-testid="category-selector"
        data-scope-kind={
          scope.invalid ? 'unknown' : scope.ident ? 'category' : 'global'
        }
        value={scope.ident || ''}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-[180px] rounded border border-gray-300 bg-white px-1.5 py-1"
      >
        <option value="">{text.all}</option>
        {scope.invalid && (
          <option value={scope.requested}>{scope.requested}</option>
        )}
        {grouped.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.idents.map((ident) => (
              <option key={ident} value={ident}>
                {getSecondIdentName(ident, lang)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
};

export default CategorySelector;
