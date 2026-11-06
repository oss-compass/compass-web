import type { ParsedUrlQuery } from 'querystring';
import type { StatusVerifyQuery } from '@oss-compass/graphql';
import { compareIdsSplit } from '@common/utils/links';
import { getPathname } from '@common/utils/url';

type VerifiedReport = StatusVerifyQuery['analysisStatusVerify'];

// This module is used only by getServerSideProps. Never derive the backend URL
// from request headers or report labels, or forward the visitor's credentials.
export default async function getReportMetadata(query: ParsedUrlQuery) {
  const slugs = Array.isArray(query.slugs) ? query.slugs[0] : query.slugs;
  const shortCodes = compareIdsSplit(slugs);
  const labels = Array.isArray(query.label) ? query.label : [query.label];
  const values = shortCodes.length
    ? shortCodes
    : Array.from(
        new Set(
          labels.filter(
            (label): label is string =>
              typeof label === 'string' && Boolean(label) && /^\S*$/.test(label)
          )
        )
      );

  if (!values.length || !process.env.API_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const endpoint = new URL('/api/graphql', process.env.API_URL);
    if (!['http:', 'https:'].includes(endpoint.protocol)) return null;

    const argument = shortCodes.length ? 'shortCode' : 'label';
    const variables = Object.fromEntries(
      values.map((value, index) => [`value${index}`, value])
    );
    // Alias names contain only indices; all URL input is passed as variables.
    // A comparison needs one bounded HTTP request rather than one per report.
    const definitions = values.map((_, index) => `$value${index}: String!`);
    const fields = values.map(
      (_, index) =>
        `report${index}: analysisStatusVerify(${argument}: $value${index}) {
          label level status
        }`
    );
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query reportMetadata(${definitions.join(', ')}) {
          ${fields.join('\n')}
        }`,
        variables,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok) return null;

    const result: {
      data?: Record<string, VerifiedReport | null>;
      errors?: unknown[];
    } = await response.json();
    if (!result.data || result.errors?.length) return null;

    // Match the public report's status filter and display names on the client.
    const names = values
      .map((_, index) => result.data?.[`report${index}`])
      .filter(
        (report): report is VerifiedReport =>
          typeof report?.label === 'string' &&
          Boolean(report.label) &&
          ['pending', 'progress', 'success'].includes(report.status || '')
      )
      .map((report) =>
        report.level === 'repo' ? getPathname(report.label!) : report.label!
      )
      .filter(Boolean);

    return names.length
      ? {
          title: `OSS Compass | ${names.join(' vs ')}`,
          keywords: names.join(','),
        }
      : null;
  } catch {
    // Metadata must never turn an otherwise available report into a 500 page.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
