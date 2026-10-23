/** @jest-environment jsdom */

import React from 'react';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import type {
  TpcSoftwareSelectionReportQuery,
  TpcSoftwareSelectionReportRowQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import english from '../../../../../../../i18n/en/os-selection.json';
import chinese from '../../../../../../../i18n/zh/os-selection.json';
import EvaluationDownLoad from './EvaluationDownLoad';

const reportName = 'CSV "sample", project';
const dcoRaw = '{\n  "commitCount": 3,\n  "commitDcoCount": 2\n}';

const createReport = (): NonNullable<
  TpcSoftwareSelectionReportQuery['tpcSoftwareSelectionReport']
> => ({
  id: 7,
  name: reportName,
  shortCode: 'csv-report',
  userId: 5,
  tpcSoftwareReportMetric: {
    id: 8,
    complianceLicense: 10,
    complianceLicenseCompatibility: 10,
    ecologyPatentRisk: 10,
    complianceDco: 8,
    complianceDcoDetail: { commitCount: 3, commitDcoCount: 2 },
    ecologyDependencyAcquisition: 10,
    ecologyCodeMaintenance: 10,
    ecologyCommunitySupport: 10,
    ecologyAdoptionAnalysis: 10,
    ecologySoftwareQuality: 10,
    lifecycleVersionLifecycle: 10,
    securityBinaryArtifact: 10,
    securityVulnerability: 10,
    securityVulnerabilityResponse: 10,
  },
});

// Only fields selected by the real generated report-row query cross HTTP.
const rawResult: TpcSoftwareSelectionReportRowQuery = {
  tpcSoftwareSelectionReport: {
    id: 7,
    tpcSoftwareReportMetricRaw: {
      id: 9,
      codeUrl: null,
      complianceLicenseRaw: 'MIT',
      complianceDcoRaw: dcoRaw,
      complianceLicenseCompatibilityRaw: null,
      compliancePackageSigRaw: null,
      ecologyAdoptionAnalysisRaw: null,
      ecologyCodeMaintenanceRaw: null,
      ecologyCommunitySupportRaw: null,
      ecologyDependencyAcquisitionRaw: null,
      ecologyPatentRiskRaw: null,
      ecologySoftwareQualityRaw: null,
      ecologyAdaptationMethodRaw: null,
      lifecycleVersionLifecycleRaw: null,
      upstreamCollaborationStrategyRaw: null,
      lifecycleVersionNormalizationRaw: null,
      lifecycleVersionNumberRaw: null,
      securityBinaryArtifactRaw: null,
      securityHistoryVulnerabilityRaw: null,
      securityVulnerabilityDisclosureRaw: null,
      securityVulnerabilityRaw: null,
      securityVulnerabilityResponseRaw: null,
    },
  },
};

// Read the quoted CSV cells, including escaped quotes and embedded newlines.
// This observes the download instead of calling or replacing its formatter.
const readCsv = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  const fields = /"((?:[^"]|"")*)"([,\n]|$)/g;
  let position = 0;
  let match: RegExpExecArray | null;
  while ((match = fields.exec(csv)) !== null) {
    expect(match.index).toBe(position);
    row.push(match[1].replace(/""/g, '"'));
    position = fields.lastIndex;
    if (match[2] !== ',') {
      rows.push(row);
      row = [];
    }
  }
  expect(position).toBe(csv.length);
  expect(row).toEqual([]);
  return rows;
};

type WireRequest = { method?: string; url?: string; body: string };
type Download = { href: string; filename: string };
let requests: WireRequest[] = [];
let downloads: Download[] = [];
let endpoint: string;
let queryClient: QueryClient | undefined;

const server = createServer((request, response) => {
  response.setHeader(
    'Access-Control-Allow-Origin',
    request.headers.origin || '*'
  );
  response.setHeader('Access-Control-Allow-Headers', 'content-type');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Vary', 'Origin');
  response.setHeader('Connection', 'close');
  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }
  const chunks: Buffer[] = [];
  request.on('data', (chunk: Buffer) => chunks.push(chunk));
  request.on('end', () => {
    requests.push({
      method: request.method,
      url: request.url,
      body: Buffer.concat(chunks).toString('utf8'),
    });
    if (request.method !== 'POST' || request.url !== '/api/graphql') {
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ data: rawResult }));
  });
});

beforeAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.removeListener('error', reject);
      resolve();
    });
  });
  endpoint = 'http://127.0.0.1:' + (server.address() as AddressInfo).port;
});

beforeEach(() => {
  requests = [];
  downloads = [];
  client.setEndpoint(endpoint + '/api/graphql');
  // The only spy is the download boundary; the real anchor supplies both values.
  jest
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push({ href: this.href, filename: this.download });
    });
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // Each case owns its client; leave no inactive-query GC timer behind.
        cacheTime: 0,
      },
    },
  });
});

afterEach(() => {
  try {
    cleanup();
  } finally {
    try {
      queryClient?.clear();
    } finally {
      client.setEndpoint('/api/graphql');
      jest.restoreAllMocks();
      queryClient = undefined;
    }
  }
});

afterAll(async () => {
  if (server.listening) {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

describe('MyReports CSV locale metadata', () => {
  it.each([
    { language: 'en', locale: english },
    { language: 'zh', locale: chinese },
  ])(
    'downloads localized metadata in $language',
    async ({ language, locale }) => {
      const i18n = createInstance();
      await i18n.use(initReactI18next).init({
        lng: language,
        fallbackLng: false,
        defaultNS: 'os-selection',
        ns: ['os-selection'],
        resources: {
          en: { 'os-selection': english },
          zh: { 'os-selection': chinese },
        },
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });
      if (!queryClient) throw new Error('QueryClient was not initialized');
      render(
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <EvaluationDownLoad item={createReport()} />
          </QueryClientProvider>
        </I18nextProvider>
      );

      fireEvent.click(screen.getByRole('img', { name: 'download' }));
      await waitFor(() => expect(downloads).toHaveLength(1));
      await screen.findByRole('img', { name: 'download' });

      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe('POST');
      expect(requests[0].url).toBe('/api/graphql');
      const request = JSON.parse(requests[0].body);
      expect(request.variables).toEqual({ shortCode: 'csv-report' });
      expect(request.query).toContain(
        'query tpcSoftwareSelectionReportRow($shortCode: String!)'
      );
      expect(request.query).toContain('tpcSoftwareReportMetricRaw');
      expect(request.query).toContain('complianceDcoRaw');

      const download = downloads[0];
      const prefix = 'data:text/csv;charset=utf-8,';
      expect(download.href.startsWith(prefix)).toBe(true);
      const csv = decodeURIComponent(download.href.slice(prefix.length));
      expect(csv.charCodeAt(0)).toBe(0xfeff);
      expect(download.filename).toBe(
        locale.mertic_detail.download_report.title_suffix.replace(
          '{{name}}',
          reportName
        ) + '.csv'
      );
      const rows = readCsv(csv.slice(1));
      expect(rows).toHaveLength(14);
      rows.forEach((row) => expect(row).toHaveLength(8));
      const header = locale.mertic_detail.download_report.header;
      expect(rows[0]).toEqual([
        header.metric_name,
        header.dimension,
        header.score,
        header.risk,
        header.risk_detail,
        header.risk_detail_raw,
        header.risk_importance,
        header.metric_significance,
      ]);

      // These existing score/detail/raw and escaping controls precede the target.
      const metrics = locale.all_hatch_metric_data;
      expect(rows[1].slice(2, 6)).toEqual([
        '10',
        metrics.risk_content.none,
        locale.mertic_detail.download_report.no_risk,
        'MIT',
      ]);
      expect(rows[4].slice(2, 6)).toEqual([
        '8',
        metrics.score8.complianceDco,
        metrics.dco.detail
          .replace('{{commitCount}}', '3')
          .replace('{{commitDcoCount}}', '2'),
        dcoRaw,
      ]);
      expect(csv).toContain(
        '"{\n  ""commitCount"": 3,\n  ""commitDcoCount"": 2\n}"'
      );

      // Independent expectations come from the real pinned resources, not metric objects.
      expect([rows[1][0], rows[1][1], rows[1][6], rows[1][7]]).toEqual([
        metrics.metric_name.license_inclusion,
        metrics.dimension.legal_compliance,
        metrics.risk_importance.high,
        metrics.compliance_license.significance,
      ]);
      expect([rows[4][0], rows[4][1], rows[4][6], rows[4][7]]).toEqual([
        metrics.metric_name.dco,
        metrics.dimension.legal_compliance,
        metrics.risk_importance.medium,
        metrics.dco.significance,
      ]);
      expect(csv).not.toContain('"undefined"');
    }
  );
});
