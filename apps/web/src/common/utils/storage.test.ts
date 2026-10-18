import {
  storageGetResendEmailTime,
  storageGetToastError,
  storageSaveResendEmailTime,
  storageSetToastError,
} from './storage';

const throwingStorage = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('SecurityError');
  },
};

describe('storage helpers', () => {
  const originalStorage = Object.getOwnPropertyDescriptor(
    window,
    'sessionStorage'
  );

  afterEach(() => {
    if (originalStorage) {
      Object.defineProperty(window, 'sessionStorage', originalStorage);
    }
  });

  it('round-trips values when sessionStorage works', () => {
    storageSaveResendEmailTime('123');
    expect(storageGetResendEmailTime()).toBe('123');

    storageSetToastError('signin', 'denied');
    expect(storageGetToastError('signin')).toBe('denied');
  });

  it('does not throw when sessionStorage is blocked', () => {
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: throwingStorage,
    });

    expect(() => storageSaveResendEmailTime('123')).not.toThrow();
    expect(storageGetResendEmailTime()).toBeNull();
    expect(() => storageSetToastError('signin', 'denied')).not.toThrow();
    expect(storageGetToastError('signin')).toBeNull();
  });
});
