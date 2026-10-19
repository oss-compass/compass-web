import { buildMyReportsQuery } from './myReportsQuery';

describe('buildMyReportsQuery', () => {
  it('keeps column filters next to the forced current-user condition', () => {
    const query = {
      page: 1,
      per: 10,
      filterOpts: [
        { type: 'name', values: ['compass'] },
        { type: 'code_url', values: ['github.com/oss-compass'] },
      ],
      sortOpts: null,
    };

    const result = buildMyReportsQuery(query, 'chen');

    expect(result.filterOpts).toEqual([
      { type: 'user', values: ['chen'] },
      { type: 'name', values: ['compass'] },
      { type: 'code_url', values: ['github.com/oss-compass'] },
    ]);
  });

  it('works when the table state has no column filters yet', () => {
    const result = buildMyReportsQuery(
      { page: 2, per: 20, filterOpts: [], sortOpts: null },
      'chen'
    );

    expect(result.filterOpts).toEqual([{ type: 'user', values: ['chen'] }]);
    expect(result.reportTypeList).toEqual([0]);
    expect(result.page).toBe(2);
  });

  it('drops a user filter picked through the applicant column in favour of the forced current user', () => {
    const query = {
      page: 1,
      per: 10,
      filterOpts: [{ type: 'user', values: ['someone-else'] }],
      sortOpts: null,
    };

    const result = buildMyReportsQuery(query, 'chen');

    expect(result.filterOpts).toEqual([{ type: 'user', values: ['chen'] }]);
  });

  it('preserves the remaining table state', () => {
    const result = buildMyReportsQuery(
      {
        page: 3,
        per: 50,
        filterOpts: [],
        sortOpts: { type: 'name', direction: 'asc' },
      },
      'chen'
    );

    expect(result.page).toBe(3);
    expect(result.per).toBe(50);
    expect(result.sortOpts).toEqual({ type: 'name', direction: 'asc' });
  });
});
