import { fillHttps } from './url';

describe('fillHttps', () => {
  it('adds the scheme only when the url has none', () => {
    expect(fillHttps('github.com/cli/cli')).toEqual(
      'https://github.com/cli/cli'
    );
    expect(fillHttps('github.com/cli/cli/')).toEqual(
      'https://github.com/cli/cli'
    );
    expect(fillHttps('https://github.com/cli/cli')).toEqual(
      'https://github.com/cli/cli'
    );
  });

  it('keeps an http url instead of stacking a second scheme', () => {
    expect(fillHttps('http://github.com/cli/cli')).toEqual(
      'http://github.com/cli/cli'
    );
  });
});
