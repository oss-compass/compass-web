import { act, render } from '@testing-library/react';
import ScoreConversion from './ScoreConversion';
import { chartUserSettingState } from '@modules/analyze/store';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('public/images/analyze/number-100.svg', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('public/images/analyze/number-1.svg', () => ({
  __esModule: true,
  default: () => null,
}));

describe('ScoreConversion', () => {
  beforeEach(() => {
    chartUserSettingState.onePointSys = false;
  });

  it('does not accumulate subscriptions across re-renders', async () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <ScoreConversion onePoint={false} onChange={onChange} />
    );
    rerender(<ScoreConversion onePoint={false} onChange={onChange} />);
    rerender(<ScoreConversion onePoint={false} onChange={onChange} />);
    rerender(<ScoreConversion onePoint={false} onChange={onChange} />);

    // valtio 的订阅回调经微任务通知（subscribeKey 未传 notifyInSync），
    // 需 flush 后断言。
    await act(async () => {
      chartUserSettingState.onePointSys = true;
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when the store value equals the current one', async () => {
    const onChange = jest.fn();
    render(<ScoreConversion onePoint={false} onChange={onChange} />);
    await act(async () => {
      chartUserSettingState.onePointSys = false;
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
