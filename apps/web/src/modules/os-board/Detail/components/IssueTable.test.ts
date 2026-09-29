import { resetTablePagination } from './tablePagination';

describe('resetTablePagination', () => {
  it('returns to the first page without dropping table state', () => {
    const filterOpts = [{ type: 'state', values: ['open'] }];
    const sortOpts = { type: 'created_at', direction: 'desc' as const };

    expect(
      resetTablePagination({
        pagination: { current: 3, pageSize: 20, total: 45 },
        filterOpts,
        sortOpts,
      })
    ).toEqual({
      pagination: { current: 1, pageSize: 20, total: 45 },
      filterOpts,
      sortOpts,
    });
  });

  it('initializes pagination when it was not set', () => {
    expect(resetTablePagination({ filterOpts: [] })).toEqual({
      pagination: { current: 1 },
      filterOpts: [],
    });
  });
});
