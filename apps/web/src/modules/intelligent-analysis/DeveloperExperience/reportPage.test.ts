import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import {
  getStaticPaths,
  getStaticProps,
} from '../../../pages/intelligent-analysis/experience/[experienceType]';
import { getServerSideProps } from '../../../pages/intelligent-analysis/[org]/experience/[experienceType]';

jest.mock('./ExperienceReportRoute', () => ({
  __esModule: true,
  default: () => null,
}));

it('prebuilds all report shells in both languages without runtime fallback', async () => {
  const result = await getStaticPaths({
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  });
  expect(result.fallback).toBe(false);
  expect(result.paths).toHaveLength(6);
  expect(result.paths).toContainEqual({
    params: { experienceType: 'issue-contribution' },
    locale: 'zh',
  });
});

it('keeps report selection out of the static shell', async () => {
  expect(
    await getStaticProps({ params: { experienceType: 'issue-contribution' } })
  ).toEqual({ props: { experienceType: 'issue-contribution' } });
  expect(
    await getStaticProps({ params: { experienceType: 'unknown' } })
  ).toEqual({ notFound: true });
});

it('preserves organization scope and unknown-report validation', async () => {
  const context = (params: { org: string; experienceType: string }) => {
    const req = Object.assign(new IncomingMessage(new Socket()), {
      cookies: {},
    });
    return {
      params,
      req,
      res: new ServerResponse(req),
      query: {},
      resolvedUrl: '/',
    };
  };
  expect(
    await getServerSideProps(
      context({ org: 'cann', experienceType: 'issue-contribution' })
    )
  ).toEqual({ props: { org: 'cann', experienceType: 'issue-contribution' } });
  expect(
    await getServerSideProps(
      context({ org: 'cann', experienceType: 'unknown' })
    )
  ).toEqual({ notFound: true });
});
