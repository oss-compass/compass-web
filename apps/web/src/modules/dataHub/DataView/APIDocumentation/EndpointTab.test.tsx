jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'zh' } }),
}));
jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('./DescriptionContent', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./ResponsesViewer', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('./ParamsTableWithForm', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

import { render } from '@testing-library/react';
import axios from 'axios';
import EndpointTab from './EndpointTab';
import ParamsTableWithForm from './ParamsTableWithForm';

const endpoint = {
  id: 'ep-1',
  method: 'GET',
  path: '/api/v2/metrics/community',
  summary: 'Community metrics',
  description: '',
  parameters: [],
  responses: {},
};

describe('EndpointTab', () => {
  it('passes the selected data source origin to the test form', () => {
    // 数据源选择器选中的 origin 是测试请求的目标——此前 ParamsTableWithForm
    // 只收到相对路径，axios 解析到页面 origin 而非选中的数据源。
    render(<EndpointTab endpoint={endpoint} />);
    expect(ParamsTableWithForm).toHaveBeenCalledWith(
      expect.objectContaining({
        baseUrl: 'https://oss-compass.isrc.ac.cn',
        path: '/api/v2/metrics/community',
        method: 'GET',
      }),
      expect.anything()
    );
  });
});
