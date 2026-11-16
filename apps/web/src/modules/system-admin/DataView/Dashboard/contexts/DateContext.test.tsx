import React from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { type AxiosAdapter, type AxiosResponse } from 'axios';
import { DateProvider, useDateContext } from './DateContext';
import { useServiceVisitData } from '../../../hooks/useAdminApi';

type RequestWire = {
  url?: string;
  method?: string;
  data: string;
};

const clients: QueryClient[] = [];
const originalAdapter = axios.defaults.adapter;
let wires: RequestWire[] = [];
let changeRange:
  | ReturnType<typeof useDateContext>['updateDateRange']
  | undefined;

function RequestConsumer() {
  const context = useDateContext();
  useServiceVisitData();
  React.useEffect(() => {
    changeRange = context.updateDateRange;
  }, [context]);
  return <output>{context.dateState.range}</output>;
}

function mount() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, cacheTime: 0 } },
  });
  clients.push(client);
  return render(
    <QueryClientProvider client={client}>
      <DateProvider>
        <RequestConsumer />
      </DateProvider>
    </QueryClientProvider>
  );
}

function localToday() {
  const value = new Date();
  return [
    String(value.getFullYear()).padStart(4, '0'),
    String(value.getMonth() + 1).padStart(2, '0'),
    String(value.getDate()).padStart(2, '0'),
  ].join('-');
}

beforeEach(() => {
  wires = [];
  changeRange = undefined;
  const adapter: AxiosAdapter = (config) => {
    if (typeof config.data !== 'string') {
      throw new Error('Expected a serialized Axios request body');
    }
    wires.push({ url: config.url, method: config.method, data: config.data });
    // Observe the real serializer at the network boundary. Keep transport pending
    // without inventing a backend response or replacing the provider/query hooks.
    return new Promise<AxiosResponse<never>>(() => {
      // Leave transport pending; teardown clears the real query clients.
    });
  };
  axios.defaults.adapter = adapter;
});

afterEach(() => {
  try {
    cleanup();
  } finally {
    try {
      clients.splice(0).forEach((client) => client.clear());
    } finally {
      axios.defaults.adapter = originalAdapter;
      changeRange = undefined;
    }
  }
});

test('sends the normal Since 2000 preset calendar bounds', async () => {
  mount();
  await waitFor(() => expect(wires.length).toBeGreaterThan(0));
  const before = wires.length;
  await act(async () => {
    changeRange!('Since 2000');
  });
  await waitFor(() => expect(wires.length).toBeGreaterThan(before));
  const wire = wires[wires.length - 1];
  expect(wire.url).toBe('/api/v2/admin/service_visit_table');
  expect(wire.method).toBe('post');
  expect(JSON.parse(wire.data)).toEqual({
    begin_date: '2000-01-01',
    end_date: localToday(),
    type: 0,
  });
});

test('preserves the normal custom calendar dates in request bytes', async () => {
  mount();
  await waitFor(() => expect(wires.length).toBeGreaterThan(0));
  const before = wires.length;
  await act(async () => {
    // This literal is the real picker's normal YYYY-MM-DD range contract.
    changeRange!('2026-09-01 ~ 2026-09-15');
  });
  await waitFor(() => expect(wires.length).toBeGreaterThan(before));
  const wire = wires[wires.length - 1];
  expect(wire.url).toBe('/api/v2/admin/service_visit_table');
  expect(wire.method).toBe('post');
  expect(JSON.parse(wire.data)).toEqual({
    begin_date: '2026-09-01',
    end_date: '2026-09-15',
    type: 0,
  });
});
