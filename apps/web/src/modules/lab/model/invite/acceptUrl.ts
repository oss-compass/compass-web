export const CONFIRM_FALLBACK_URL = '/lab/model/my';

/**
 * Resolve the redirect target used by the invitation confirmation page.
 *
 * The invitation email is rendered by the backend as
 * `<host>/lab/model/invite/confirm?accept_url=<host>/users/accept_invitation/<token>`
 * (see `app/mailers/user_mailer.rb` in compass-web-service): the confirm page and
 * the accept URL are always generated from the same host, so a legitimate
 * `accept_url` is same-origin with the page that renders it. Any other value
 * (cross-origin, protocol-relative or a non-http(s) scheme) must not be used as
 * a navigation target, because the query string is fully controlled by whoever
 * writes the link. Those fall back to the "My Models" list instead.
 */
export const resolveAcceptUrl = (
  raw: string | string[] | undefined | null,
  currentOrigin: string
): string => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== 'string' || !value) {
    return CONFIRM_FALLBACK_URL;
  }

  let target: URL;
  try {
    target = new URL(value, currentOrigin);
  } catch {
    return CONFIRM_FALLBACK_URL;
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return CONFIRM_FALLBACK_URL;
  }

  if (target.origin !== currentOrigin) {
    return CONFIRM_FALLBACK_URL;
  }

  return `${target.pathname}${target.search}${target.hash}`;
};
