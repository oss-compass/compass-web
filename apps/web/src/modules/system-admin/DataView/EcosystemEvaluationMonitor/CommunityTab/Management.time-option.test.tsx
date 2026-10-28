import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, {
  AxiosHeaders,
  type AxiosAdapter,
  type AxiosResponse,
} from 'axios';
import CommunityManagement from './Management';
import type {
  CommunityListResponse,
  UpdateOverviewResponse,
} from '../../../hooks/useEcosystemApi';

const LIST_URL = '/api/v2/project_server/community_list';
const OVERVIEW_URL = '/api/v2/project_server/project_platform_update_count';

type Wire = {
  url?: string;
  method?: string;
  data: string;
};

const originalAdapter = axios.defaults.adapter;
let client: QueryClient;
let wires: Wire[];

// Controlled successful transport only. These are the complete ordinary empty
// shapes declared by the genuine frontend hooks, not a replacement producer or
// a claim about live backend filtering semantics.
const emptyList: CommunityListResponse = {
  items: [],
  total_count: 0,
  current_page: 1,
  per_page: 20,
  total_pages: 0,
};
const emptyOverview: UpdateOverviewResponse = {
  within_1m: 0,
  over_1m: 0,
  over_3m: 0,
  over_6m: 0,
  over_12m: 0,
};

beforeEach(() => {
  wires = [];
  client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0 },
      mutations: { retry: false },
    },
  });
  const adapter: AxiosAdapter = async (config) => {
    if (typeof config.data !== 'string') {
      throw new Error('Expected real Axios JSON serialization');
    }
    const wire: Wire = {
      url: config.url,
      method: config.method,
      data: config.data,
    };
    wires.push(wire);
    let data: CommunityListResponse | UpdateOverviewResponse;
    if (config.url === LIST_URL) {
      data = emptyList;
    } else if (config.url === OVERVIEW_URL) {
      data = emptyOverview;
    } else {
      throw new Error(
        'Unexpected endpoint; no mutation is allowed: ' + config.url
      );
    }
    const response: AxiosResponse<
      CommunityListResponse | UpdateOverviewResponse
    > = {
      data,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config,
    };
    return response;
  };
  axios.defaults.adapter = adapter;
});

afterEach(() => {
  try {
    expect(
      wires.every((wire) => wire.url === LIST_URL || wire.url === OVERVIEW_URL)
    ).toBe(true);
  } finally {
    try {
      cleanup();
    } finally {
      try {
        client.clear();
      } finally {
        axios.defaults.adapter = originalAdapter;
      }
    }
  }
});

function listWires() {
  return wires.filter((wire) => wire.url === LIST_URL);
}

async function waitForListIdle() {
  // Only test-owned inactive cache retention is zero. The genuine hook's staleTime,
  // query key, request builder and active request are not replaced or invalidated.
  // This also ensures a later one-month selection emits an observable real POST
  // instead of merely reusing the fresh default/all query cache.
  await waitFor(() => {
    const queries = client
      .getQueryCache()
      .getAll()
      .filter((query) => query.queryKey[0] === 'communityList');
    expect(queries).toHaveLength(1);
    expect(queries[0].state.fetchStatus).toBe('idle');
  });
}

async function mountManagement() {
  render(
    <QueryClientProvider client={client}>
      <CommunityManagement />
    </QueryClientProvider>
  );
  await waitFor(() => expect(listWires().length).toBeGreaterThan(0));
  await waitForListIdle();
  const wire = listWires()[listWires().length - 1];
  expect(wire.method).toBe('post');
  expect(JSON.parse(wire.data)).toEqual({ page: 1, per_page: 20 });
}

async function chooseTime(label: string) {
  const comboboxes = screen.getAllByRole('combobox');
  // Source order is platform first, then update-time, then table pagination.
  const input = comboboxes[1];
  if (!input) throw new Error('The real update-time Select was not mounted');
  const root = input.closest('.ant-select');
  if (!(root instanceof HTMLElement))
    throw new Error('Missing genuine Select root');
  fireEvent.mouseDown(input);
  const option = await screen.findByText(label, {
    selector: '.ant-select-item-option-content',
    exact: true,
  });
  fireEvent.click(option);
  await waitFor(() => {
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(
      within(root).getByText(label, {
        selector: '.ant-select-selection-item',
        exact: true,
      })
    ).toBeTruthy();
  });
}

async function requestAfterSelection(label: string) {
  const before = listWires().length;
  await chooseTime(label);
  await waitFor(() => expect(listWires().length).toBeGreaterThan(before));
  await waitForListIdle();
  const wire = listWires()[listWires().length - 1];
  expect(wire.url).toBe(LIST_URL);
  expect(wire.method).toBe('post');
  return wire;
}

test('preserves default/all and the other actual time-option request controls', async () => {
  await mountManagement();
  const controls = [
    { label: '超过 1 个月', body: { page: 1, per_page: 20, time_type: 1 } },
    { label: '超过 3 个月', body: { page: 1, per_page: 20, time_type: 3 } },
    { label: '超过半年', body: { page: 1, per_page: 20, time_type: 6 } },
    { label: '超过 1 年', body: { page: 1, per_page: 20, time_type: 12 } },
    { label: '全部时间', body: { page: 1, per_page: 20 } },
  ];
  for (const control of controls) {
    const wire = await requestAfterSelection(control.label);
    expect(JSON.parse(wire.data)).toEqual(control.body);
  }
});

test('retains the existing numeric filter for the actual visible one-month option', async () => {
  await mountManagement();
  const primer = await requestAfterSelection('超过 3 个月');
  expect(JSON.parse(primer.data)).toEqual({
    page: 1,
    per_page: 20,
    time_type: 3,
  });
  // The earlier all/default query is now inactive and gone through normal cache
  // retention, so this observes the genuine current hook's request rather than
  // inferring a new request from a cached result or injecting a select value.
  const wire = await requestAfterSelection('1 个月内');
  expect(JSON.parse(wire.data)).toEqual({
    page: 1,
    per_page: 20,
    time_type: 1,
  });
});
