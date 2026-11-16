import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ModifyUserOrgsDocument,
  type ContributorOrgInput,
  type ModifyUserOrgsMutation,
} from '@oss-compass/graphql';
import type { Dayjs } from 'dayjs';
import { toast } from 'react-hot-toast';
import client from '@common/gqlClient';
import OrgEdit from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@oss-compass/ui', () => ({
  Button: ({
    children,
    intent: _intent,
    size: _size,
    loading,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    intent?: string;
    size?: string;
    loading?: boolean;
  }) => (
    <button {...props} disabled={props.disabled || loading}>
      {children}
    </button>
  ),
}));

jest.mock('./OrgInput', () => ({
  __esModule: true,
  default: ({
    value = '',
    onChange,
    placeholder,
  }: {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
  }) => (
    <input
      aria-label="Organization"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange?.(event.currentTarget.value)}
    />
  ),
}));

jest.mock('./DateRangePicker', () => {
  const actualDayjs = jest.requireActual<typeof import('dayjs')>('dayjs');

  return {
    __esModule: true,
    default: ({ onChange }: { onChange?: (value: [Dayjs, Dayjs]) => void }) => (
      <button
        type="button"
        onClick={() =>
          onChange?.([actualDayjs('2024-01-01'), actualDayjs('2024-12-31')])
        }
      >
        Choose organization dates
      </button>
    ),
  };
});

type ToastCase = {
  name: string;
  type: 'add' | 'edit';
  status: 'true' | 'false';
  message: string;
  expectedMessage: string;
  toastKind: 'success' | 'error';
};

// These literals model the backend's string status and message contract.
// The test does not execute the backend's date validation or translations.
const cases: ToastCase[] = [
  {
    name: 'add retains a nonempty date-validation failure message',
    type: 'add',
    status: 'false',
    message: 'Organization date ranges overlap.',
    expectedMessage: 'Organization date ranges overlap.',
    toastKind: 'error',
  },
  {
    name: 'edit retains a nonempty date-validation failure message',
    type: 'edit',
    status: 'false',
    message: 'End date must be on or after start date.',
    expectedMessage: 'End date must be on or after start date.',
    toastKind: 'error',
  },
  {
    name: 'add uses its success fallback for an empty message',
    type: 'add',
    status: 'true',
    message: '',
    expectedMessage: 'common:toast.add_successful',
    toastKind: 'success',
  },
  {
    name: 'edit uses its success fallback for an empty message',
    type: 'edit',
    status: 'true',
    message: '',
    expectedMessage: 'common:toast.modification_successful',
    toastKind: 'success',
  },
  {
    name: 'add uses its failure fallback for an empty message',
    type: 'add',
    status: 'false',
    message: '',
    expectedMessage: 'common:toast.add_failed',
    toastKind: 'error',
  },
  {
    name: 'edit uses its failure fallback for an empty message',
    type: 'edit',
    status: 'false',
    message: '',
    expectedMessage: 'common:toast.modification_failed',
    toastKind: 'error',
  },
];

const originalMatchMedia = Object.getOwnPropertyDescriptor(
  window,
  'matchMedia'
);
let installedMatchMedia = false;
let queryClient: QueryClient;
let errorToast: jest.SpyInstance;
let successToast: jest.SpyInstance;

beforeAll(() => {
  if (typeof window.matchMedia !== 'function') {
    // jsdom's CSS-media boundary only; Antd Form itself remains real.
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: () => false,
      }),
    });
    installedMatchMedia = true;
  }
});

afterAll(() => {
  if (installedMatchMedia) {
    if (originalMatchMedia) {
      Object.defineProperty(window, 'matchMedia', originalMatchMedia);
    } else {
      Reflect.deleteProperty(window, 'matchMedia');
    }
  }
});

beforeEach(() => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  errorToast = jest.spyOn(toast, 'error').mockReturnValue('error-toast');
  successToast = jest.spyOn(toast, 'success').mockReturnValue('success-toast');
});

afterEach(() => {
  cleanup();
  queryClient.clear();
  jest.restoreAllMocks();
});

const submitResponse = async (testCase: ToastCase) => {
  const response: ModifyUserOrgsMutation = {
    modifyUserOrgs: {
      status: testCase.status,
      message: testCase.message,
    },
  };
  // Only the external request boundary is controlled, not the generated hook.
  const request = jest.spyOn(client, 'request').mockResolvedValue(response);
  const setShowEdit = jest.fn();
  const onSuccess = jest.fn();
  const organizations: ContributorOrgInput[] =
    testCase.type === 'edit'
      ? [
          {
            orgName: 'PreviousOrg',
            firstDate: '2023-01-01',
            lastDate: '2023-12-31',
          },
        ]
      : [];

  render(
    <QueryClientProvider client={queryClient}>
      <OrgEdit
        type={testCase.type}
        index={testCase.type === 'edit' ? 0 : undefined}
        organizations={organizations}
        provider="github"
        setShowEdit={setShowEdit}
        onSuccess={onSuccess}
      />
    </QueryClientProvider>
  );

  fireEvent.change(screen.getByRole('textbox', { name: 'Organization' }), {
    target: { value: 'ExampleOrg' },
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Choose organization dates' })
  );
  fireEvent.click(
    screen.getByRole('button', {
      name: testCase.type === 'add' ? 'common:btn.add' : 'common:btn.confirm',
    })
  );

  await waitFor(() => {
    const count = errorToast.mock.calls.length + successToast.mock.calls.length;
    expect(count).toBe(1);
  });
  expect(request).toHaveBeenCalledTimes(1);
  expect(request).toHaveBeenCalledWith(
    expect.objectContaining({
      document: ModifyUserOrgsDocument,
      variables: {
        platform: 'github',
        organizations: [
          {
            orgName: 'ExampleOrg',
            firstDate: '2024-01-01',
            lastDate: '2024-12-31',
          },
        ],
      },
    })
  );

  return { setShowEdit, onSuccess };
};

describe('OrgEdit mutation toast messages', () => {
  it.each(cases)('$name', async (testCase) => {
    const { setShowEdit, onSuccess } = await submitResponse(testCase);

    if (testCase.toastKind === 'success') {
      expect(successToast).toHaveBeenCalledTimes(1);
      expect(successToast).toHaveBeenCalledWith(testCase.expectedMessage);
      expect(errorToast).not.toHaveBeenCalled();
      expect(setShowEdit).toHaveBeenCalledTimes(1);
      expect(setShowEdit).toHaveBeenCalledWith(false);
      expect(onSuccess).toHaveBeenCalledTimes(1);
    } else {
      expect(errorToast).toHaveBeenCalledTimes(1);
      expect(errorToast).toHaveBeenCalledWith(testCase.expectedMessage);
      expect(successToast).not.toHaveBeenCalled();
      expect(setShowEdit).not.toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();
    }
  });
});
