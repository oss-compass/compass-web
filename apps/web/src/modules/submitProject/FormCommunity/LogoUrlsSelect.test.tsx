import React, { act, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import LogoUrlsSelect from './LogoUrlsSelect';

jest.mock('@common/components/ImageFallback', () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => <img src={src} alt="logo" />,
}));

function Form({ urls }: { urls: string[] }) {
  const [value, onChange] = useState('');
  return (
    <>
      <LogoUrlsSelect logoUrls={urls} value={value} onChange={onChange} />
      <input name="projectLogoUrl" value={value} readOnly />
    </>
  );
}

describe('community logo selection', () => {
  let container: HTMLDivElement;
  let root: Root;
  const value = () => container.querySelector('input')!.value;
  const renderOptions = (urls: string[]) =>
    // React's createRoot does not wrap updates in act, unlike Testing Library.
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => root.render(<Form urls={urls} />));
  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });
  it('selects the first available logo', () => {
    renderOptions(['a.png', 'b.png']);
    expect(value()).toBe('a.png');
  });
  it('replaces a removed selection with an available logo', () => {
    renderOptions(['a.png', 'b.png']);
    renderOptions(['b.png']);
    expect(value()).toBe('b.png');
  });
  it('clears an empty list and selects from subsequently added repositories', () => {
    renderOptions(['a.png']);
    renderOptions([]);
    expect(value()).toBe('');
    renderOptions(['b.png']);
    expect(value()).toBe('b.png');
  });
  it('preserves an explicit selection when options are reordered or extended', () => {
    renderOptions(['a.png', 'b.png']);
    act(() =>
      container
        .querySelectorAll('img')[1]
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    );
    expect(value()).toBe('b.png');
    renderOptions(['c.png', 'b.png', 'a.png']);
    expect(value()).toBe('b.png');
  });
});
