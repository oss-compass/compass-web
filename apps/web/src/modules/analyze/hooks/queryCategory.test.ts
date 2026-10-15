import collectionsMenu from '@public/data/collections—menus.json';
import collections from '@public/data/collections.json';
import {
  resolveCategoryScope,
  flattenCategoryOptions,
  allCategoryIdents,
} from './useQueryCategory';

describe('resolveCategoryScope', () => {
  const IDENTS = ['aigc', 'rust-picks', 'Excel-toolkits'];

  it('未请求分类时是全局，且不算非法', () => {
    expect(resolveCategoryScope(undefined, IDENTS)).toEqual({
      requested: undefined,
      ident: undefined,
      invalid: false,
    });
    expect(resolveCategoryScope('', IDENTS)).toEqual({
      requested: undefined,
      ident: undefined,
      invalid: false,
    });
  });

  it('名单里的分类被接受', () => {
    expect(resolveCategoryScope('aigc', IDENTS)).toEqual({
      requested: 'aigc',
      ident: 'aigc',
      invalid: false,
    });
  });

  it('大小写不一致时归一到名单里的规范写法', () => {
    // 前端名单（collections.json 的键）是**小写**，后端 category 字段带 lowercase
    // normalizer，两者一致；故 URL 里给原始大小写也会归一到小写后发出。
    expect(resolveCategoryScope('Excel-toolkits', IDENTS)).toEqual({
      requested: 'Excel-toolkits',
      ident: 'Excel-toolkits',
      invalid: false,
    });
    expect(resolveCategoryScope('EXCEL-TOOLKITS', ['excel-toolkits'])).toEqual({
      requested: 'EXCEL-TOOLKITS',
      ident: 'excel-toolkits',
      invalid: false,
    });
  });

  it('不在名单里的分类必须标为非法，绝不静默退回全局', () => {
    // 这是 A09「不能把所有项目的基准误标成本分类」的镜像：
    // 若 URL 说了一个不存在的分类、界面却按全局渲染，用户看到的是全局基准
    // 却被 URL 声称是某个分类——同样是误标。故必须显式 invalid。
    const got = resolveCategoryScope('not-a-category', IDENTS);
    expect(got.invalid).toBe(true);
    expect(got.ident).toBeUndefined();
    expect(got.requested).toBe('not-a-category');
  });

  it('重复参数取第一个', () => {
    expect(resolveCategoryScope(['aigc', 'rust-picks'], IDENTS).ident).toBe(
      'aigc'
    );
  });

  it('非字符串输入按未请求处理', () => {
    expect(resolveCategoryScope(123, IDENTS).invalid).toBe(false);
    expect(resolveCategoryScope(null, IDENTS).ident).toBeUndefined();
  });
});

describe('flattenCategoryOptions', () => {
  const MENUS = [
    {
      ident: 'operation-system',
      name: 'Operation System',
      name_cn: '操作系统',
      items: ['desktop-operation-system'],
      items_info: [
        {
          ident: 'desktop-operation-system',
          name: 'Desktop operation system',
          name_cn: '桌面操作系统',
        },
        // 故意用原始大小写：collections.json 的键是小写，两者必须能对上
        {
          ident: 'Excel-toolkits',
          name: 'Excel toolkits',
          name_cn: 'Excel工具包',
        },
      ],
    },
  ];

  it('按完整标识名单生成选项，并从菜单取所属领域（大小写不敏感）', () => {
    const got = flattenCategoryOptions(MENUS, [
      'desktop-operation-system',
      'excel-toolkits',
    ]);
    expect(got).toEqual([
      {
        ident: 'desktop-operation-system',
        name: 'Desktop operation system',
        nameCn: '桌面操作系统',
        domainIdent: 'operation-system',
        domainName: 'Operation System',
        domainNameCn: '操作系统',
      },
      {
        ident: 'excel-toolkits',
        name: 'Excel toolkits',
        nameCn: 'Excel工具包',
        domainIdent: 'operation-system',
        domainName: 'Operation System',
        domainNameCn: '操作系统',
      },
    ]);
  });

  it('名单里有、菜单里没有的分类也必须出现（领域留空，由调用方归入其他组）', () => {
    // menus 只覆盖 302 / 341，web-framework、chatgpt 等 39 个不在其中。
    // 若按 menus 生成选项，这 39 个就无法被选中。
    const got = flattenCategoryOptions(MENUS, ['web-framework']);
    expect(got).toEqual([
      {
        ident: 'web-framework',
        name: '',
        nameCn: '',
        domainIdent: '',
        domainName: '',
        domainNameCn: '',
      },
    ]);
  });

  it('菜单不是数组时，名单里的分类仍全部出现', () => {
    const got = flattenCategoryOptions(undefined, ['aigc', 'rust-picks']);
    expect(got.map((o) => o.ident)).toEqual(['aigc', 'rust-picks']);
    expect(got.every((o) => o.domainIdent === '')).toBe(true);
  });
});

describe('对真实分类数据', () => {
  it('标识名单取自 collections.json（完整），而不是 menus（少 39 个）', () => {
    const idents = allCategoryIdents();
    expect(idents.length).toBe(Object.keys(collections).length);
    // menus 里没有、但确实存在的分类：若拿 menus 当校验名单，这些会被误判成 invalid
    expect(idents).toContain('web-framework');
    expect(idents).toContain('chatgpt');
    expect(idents).toContain('graph-database');
    const menuIdents = new Set(
      (collectionsMenu as any[]).flatMap((d) =>
        (d.items_info || []).map((i: any) => String(i.ident).toLowerCase())
      )
    );
    expect(menuIdents.has('web-framework')).toBe(false);
  });

  it('每个标识都生成选项，菜单里没有的落在无领域组', () => {
    const idents = allCategoryIdents();
    const options = flattenCategoryOptions(collectionsMenu, idents);
    expect(options.map((o) => o.ident)).toEqual(idents);
    const ungrouped = options.filter((o) => !o.domainIdent);
    expect(ungrouped.length).toBeGreaterThan(0);
    expect(ungrouped.map((o) => o.ident)).toContain('web-framework');
    // 菜单里有的必须拿到领域
    expect(
      options.find((o) => o.ident === 'rust-picks')?.domainIdent
    ).toBeTruthy();
  });

  it('标识全部小写——getSecondIdentName 是精确键匹配，否则取不到本地化名', () => {
    expect(allCategoryIdents().every((i) => i === i.toLowerCase())).toBe(true);
  });
});
