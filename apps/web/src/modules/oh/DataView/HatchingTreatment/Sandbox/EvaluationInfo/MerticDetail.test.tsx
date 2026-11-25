import React from 'react';
import { render, screen } from '@testing-library/react';
import { getContent, setRiskTag } from './MerticDetail';

describe('MerticDetail score -2 (the report does not involve the metric)', () => {
  it('renders the not-involved text instead of a risk', () => {
    render(<>{getContent({ score: -2 })}</>);

    expect(screen.getByText('此报告不涉及该指标')).toBeInTheDocument();
    expect(screen.queryByText(/风险/)).not.toBeInTheDocument();
  });

  it('does not render a risk tag', () => {
    expect(setRiskTag({ score: -2 }, false)).toBe('');
  });

  it('still renders a risk tag for a real low score', () => {
    render(<>{setRiskTag({ score: 2 }, false)}</>);

    expect(screen.getByText(/风险/)).toBeInTheDocument();
  });
});
