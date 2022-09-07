export const parseUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (e) {
    return null;
  }
};
