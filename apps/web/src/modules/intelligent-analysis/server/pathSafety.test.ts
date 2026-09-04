import { isSafePathSegment, resolveFileInsideDir } from './pathSafety';

describe('isSafePathSegment', () => {
  it('accepts ordinary dataset / user identifiers', () => {
    expect(isSafePathSegment('CANN')).toBe(true);
    expect(isSafePathSegment('github:alice')).toBe(true);
    expect(isSafePathSegment('张 三')).toBe(true);
    expect(isSafePathSegment('model.v2')).toBe(true);
  });

  it('rejects empty / non-string values', () => {
    expect(isSafePathSegment('')).toBe(false);
    expect(isSafePathSegment(undefined)).toBe(false);
    expect(isSafePathSegment(null)).toBe(false);
    expect(isSafePathSegment(123)).toBe(false);
  });

  it('rejects path separators and traversal segments', () => {
    expect(isSafePathSegment('..')).toBe(false);
    expect(isSafePathSegment('../../etc')).toBe(false);
    expect(isSafePathSegment('a/b')).toBe(false);
    expect(isSafePathSegment('a\\b')).toBe(false);
    expect(isSafePathSegment('..\\..\\secret')).toBe(false);
  });
});

describe('resolveFileInsideDir', () => {
  const dir = '/srv/compass/public/test/intelligent-analysis-new/CANN';

  it('resolves ordinary file names inside the dir', () => {
    expect(resolveFileInsideDir(dir, 'alice_main.json')).toBe(
      dir + '/alice_main.json'
    );
    expect(resolveFileInsideDir(dir + '/', 'alice.json')).toBe(
      dir + '/alice.json'
    );
  });

  it('returns null when the resolved path escapes the dir', () => {
    expect(resolveFileInsideDir(dir, '../../secret.json')).toBeNull();
    expect(resolveFileInsideDir(dir, '/etc/passwd.json')).toBeNull();
    expect(resolveFileInsideDir(dir, '..')).toBeNull();
  });
});
