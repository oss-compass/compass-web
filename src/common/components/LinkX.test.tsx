import { addLinkLocale } from './LinkX';

describe('LinkX', () => {
  it('addLinkLocale', function () {
    const link = addLinkLocale('/docs/dimensions-define/productivity/', 'zh');
    expect(link).toEqual('/docs/zh/dimensions-define/productivity/');
  });
});
