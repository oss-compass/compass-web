import { verifyEmail, getEmail } from './utils';

describe('verifyEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(verifyEmail('test@example.com')).toBe(true);
    expect(verifyEmail('john.doe@example.com')).toBe(true);
    expect(verifyEmail('jane_doe123@example.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(verifyEmail('test@example')).toBe(false);
    expect(verifyEmail('john.doe@example')).toBe(false);
    expect(verifyEmail('jane_doe123@example')).toBe(false);
    expect(verifyEmail('invalid')).toBe(false);
  });

  it('should support multiple email addresses separated by commas', () => {
    expect(
      verifyEmail('test1@example.com,test2@example.com,test3@example.com')
    ).toBe(true);
    expect(verifyEmail('test1@example.com,invalid,test2@example.com')).toBe(
      false
    );
  });

  it('should support multiple email addresses separated by Chinese commas', () => {
    expect(
      verifyEmail('test1@example.com，test2@example.com，test3@example.com')
    ).toBe(true);
    expect(verifyEmail('test1@example.com，invalid，test2@example.com')).toBe(
      false
    );
  });
});

describe('getEmail', () => {
  it('should return an array with a single email address', () => {
    expect(getEmail('test@example.com')).toEqual(['test@example.com']);
    expect(getEmail('john.doe@example.com')).toEqual(['john.doe@example.com']);
    expect(getEmail('jane_doe123@example.com')).toEqual([
      'jane_doe123@example.com',
    ]);
  });

  it('should split multiple email addresses separated by commas', () => {
    expect(
      getEmail('test1@example.com,test2@example.com,test3@example.com')
    ).toEqual(['test1@example.com', 'test2@example.com', 'test3@example.com']);
    expect(getEmail('test1@example.com,invalid,test2@example.com')).toEqual([
      'test1@example.com',
      'invalid',
      'test2@example.com',
    ]);
  });

  it('should split multiple email addresses separated by Chinese commas', () => {
    expect(
      getEmail('test1@example.com，test2@example.com，test3@example.com')
    ).toEqual(['test1@example.com', 'test2@example.com', 'test3@example.com']);
    expect(getEmail('test1@example.com，invalid，test2@example.com')).toEqual([
      'test1@example.com',
      'invalid',
      'test2@example.com',
    ]);
  });
});
