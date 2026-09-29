import getLocale from './getLocale';

const setLocaleCookie = (value: string) => {
  document.cookie = `locale=${value}; path=/`;
};

describe('utils getLocale', () => {
  beforeEach(() => {
    // drop the locale cookie so each case starts from a clean state
    document.cookie = 'locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  describe('with browser cookies', () => {
    it('returns the locale when the cookie is a supported language', () => {
      setLocaleCookie('zh');
      expect(getLocale()).toBe('zh');

      setLocaleCookie('en');
      expect(getLocale()).toBe('en');
    });

    it('falls back to en when the locale cookie is missing', () => {
      expect(getLocale()).toBe('en');
    });

    it('falls back to en when the cookie value is not a supported language', () => {
      setLocaleCookie('fr');
      expect(getLocale()).toBe('en');

      setLocaleCookie('zh-CN');
      expect(getLocale()).toBe('en');

      setLocaleCookie('EN');
      expect(getLocale()).toBe('en');
    });

    it('falls back to en when the cookie value is empty', () => {
      setLocaleCookie('');
      expect(getLocale()).toBe('en');
    });
  });

  describe('with request cookies', () => {
    it('returns the locale when the request cookie is a supported language', () => {
      expect(getLocale({ locale: 'zh' })).toBe('zh');
      expect(getLocale({ locale: 'en' })).toBe('en');
    });

    it('falls back to en when the request cookie value is not a supported language', () => {
      expect(getLocale({ locale: 'fr' })).toBe('en');
    });

    it('falls back to en when the locale request cookie is missing', () => {
      expect(getLocale({})).toBe('en');
    });
  });
});
