import { act, renderHook } from '@testing-library/react';
import useTopicNavbarScroll from './useTopicNavbarScroll';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => `t:${key}` }),
}));

describe('useTopicNavbarScroll', () => {
  it('resolves the overview title through i18n, not a hardcoded English string', () => {
    jest.useFakeTimers();
    const card = document.createElement('div');
    card.id = 'topic_overview';
    card.className = 'base-card';
    card.getBoundingClientRect = () =>
      ({ top: 0, bottom: 100 }) as DOMRect;
    document.body.appendChild(card);
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 200,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useTopicNavbarScroll());
    act(() => {
      document.dispatchEvent(new Event('scroll'));
      jest.advanceTimersByTime(600);
    });

    expect(result.current.topicTitle).toBe('t:analyze:overview');
    expect(result.current.topicTitle).not.toBe('Overview');
    document.body.removeChild(card);
  });
});
