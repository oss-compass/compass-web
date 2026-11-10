import { useMemo } from 'react';
import { useRouter } from 'next/router';
import collectionsMenu from '@public/data/collections—menus.json';
import collections from '@public/data/collections.json';

/**
 * 一个分类范围的解析结果。
 *
 * - `requested`：URL 里出现的原始值（未经校验），未请求时为 undefined
 * - `ident`：校验通过、可直接用于查询与展示的**规范**分类标识
 * - `invalid`：URL 给了分类，但它不在名单里
 */
export interface CategoryScope {
  requested?: string;
  ident?: string;
  invalid: boolean;
}

export interface CategoryOption {
  ident: string;
  name: string;
  nameCn: string;
  domainIdent: string;
  domainName: string;
  domainNameCn: string;
}

/** Next.js 对重复查询参数会给数组；取第一个，与既有 range 的处理一致。 */
const asSingleString = (raw: unknown): string | undefined => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

/**
 * 分类标识的**完整**名单。
 *
 * 取自 `collections.json` 的键（341 个，**全部小写**），而不是 `collections—menus.json`
 * ——后者只覆盖 302 个，缺 `web-framework`、`chatgpt`、`graph-database` 等 39 个。
 * 用 menus 当校验名单会让这 39 个合法分类被判成 `invalid`。
 *
 * 用**小写**是与前端自身的约定对齐：`gen_collections_file.ts` 产出该文件时
 * 调用了 `ident.toLowerCase()`，而 `getSecondIdentName` 是**精确键匹配**——
 * 传原始大小写（如 `Excel-toolkits`）会取不到本地化名，只能退回标识本身。
 * 后端不受影响：`category` 字段带内置 lowercase normalizer（落点 4b-i 的「丙」），
 * 小写查询能匹配到原样存储的文档。
 */
export const allCategoryIdents = (): string[] => Object.keys(collections);

/**
 * 解析 URL 里的 `category` 参数。
 *
 * - 没给、给了空串、或给了非字符串 → 全局（`invalid` 为 false）
 * - 给了名单里的分类 → 返回**名单里的规范写法**。比较不区分大小写，
 *   与后端 `category` 字段的 normalizer 一致
 * - 给了名单里没有的 → `invalid` 为 true，`ident` 留空
 *
 * **最后一档不能退化成全局。** 验收条目 A09 要求「不能把所有项目的基准误标成本分类」，
 * 反向同样成立：若 URL 声称是某个分类、界面却按全局渲染，用户看到的是全局基准
 * 却被标成了分类——那同样是误标。
 */
export const resolveCategoryScope = (
  raw: unknown,
  idents: readonly string[]
): CategoryScope => {
  const requested = asSingleString(raw);
  if (requested === undefined) {
    return { requested: undefined, ident: undefined, invalid: false };
  }
  const lower = requested.toLowerCase();
  const ident = idents.find((candidate) => candidate.toLowerCase() === lower);
  if (ident === undefined) {
    return { requested, ident, invalid: true };
  }
  return { requested, ident, invalid: false };
};

/**
 * 按**完整**的标识名单生成逐个分类的选项，领域分组取自 `collections—menus.json`
 * （按大小写不敏感匹配）。
 *
 * `collections.json` 没有领域字段，而 menus 只有 302 个分类，故两者互补：
 * 名单来自前者（完整），分组来自后者（有领域）。
 * 名单里有、menus 里没有的，`domainIdent` 为空串，由调用方归入「其他」组。
 * 缺字段的条目只影响它自己，不使整体失败。
 */
export const flattenCategoryOptions = (
  menus: unknown,
  idents: readonly string[]
): CategoryOption[] => {
  const byIdent = new Map<string, Record<string, unknown>>();
  if (Array.isArray(menus)) {
    menus.forEach((domain) => {
      if (!domain || typeof domain !== 'object') return;
      const d = domain as Record<string, unknown>;
      const itemsInfo = Array.isArray(d.items_info) ? d.items_info : [];
      itemsInfo.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        const i = item as Record<string, unknown>;
        if (!i.ident) return;
        byIdent.set(String(i.ident).toLowerCase(), { ...i, __domain: d });
      });
    });
  }

  return idents.map((ident) => {
    const found = byIdent.get(ident.toLowerCase());
    const domain = (found?.__domain || {}) as Record<string, unknown>;
    return {
      ident,
      name: found?.name ? String(found.name) : '',
      nameCn: found?.name_cn ? String(found.name_cn) : '',
      domainIdent: domain.ident ? String(domain.ident) : '',
      domainName: domain.name ? String(domain.name) : '',
      domainNameCn: domain.name_cn ? String(domain.name_cn) : '',
    };
  });
};

/** 名单里的全部分类标识（用于校验 URL 参数）。 */
export const categoryIdents = (options: CategoryOption[]): string[] =>
  options.map((o) => o.ident);

/**
 * 读 URL 里的分类参数。
 *
 * 与 `useQueryDateRange` 一样走 URL 而不是前端 store：「看的是全局还是某个分类」
 * 属于这个视图的身份，应当可分享、可回退。
 */
const useQueryCategory = (): string | undefined => {
  const router = useRouter();
  return asSingleString(router.query.category);
};

/** 把 URL 参数与名单接起来，得到可直接用于查询与展示的 scope。 */
export const useCategoryScope = (options: CategoryOption[]): CategoryScope => {
  const requested = useQueryCategory();
  const idents = useMemo(() => categoryIdents(options), [options]);
  return useMemo(
    () => resolveCategoryScope(requested, idents),
    [requested, idents]
  );
};

/**
 * 分类选项。名单取自随仓库分发的 `collections.json`（341 个），
 * 领域分组取自 `collections—menus.json`（302 个）。
 *
 * 两个文件都是既有页面已在 import 的静态数据，不走网络请求。
 * 体积代价：`collections.json` 约 2.2 MB，但它已通过 `collectionsI18n.tsx`
 * 进入本页依赖（范围标识取本地化名要用它），故不额外增加。
 */
export const useCategoryOptions = (): CategoryOption[] =>
  useMemo(
    () => flattenCategoryOptions(collectionsMenu, allCategoryIdents()),
    []
  );

export default useQueryCategory;
