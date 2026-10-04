import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ParamsTableWithForm from './ParamsTableWithForm';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedAxios = axios as unknown as jest.Mock;

beforeAll(() => {
  // jsdom does not implement matchMedia; antd's responsive observer needs it
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('ParamsTableWithForm try-it request', () => {
  beforeEach(() => {
    mockedAxios.mockReset();
    mockedAxios.mockResolvedValue({ status: 200, data: {} });
  });

  it('sends the request to the selected mirror base URL', async () => {
    render(
      <ParamsTableWithForm
        method="GET"
        path="/api/v2/repos/{repo}"
        baseUrl="https://oss-compass.osslab-pku.org"
        params={[{ name: 'repo', required: true, type: 'string' }]}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/string \(required\)/i), {
      target: { value: 'github.com/oss-compass/compass-web' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'open_api:send_request' })
    );

    await waitFor(() => expect(mockedAxios).toHaveBeenCalledTimes(1));

    const config = mockedAxios.mock.calls[0][0];
    expect(config.url).toBe(
      'https://oss-compass.osslab-pku.org/api/v2/repos/github.com/oss-compass/compass-web'
    );
  });

  it('keeps the request path relative when no base URL is provided', async () => {
    render(
      <ParamsTableWithForm
        method="GET"
        path="/api/v2/repos/{repo}"
        params={[{ name: 'repo', required: true, type: 'string' }]}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/string \(required\)/i), {
      target: { value: 'gitee.com/oss-compass/compass-web' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'open_api:send_request' })
    );

    await waitFor(() => expect(mockedAxios).toHaveBeenCalledTimes(1));

    const config = mockedAxios.mock.calls[0][0];
    expect(config.url).toBe('/api/v2/repos/gitee.com/oss-compass/compass-web');
  });
});
