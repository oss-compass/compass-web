import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import Badge from './Badge';
import NavbarSetting from './NavBar/NavbarSetting';
import enAnalyze from '../../../../i18n/en/analyze.json';
import enCommon from '../../../../i18n/en/common.json';
import zhAnalyze from '../../../../i18n/zh/analyze.json';
import zhCommon from '../../../../i18n/zh/common.json';

jest.mock('next-i18next', () => jest.requireActual('react-i18next'));
jest.mock('next/router', () => ({
  useRouter: () => ({ query: { slugs: 'project-a' } }),
}));
jest.mock(
  './NavBar/ChartDisplaySetting',
  () =>
    function ChartDisplaySetting() {
      return <span>Chart options</span>;
    }
);
jest.mock('./NavBar/RepoFilter', () => () => null);
jest.mock('@modules/analyze/hooks/useLevel', () => () => 'repo');
jest.mock('@modules/analyze/hooks/useCompareItems', () => () => ({
  compareItems: [{ label: 'project-a' }],
}));

const resources = {
  en: { analyze: enAnalyze, common: enCommon },
  zh: { analyze: zhAnalyze, common: zhCommon },
};
const writeText = jest.fn();
const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  'clipboard'
);
async function mount(locale: 'en' | 'zh', element = <Badge />) {
  const i18n = createInstance();
  await i18n.init({
    lng: locale,
    fallbackLng: false,
    defaultNS: 'common',
    resources,
    interpolation: { escapeValue: false },
  });
  return render(<I18nextProvider i18n={i18n}>{element}</I18nextProvider>);
}
async function open(title: string) {
  const trigger = screen.getByRole('button', { name: title });
  act(() => trigger.focus());
  fireEvent.click(trigger);
  const dialog = await screen.findByRole('dialog', { name: title });
  return { trigger, dialog };
}
beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
  window.history.replaceState(null, '', '/analyze/project-a');
});
afterEach(() => {
  if (originalClipboard)
    Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else Reflect.deleteProperty(navigator, 'clipboard');
});

describe.each(['en', 'zh'] as const)(
  '%s badge accessibility with the pinned translations',
  (locale) => {
    const { analyze, common } = resources[locale];
    const title = analyze.badge.title;
    const modelNames = [
      common.oss_compass,
      analyze.all_model.collaboration_development_index,
      analyze.all_model.community_service_and_support,
      analyze.all_model.community_activity,
      analyze.all_model.organization_activity,
    ];

    it('names the dialog, all five model radios, close and copy controls', async () => {
      await mount(locale);
      const { trigger, dialog } = await open(title);
      expect(trigger).toHaveAttribute('type', 'button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-controls', dialog.id);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const radios = within(dialog).getAllByRole('radio');
      expect(radios).toHaveLength(5);
      for (const name of modelNames)
        expect(within(dialog).getByRole('radio', { name })).toBeInTheDocument();
      expect(
        within(dialog).getByRole('radiogroup', { name: title })
      ).toBeInTheDocument();
      expect(
        within(dialog).getByRole('button', { name: common.btn.close })
      ).toHaveFocus();
      expect(
        within(dialog).getByRole('button', { name: common.copy.click_to_copy })
      ).toHaveAttribute('type', 'button');
      expect(
        within(dialog).getByRole('tabpanel', { name: 'Markdown' })
      ).toBeInTheDocument();
    });

    it('restores focus after Escape and after the close button', async () => {
      await mount(locale);
      const { trigger, dialog } = await open(title);
      fireEvent.keyDown(dialog, { key: 'Escape' });
      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await open(title);
      fireEvent.click(screen.getByRole('button', { name: common.btn.close }));
      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
      expect(trigger).toHaveFocus();
    });

    it('copies the selected model in all three formats and announces success', async () => {
      await mount(locale);
      await open(title);
      const radio = screen.getByRole('radio', { name: modelNames[1] });
      fireEvent.click(radio);
      expect(radio).toHaveAttribute('aria-checked', 'true');
      const badge = `${window.origin}/badge/project-a.svg?metric=collab_dev_index`;
      const expected = {
        Markdown: `[![OSS Compass Analyze](${badge})](${window.origin}/analyze/project-a#collaboration_development_index)`,
        HTML: `<img src="${badge}" alt="OSS Compass Analyze" />`,
        Link: badge,
      };
      for (const format of ['Markdown', 'HTML', 'Link']) {
        const tab = screen.getByRole('tab', { name: format });
        fireEvent.click(tab);
        const panel = screen.getByRole('tabpanel', { name: format });
        expect(tab).toHaveAttribute('aria-controls', panel.id);
        fireEvent.click(
          within(panel).getByRole('button', { name: common.copy.click_to_copy })
        );
        await waitFor(() =>
          expect(writeText).toHaveBeenLastCalledWith(expected[format])
        );
        await waitFor(() =>
          expect(within(panel).getByRole('status')).toHaveTextContent(
            common.copy.copy_successfully
          )
        );
      }
      expect(writeText).toHaveBeenCalledTimes(3);
    });

    it.each(['denied', 'unavailable', 'throws'])(
      'announces clipboard failure (%s) inside the dialog',
      async (failure) => {
        if (failure === 'denied')
          writeText.mockRejectedValue(new Error('NotAllowedError'));
        if (failure === 'unavailable')
          Reflect.deleteProperty(navigator, 'clipboard');
        if (failure === 'throws')
          writeText.mockImplementation(() => {
            throw new Error('Clipboard blocked');
          });
        await mount(locale);
        const { dialog } = await open(title);
        fireEvent.click(
          within(dialog).getByRole('button', {
            name: common.copy.click_to_copy,
          })
        );
        await waitFor(() =>
          expect(within(dialog).getByRole('alert')).toHaveTextContent(
            common.error.something_went_wrong
          )
        );
        expect(within(dialog).getByRole('alert')).toHaveTextContent(
          common.error.try_again
        );
        expect(within(dialog).getByRole('status')).toBeEmptyDOMElement();
        expect(dialog).toContainElement(within(dialog).getByRole('alert'));
      }
    );

    it('clears a previous format failure and can recover by copying again', async () => {
      writeText.mockRejectedValueOnce(new Error('Denied'));
      await mount(locale);
      await open(title);
      fireEvent.click(
        screen.getByRole('button', { name: common.copy.click_to_copy })
      );
      await waitFor(() =>
        expect(screen.getByRole('alert')).toHaveTextContent(
          common.error.something_went_wrong
        )
      );
      fireEvent.click(screen.getByRole('tab', { name: 'HTML' }));
      expect(screen.getByRole('alert')).toBeEmptyDOMElement();
      fireEvent.click(
        screen.getByRole('button', { name: common.copy.click_to_copy })
      );
      await waitFor(() =>
        expect(screen.getByRole('status')).toHaveTextContent(
          common.copy.copy_successfully
        )
      );
      expect(screen.getByRole('alert')).toBeEmptyDOMElement();
    });
  }
);

it('keeps focus in the settings popover after the dialog closes, then restores the settings trigger', async () => {
  await mount('en', <NavbarSetting />);
  const settings = screen.getByRole('button', { name: enAnalyze.display });
  // jsdom has no layout; Popper needs a non-empty anchor rectangle.
  jest.spyOn(settings, 'getBoundingClientRect').mockReturnValue({
    x: 10,
    y: 10,
    top: 10,
    left: 10,
    right: 42,
    bottom: 42,
    width: 32,
    height: 32,
    toJSON: () => ({}),
  });
  fireEvent.click(settings);
  const { trigger, dialog } = await open(enAnalyze.badge.title);
  fireEvent.keyDown(dialog, { key: 'Escape' });
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
  expect(trigger).toHaveFocus();
  expect(settings).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(trigger, { key: 'Escape' });
  await waitFor(() =>
    expect(
      screen.queryByRole('button', { name: enAnalyze.badge.title })
    ).not.toBeInTheDocument()
  );
  expect(settings).toHaveFocus();
  expect(settings).toHaveAttribute('aria-expanded', 'false');
});

it('does not announce a late clipboard result for a different model', async () => {
  let finish!: () => void;
  writeText.mockReturnValueOnce(
    new Promise<void>((resolve) => {
      finish = resolve;
    })
  );
  await mount('en');
  await open(enAnalyze.badge.title);
  fireEvent.click(
    screen.getByRole('button', { name: enCommon.copy.click_to_copy })
  );
  fireEvent.click(
    screen.getByRole('radio', { name: enAnalyze.all_model.community_activity })
  );
  await act(async () => finish());
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
  expect(screen.getByRole('alert')).toBeEmptyDOMElement();
});
