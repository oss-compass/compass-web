import isBrowser from './isBrowser';

/**
 * Window-like shape accepted by `readHashId`.
 *
 * It is intentionally structural instead of `Window` so callers and tests can
 * pass a minimal object, or `undefined`, without having to fake the whole DOM.
 * `Window` itself is assignable to this type because `Location.hash` is a
 * `string`.
 */
export type HashWindowLike = {
  location?: {
    hash?: string;
  } | null;
};

/**
 * Normalizes a raw `location.hash` value into the anchor id used by the UI.
 *
 * Hash links in the detail views may carry extra data after the anchor, for
 * example `#push?repo=oss-compass`. Only the segment before the first `?`
 * identifies the target card, and the leading `#` is never part of the id.
 *
 * Keeping this pure lets the initial render and the `hashchange` listener share
 * one implementation, so the parsed id cannot drift between the two paths.
 */
export const parseHashId = (rawHash?: string | null): string => {
  if (!rawHash) return '';
  const hash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;
  const questionIndex = hash.indexOf('?');
  return questionIndex >= 0 ? hash.slice(0, questionIndex) : hash;
};

/**
 * Reads the anchor id from a `window`-like object.
 *
 * The window is a parameter instead of being read from the global scope so the
 * helper stays easy to unit test, including the case where no window exists at
 * all.
 */
export const readHashId = (win?: HashWindowLike | null): string => {
  if (!win || !win.location) return '';
  return parseHashId(win.location.hash);
};

/**
 * SSR-safe accessor for the anchor id of the current page.
 *
 * During server-side rendering `window` is not defined, so reaching for
 * `window.location.hash` throws `ReferenceError: window is not defined` and
 * turns the whole page into a 500 response. Every current consumer of
 * `useHashchangeEvent` happens to render behind a `<NoSsr>` boundary, but the
 * hook lives in the shared `@common/hooks` folder: the SSR safety contract
 * belongs to the hook and its helpers instead of relying on every caller
 * remembering to wrap it.
 *
 * Returning an empty string on the server is safe because no client-only
 * markup is rendered there; the browser re-reads the real hash once the hook
 * runs on the client.
 */
export const getCurrentHashId = (): string =>
  isBrowser() ? readHashId(window) : '';
