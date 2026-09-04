import * as fs from 'fs';
import * as path from 'path';

// jsdom 的 CSS 对象缺少 supports，Highcharts 12 求值时需要它
(window as any).CSS = (window as any).CSS ?? {};
(window as any).CSS.supports = (window as any).CSS.supports ?? (() => true);

/**
 * 高模块加载顺序回归测试。
 *
 * 生产事故背景：dependency-wheel 模块在「模块求值时」顶层解构
 * `SeriesRegistry.seriesTypes.sankey`，如果 sankey 模块尚未注册，
 * 会抛出 `TypeError: Cannot read properties of undefined (reading 'prototype')`，
 * 导致 /os-situation/metrics/import_export 页面的依赖关系图永远空白。
 */
describe('highcharts dependency-wheel load order', () => {
  it('throws the production TypeError when dependency-wheel is evaluated before sankey', () => {
    jest.resetModules();
    const Highcharts = require('highcharts');
    // dependency-wheel 在未注册 sankey 时求值，必须抛出与线上一致的错误
    expect(() => {
      require('highcharts/modules/dependency-wheel');
    }).toThrow(
      new RegExp(
        "Cannot read properties of undefined \\(reading 'prototype'\\)"
      )
    );
    expect(
      (Highcharts as any).SeriesRegistry.seriesTypes.dependencywheel
    ).toBeUndefined();
    jest.resetModules();
  });

  it('registers the dependencywheel series when sankey is loaded first', () => {
    jest.resetModules();
    require('highcharts');
    require('highcharts/modules/sankey');
    require('highcharts/modules/dependency-wheel');
    const Highcharts = require('highcharts');
    expect(
      (Highcharts as any).SeriesRegistry.seriesTypes.dependencywheel
    ).toBeDefined();
    jest.resetModules();
  });

  it('loadHighchartsModules awaits sankey before dependency-wheel', async () => {
    const source = fs.readFileSync(
      path.join(__dirname, 'DependencywheelCommon.tsx'),
      'utf8'
    );
    const sankeyIndex = source.indexOf(
      "await import('highcharts/modules/sankey')"
    );
    const wheelIndex = source.indexOf(
      "await import('highcharts/modules/dependency-wheel')"
    );
    expect(sankeyIndex).toBeGreaterThan(-1);
    expect(wheelIndex).toBeGreaterThan(sankeyIndex);
    // 防止改回 Promise.all 并行加载的写法
    expect(source).not.toMatch(/Promise\.all\(\s*\[\s*import\('highcharts/);
  });
});
