import { addDocsLinkLocale } from './DocLink';

describe('addDocsLinkLocale', () => {
  it('addLinkLocale', function () {
    const link = addDocsLinkLocale(
      '/docs/dimensions-define/productivity/',
      'zh'
    );
    expect(link).toEqual('/zh/docs/dimensions-define/productivity/');
  });
});
