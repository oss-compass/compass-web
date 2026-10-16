import { CONFIRM_FALLBACK_URL, resolveAcceptUrl } from './acceptUrl';

const ORIGIN = 'https://oss-compass.org';

describe('resolveAcceptUrl', () => {
  it('keeps the accept url when it points at the same origin', () => {
    expect(
      resolveAcceptUrl(
        'https://oss-compass.org/users/accept_invitation/abc123',
        ORIGIN
      )
    ).toBe('/users/accept_invitation/abc123');
  });

  it('keeps the query string of the accept url', () => {
    expect(
      resolveAcceptUrl(
        'https://oss-compass.org/users/accept_invitation/abc123?next=1',
        ORIGIN
      )
    ).toBe('/users/accept_invitation/abc123?next=1');
  });

  it('keeps a root relative accept url', () => {
    expect(resolveAcceptUrl('/users/accept_invitation/abc123', ORIGIN)).toBe(
      '/users/accept_invitation/abc123'
    );
  });

  it('rejects an accept url on another origin', () => {
    expect(
      resolveAcceptUrl(
        'https://evil.example/users/accept_invitation/abc',
        ORIGIN
      )
    ).toBe(CONFIRM_FALLBACK_URL);
  });

  it('rejects a protocol relative accept url', () => {
    expect(resolveAcceptUrl('//evil.example/x', ORIGIN)).toBe(
      CONFIRM_FALLBACK_URL
    );
  });

  it('rejects a subdomain of the current origin', () => {
    expect(
      resolveAcceptUrl(
        'https://sub.oss-compass.org/users/accept_invitation/abc',
        ORIGIN
      )
    ).toBe(CONFIRM_FALLBACK_URL);
  });

  it('rejects a javascript: accept url', () => {
    expect(resolveAcceptUrl('javascript:alert(document.cookie)', ORIGIN)).toBe(
      CONFIRM_FALLBACK_URL
    );
    expect(resolveAcceptUrl(' JavaScript:alert(1)', ORIGIN)).toBe(
      CONFIRM_FALLBACK_URL
    );
  });

  it('rejects a data: accept url', () => {
    expect(resolveAcceptUrl('data:text/html,<script>1</script>', ORIGIN)).toBe(
      CONFIRM_FALLBACK_URL
    );
  });

  it('rejects an accept url using a non http(s) scheme on the same host', () => {
    expect(resolveAcceptUrl('ftp://oss-compass.org/x', ORIGIN)).toBe(
      CONFIRM_FALLBACK_URL
    );
  });

  it('rejects an unparsable accept url', () => {
    expect(resolveAcceptUrl('http://[', ORIGIN)).toBe(CONFIRM_FALLBACK_URL);
  });

  it('falls back when the accept url is missing or empty', () => {
    expect(resolveAcceptUrl(undefined, ORIGIN)).toBe(CONFIRM_FALLBACK_URL);
    expect(resolveAcceptUrl(null, ORIGIN)).toBe(CONFIRM_FALLBACK_URL);
    expect(resolveAcceptUrl('', ORIGIN)).toBe(CONFIRM_FALLBACK_URL);
    expect(resolveAcceptUrl({} as unknown as string, ORIGIN)).toBe(
      CONFIRM_FALLBACK_URL
    );
  });

  it('uses the first value when the query param is repeated', () => {
    expect(
      resolveAcceptUrl(
        [
          'https://oss-compass.org/users/accept_invitation/abc',
          'https://evil.example/',
        ],
        ORIGIN
      )
    ).toBe('/users/accept_invitation/abc');
    expect(
      resolveAcceptUrl(
        ['https://evil.example/', 'https://oss-compass.org/x'],
        ORIGIN
      )
    ).toBe(CONFIRM_FALLBACK_URL);
  });
});
