import transSummaryToAxis from './transSummaryToAxis';

describe('transSummaryToAxis', () => {
  const xAxis = ['2024-01-01', '2024-02-01'];

  const buildSummary = (rows: any[]) => ({
    summaryActivity: rows,
  });

  it('maps mean / median values onto the x axis', () => {
    const data = buildSummary([
      {
        grimoireCreationDate: '2024-01-01',
        updatedSince: { mean: 1.5, median: 1 },
      },
      {
        grimoireCreationDate: '2024-02-01',
        updatedSince: { mean: 3, median: 2.25 },
      },
    ]);

    expect(
      transSummaryToAxis(data as any, xAxis, 'summaryActivity.updatedSince')
    ).toEqual({
      summaryMean: [1.5, 3],
      summaryMedian: [1, 2.25],
    });
  });

  it('renders "-" for months without data', () => {
    const data = buildSummary([
      {
        grimoireCreationDate: '2024-01-01',
        updatedSince: { mean: 1.5, median: 1 },
      },
    ]);

    expect(
      transSummaryToAxis(data as any, xAxis, 'summaryActivity.updatedSince')
    ).toEqual({
      summaryMean: [1.5, '-'],
      summaryMedian: [1, '-'],
    });
  });

  it('does not throw when the stat object is null (allowed by the schema)', () => {
    const data = buildSummary([
      { grimoireCreationDate: '2024-01-01', updatedSince: null },
      {
        grimoireCreationDate: '2024-02-01',
        updatedSince: { mean: 3, median: 2 },
      },
    ]);

    expect(
      transSummaryToAxis(data as any, xAxis, 'summaryActivity.updatedSince')
    ).toEqual({
      summaryMean: ['-', 3],
      summaryMedian: ['-', 2],
    });
  });

  it('returns null summary when data is null', () => {
    expect(
      transSummaryToAxis(null, xAxis, 'summaryActivity.updatedSince')
    ).toEqual({
      summaryMean: ['-', '-'],
      summaryMedian: ['-', '-'],
    });
  });
});
