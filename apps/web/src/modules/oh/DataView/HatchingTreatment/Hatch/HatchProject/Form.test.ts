import { findReportCommitters } from './Form';

const makeReport = (
  codeUrl: string,
  accounts: string[]
): {
  id: number;
  codeUrl: string;
  tpcSoftwareSig: { sigCommitter: any[] };
} => ({
  id: Math.random(),
  codeUrl,
  tpcSoftwareSig: { sigCommitter: accounts.map((a) => ({ giteeAccount: a })) },
});

describe('findReportCommitters', () => {
  it('returns the committers of the report whose pathname exactly matches the selection', () => {
    const reports = [
      makeReport('https://github.com/acme/lib-extra', ['alice']),
      makeReport('https://github.com/acme/lib', ['bob', 'carol']),
    ];

    expect(findReportCommitters(reports, 'acme/lib')).toEqual('bob, carol');
  });

  it('does not let a longer repository path shadow the selected one regardless of order', () => {
    const reports = [
      makeReport('https://github.com/acme/lib', ['bob']),
      makeReport('https://github.com/acme/lib-extra', ['alice']),
    ];

    expect(findReportCommitters(reports, 'acme/lib')).toEqual('bob');
    expect(findReportCommitters(reports, 'acme/lib-extra')).toEqual('alice');
  });

  it('returns undefined when no report matches exactly', () => {
    const reports = [
      makeReport('https://github.com/acme/lib-extra', ['alice']),
    ];

    expect(findReportCommitters(reports, 'acme/other')).toBeUndefined();
  });

  it('returns undefined when the matched report has no committers', () => {
    const reports: any[] = [{ id: 1, codeUrl: 'https://github.com/acme/lib' }];

    expect(findReportCommitters(reports, 'acme/lib')).toBeUndefined();
  });
});
