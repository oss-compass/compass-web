import React from 'react';
import { render, screen } from '@testing-library/react';
import { RerunResultTable } from './RerunJobListModal';
import type { IssuePainRerunJob } from '../types';

const originalMatchMedia = window.matchMedia;
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});
afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

const job: IssuePainRerunJob = {
  jobId: 'job',
  community: 'cann/demo',
  platform: 'gitcode',
  period: 'period',
  reportKey: 'report',
  trackingKey: 'pain',
  affectedTrackingKeys: ['pain'],
  mode: 'retest',
  issueNumbers: ['29'],
  taskStatus: 'succeeded',
  applyStatus: 'applied',
  progress: 100,
  operator: 'test',
  createdAt: '2026-11-06T00:00:00Z',
  eta: { minMinutes: 4, maxMinutes: 15, earliestAt: '', latestAt: '' },
  results: [
    {
      trackingKey: 'pain',
      issueNumber: '29',
      stageId: 'I1',
      metricCodes: ['sub_triage_owner_clarity'],
      metricLabels: ['分流与责任明确度'],
      painTitle: '责任悬空',
      result: 'still_present',
      beforeFinalScore: 42.9,
      afterFinalScore: 51.4,
      metricResults: [
        {
          code: 'sub_triage_owner_clarity',
          name: '分流与责任明确度',
          beforeScore: 0,
          afterScore: 60,
          afterReason: '已指派，但责任人没有实质承接',
        },
      ],
    },
  ],
};

it('shows which pain failed and its metric score and reason despite the overall improvement', () => {
  render(<RerunResultTable job={job} />);
  expect(screen.getByText('责任悬空')).toBeInTheDocument();
  expect(screen.getByText('0 → 60')).toBeInTheDocument();
  expect(screen.getByText('复测未通过')).toBeInTheDocument();
  expect(screen.getByText('已指派，但责任人没有实质承接')).toBeInTheDocument();
});

it('does not invent missing historical scoring reasons', () => {
  render(
    <RerunResultTable
      job={{
        ...job,
        results: [{ ...job.results[0], metricResults: undefined }],
      }}
    />
  );
  expect(screen.getAllByText('历史记录未保存')).toHaveLength(2);
});

it('separates passed and failed pain results for the same Issue', () => {
  render(
    <RerunResultTable
      job={{
        ...job,
        results: [
          ...job.results,
          {
            ...job.results[0],
            trackingKey: 'passed-pain',
            painTitle: '输入不完整',
            result: 'resolved',
            metricResults: [
              {
                code: 'sub_input_quality',
                name: '输入质量',
                beforeScore: 20,
                afterScore: 100,
                afterReason: '输入内容已完整',
              },
            ],
          },
        ],
      }}
    />
  );
  expect(screen.getByText('复测通过')).toBeInTheDocument();
  expect(screen.getByText('复测未通过')).toBeInTheDocument();
  expect(screen.getByText('复测通过')).toBeInTheDocument();
  expect(screen.getByText('输入不完整')).toBeInTheDocument();
  expect(screen.queryByText('输入内容已完整')).not.toBeInTheDocument();
  expect(screen.getByText('已指派，但责任人没有实质承接')).toBeInTheDocument();
});
