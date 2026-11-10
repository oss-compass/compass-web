import React from 'react';
import { render, screen } from '@testing-library/react';
import BaselineScopeLabel, {
  describeBaselineScope,
} from './BaselineScopeLabel';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

const OPTION = { name: 'Rust Picks', nameCn: 'Rust 精选项目' };

describe('describeBaselineScope', () => {
  it('未选分类时是全局基准', () => {
    const got = describeBaselineScope(
      { requested: undefined, ident: undefined, invalid: false },
      OPTION
    );
    expect(got.kind).toBe('global');
    expect(got.ident).toBeUndefined();
  });

  it('选了分类时带上规范 ident 与显示名', () => {
    const got = describeBaselineScope(
      { requested: 'rust-picks', ident: 'rust-picks', invalid: false },
      OPTION
    );
    expect(got).toEqual({
      kind: 'category',
      ident: 'rust-picks',
      displayName: 'Rust 精选项目',
      requested: 'rust-picks',
    });
  });

  it('缺名称时退回 ident，不显示空白', () => {
    const got = describeBaselineScope(
      { requested: 'x', ident: 'x', invalid: false },
      undefined
    );
    expect(got.displayName).toBe('x');
  });

  it('非法分类必须是 unknown，**绝不能退化成 global**', () => {
    // A09 要求「不能把所有项目的基准误标成本分类」；反向同样成立：
    // 若 URL 说了个不存在的分类、界面却按全局渲染，用户看到的是全局基准
    // 却被声称是某个分类——这就是误标。故非法必须自成一类。
    const got = describeBaselineScope(
      { requested: 'not-a-category', ident: undefined, invalid: true },
      OPTION
    );
    expect(got.kind).toBe('unknown');
    expect(got.kind).not.toBe('global');
    expect(got.requested).toBe('not-a-category');
    expect(got.displayName).toBeUndefined();
  });
});

describe('BaselineScopeLabel 渲染', () => {
  it('全局时显示全局标记，且不出现任何分类名', () => {
    render(
      <BaselineScopeLabel
        scope={{ requested: undefined, ident: undefined, invalid: false }}
        option={OPTION}
      />
    );
    expect(screen.getByTestId('baseline-scope')).toHaveAttribute(
      'data-scope-kind',
      'global'
    );
    expect(screen.getByTestId('baseline-scope').textContent).not.toContain(
      'Rust 精选项目'
    );
  });

  it('分类时显示分类名，并标出种类', () => {
    render(
      <BaselineScopeLabel
        scope={{ requested: 'rust-picks', ident: 'rust-picks', invalid: false }}
        option={OPTION}
      />
    );
    const el = screen.getByTestId('baseline-scope');
    expect(el).toHaveAttribute('data-scope-kind', 'category');
    expect(el.textContent).toContain('Rust 精选项目');
  });

  it('非法分类时不显示全局标记，而是明确说该分类未知', () => {
    render(
      <BaselineScopeLabel
        scope={{ requested: 'not-a-category', ident: undefined, invalid: true }}
        option={OPTION}
      />
    );
    const el = screen.getByTestId('baseline-scope');
    expect(el).toHaveAttribute('data-scope-kind', 'unknown');
    expect(el.textContent).not.toContain('Rust 精选项目');
    // 关键：不能与全局的状态文本相同
    const globalText = describeBaselineScope(
      { requested: undefined, ident: undefined, invalid: false },
      OPTION
    );
    expect(el.getAttribute('data-scope-kind')).not.toBe(globalText.kind);
  });
});
