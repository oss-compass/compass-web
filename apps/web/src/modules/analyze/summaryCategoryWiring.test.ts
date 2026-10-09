import fs from 'fs';
import path from 'path';

/**
 * 接线门禁：分类参数必须**从 URL 一路传到查询**，中间任何一环断了都要红。
 *
 * 为什么需要它：本工程已经栽过两次同一个坑——参数与逻辑都写好了，
 * **没有任何调用方传它**，于是功能在真实链路上整体休眠
 * （落点 3 与 4b-ii 曾因入口不传分类而休眠，才有落点 3b）。
 * 前端这一层同样可能：选择器改了 URL、但 provider 不读它，或 GraphQL 文档里
 * 没有声明 `$category`，界面看起来一切正常而实际永远是全局基准。
 *
 * 这是**静态**检查（读源码字符串）。它证明不了运行期行为，
 * 但正好能挡住"漏了一处"这一类缺陷；行为由选择器与标签的单元测试覆盖。
 */
// 本测试位于 apps/web/src/modules/analyze/ 下，故向上一级才是 apps/web
const WEB_ROOT = path.resolve(__dirname, '../../..'); // apps/web
const REPO_ROOT = path.resolve(WEB_ROOT, '../..'); // compass-web

const read = (p: string) => fs.readFileSync(p, 'utf8');

const isCommented = (line: string) => line.trim().startsWith('//');

describe('分类参数的前端接线', () => {
  it('GraphQL 文档里 summary 查询声明并传入了 $category', () => {
    const doc = read(
      path.join(REPO_ROOT, 'packages/graphql/src/gql/query.graphql')
    );
    const start = doc.indexOf('query summary(');
    expect(start).toBeGreaterThan(-1);
    const rest = doc.slice(start);
    const next = rest.indexOf('\nquery ', 1);
    const block = next === -1 ? rest : rest.slice(0, next);

    expect(block).toContain('$category: String');
    const calls =
      block.match(/summary(Activity|Community|Codequality|GroupActivity)\(/g) ||
      [];
    expect(calls.length).toBe(4);
    const withCategory = block.match(/category:\s*\$category/g) || [];
    expect(withCategory.length).toBe(4);
  });

  it('生成的类型里 SummaryQueryVariables 含 category', () => {
    // 代码生成需要活的 Rails 后端（codegen.yml 的 schema 取自 API_URL），
    // 本机跑不了，故 generated.ts 是**按 codegen 产物手工同步**的。
    // 这条断言两者一致，防止手工同步漏掉。
    const generated = read(
      path.join(REPO_ROOT, 'packages/graphql/src/generated.ts')
    );
    const start = generated.indexOf('export type SummaryQueryVariables');
    expect(start).toBeGreaterThan(-1);
    const block = generated.slice(start, generated.indexOf('};', start));
    expect(block).toContain('category');
  });

  it('生成的查询文档字符串里带上了 $category', () => {
    const generated = read(
      path.join(REPO_ROOT, 'packages/graphql/src/generated.ts')
    );
    expect(generated).toContain(
      'query summary($start: ISO8601DateTime, $end: ISO8601DateTime, $category: String)'
    );
    expect(generated).toContain(
      'summaryActivity(beginDate: $start, endDate: $end, category: $category)'
    );
    expect(generated).toContain(
      'summaryGroupActivity(beginDate: $start, endDate: $end, category: $category)'
    );
  });

  it('活着的那个 useSummaryQuery 收到了 category', () => {
    // 注意：contributor 分支的 useSummaryQuery 在**上游就是被注释掉的**，
    // 所以基准只在协作模式下取。这里只断言活着的那一处，
    // 并且不把它取消注释——那是上游的既有状态，不属本落点。
    const provider = read(
      path.join(WEB_ROOT, 'src/modules/analyze/context/ChartsDataProvider.tsx')
    );
    const lines = provider.split('\n');
    const active = lines
      .map((line, index) => ({ line, index }))
      .filter(
        ({ line }) => line.includes('useSummaryQuery(') && !isCommented(line)
      );
    expect(active.length).toBe(1);
    const surrounding = lines
      .slice(active[0].index, active[0].index + 12)
      .join('\n');
    expect(surrounding).toContain('category');
    expect(provider).toContain('useCategoryScope');
  });

  it('NavBar 挂载了分类选择器', () => {
    const nav = read(
      path.join(WEB_ROOT, 'src/modules/analyze/components/NavBar/index.tsx')
    );
    expect(nav).toContain('CategorySelector');
    expect(nav).toMatch(/<CategorySelector\s*\/>/);
  });

  it('选择器把值写进 URL 的 category 参数', () => {
    const selector = read(
      path.join(
        WEB_ROOT,
        'src/modules/analyze/components/NavBar/CategorySelector.tsx'
      )
    );
    expect(selector).toContain('query.category = value');
    expect(selector).toContain('delete query.category');
  });
});
