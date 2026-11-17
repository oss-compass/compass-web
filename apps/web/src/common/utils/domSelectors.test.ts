import { describe, expect, it } from '@jest/globals';

describe('CSS selectors used by Ant Design with Tailwind classes', () => {
  it.each([
    ['span', 'text-[12px]'],
    ['th', 'w-[100px]'],
  ])(
    'computes styles for %s.%s alongside :has(:focus-visible)',
    (tag, className) => {
      const style = document.createElement('style');
      style.textContent = `
      .selector-regression { color: rgb(15, 23, 42); }
      .ant-radio-button-wrapper:has(:focus-visible) { outline: 2px solid blue; }
    `;
      const element = document.createElement(tag);
      element.className = `${className} selector-regression`;
      document.head.appendChild(style);
      document.body.appendChild(element);

      try {
        // nwsapi 2.2.23 incorrectly interpolated [] from :scope into the selector.
        expect(window.getComputedStyle(element).color).toBe('rgb(15, 23, 42)');
      } finally {
        element.remove();
        style.remove();
      }
    }
  );
});
