export function sleep(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

export const getBodyScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  );
};

/**
 * Parse a JSON string without throwing on malformed input.
 * Useful for values coming from URL query parameters, which are
 * user-controlled and may be truncated or hand-edited.
 */
export const safeJsonParse = <T>(raw: unknown, fallback: T): T => {
  if (typeof raw !== 'string') {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};
