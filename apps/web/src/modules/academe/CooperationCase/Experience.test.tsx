jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@common/utils', () => ({
  toFixed: (n: number, d: number) => Number(n.toFixed(d)),
}));
jest.mock('./getData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import { render, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import getData from './getData';
import Experience from './Experience';

describe('Experience', () => {
  it('renders a 0% prediction as a result, not a fetch failure', async () => {
    // /api/beta/predict 返回 {"prediction":{"active":0}}（已归档仓库）——
    // 0 是成功结果。此前的 truthy 守卫把 0 当成获取失败显示错误信息。
    (getData as jest.Mock).mockResolvedValue({
      status: 200,
      data: { prediction: { active: 0 } },
    });
    const { container, findByText } = render(<Experience />);
    // Trigger the prediction
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'https://github.com/test/repo' } });
      const button = container.querySelector('button');
      if (button) fireEvent.click(button);
    }
    // Wait for the async result
    await act(async () => { await new Promise((r) => setTimeout(r, 100)); });
    // The result section should render (not the error)
    const hasError = container.textContent?.includes('failed_to_fetch_data');
    expect(hasError).toBeFalsy();
  });
});
