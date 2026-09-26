import React, { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { chartUserSettingState } from '@modules/analyze/store/chartUserSetting';
import en from '../../../../../i18n/en/analyze.json';
import zh from '../../../../../i18n/zh/analyze.json';
import ChartDisplaySetting from './ChartDisplaySetting';

jest.mock('next-i18next', () => ({
  useTranslation: jest.requireActual('react-i18next').useTranslation,
}));
jest.mock('@modules/analyze/store', () =>
  jest.requireActual('@modules/analyze/store/chartUserSetting')
);
jest.mock('public/images/analyze/average.svg', () => 'svg');
jest.mock('public/images/analyze/median.svg', () => 'svg');
jest.mock('public/images/analyze/number-100.svg', () => 'svg');
jest.mock('public/images/analyze/number-1.svg', () => 'svg');
jest.mock('public/images/analyze/y-scale.svg', () => 'svg');

const defaults = {
  showAvg: false,
  showMedian: false,
  onePointSys: false,
  repoType: 'software-artifact' as const,
  yAxisScale: true,
};

describe.each([
  ['en', en],
  ['zh', zh],
] as const)('chart display toggles (%s)', (language, messages) => {
  const i18n = createInstance();

  beforeAll(async () => {
    await i18n.init({
      lng: language,
      resources: { [language]: { analyze: messages } },
      defaultNS: 'analyze',
      interpolation: { escapeValue: false },
    });
  });

  beforeEach(async () => {
    await act(async () => {
      Object.assign(chartUserSettingState, defaults);
    });
    localStorage.clear();
  });

  function mount(onSubmit = jest.fn()) {
    render(
      <I18nextProvider i18n={i18n}>
        <form onSubmit={onSubmit}>
          <ChartDisplaySetting />
        </form>
      </I18nextProvider>
    );
    return [
      screen.getByRole('button', { name: messages.avg_line.show }),
      screen.getByRole('button', { name: messages.median_line.show }),
      screen.getByRole('button', { name: messages.mark.percentage }),
      screen.getByRole('button', { name: messages.y_axis_scale }),
    ];
  }

  it('exposes localized toggle names and the enabled state of each option', () => {
    const buttons = mount();
    expect(buttons).toHaveLength(4);
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button.tabIndex).toBe(0);
      expect(button).toHaveAttribute(
        'aria-pressed',
        String([false, false, true, true][index])
      );
    });
  });

  it('updates the corresponding setting, pressed state and persistence without submitting a form', async () => {
    const onSubmit = jest.fn((event) => event.preventDefault());
    const buttons = mount(onSubmit);
    const keys = [
      'showAvg',
      'showMedian',
      'onePointSys',
      'yAxisScale',
    ] as const;
    const expected = { ...defaults };

    for (let index = 0; index < buttons.length; index++) {
      const button = buttons[index];
      fireEvent.click(button);
      const key = keys[index];
      expected[key] = !expected[key];
      expect({ ...chartUserSettingState }).toEqual(expected);
      await waitFor(() =>
        expect(button).toHaveAttribute(
          'aria-pressed',
          String(key === 'onePointSys' ? !expected[key] : expected[key])
        )
      );
      expect(
        JSON.parse(localStorage.getItem('analyze.setting.chart')!)
      ).toEqual(expected);
    }
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('keeps the percentage option pressed while one-point scoring is disabled', async () => {
    const [, , percentage] = mount();
    await act(async () => {
      chartUserSettingState.onePointSys = true;
    });
    expect(percentage).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(percentage);
    expect(chartUserSettingState.onePointSys).toBe(false);
    await waitFor(() =>
      expect(percentage).toHaveAttribute('aria-pressed', 'true')
    );
  });
});
