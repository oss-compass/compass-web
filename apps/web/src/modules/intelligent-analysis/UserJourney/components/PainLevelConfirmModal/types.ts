import type { Dayjs } from 'dayjs';
import type {
  PainConfirmationRecord,
  PainHistoryItem,
  UpsertPainConfirmationPayload,
} from '../../rawData/apiClient';
import type { PainLevel } from '../../types';

export enum PainStatus {
  TO_BE_CONFIRMED = 1,
  CONFIRMED_PENDING_FIX = 2,
  FIXED_PENDING_RETEST = 3,
  RETESTING = 4,
  RETESTED_PASSED = 5,
  NO_FIX_NEEDED = 6,
  RETESTED_FAILED = 7,
}

export type FormValues = {
  status: PainStatus;
  severity?: PainLevel;
  non_project_reason?: string;
  is_common?: boolean;
  common_issue_type?: string;
  confirmed_by: string;
  issue_link?: string;
  pr_link?: string;
  expected_close_time?: Dayjs | null;
  retest_decision?: 'passed' | 'failed' | 'not_detected';
  retest_passed_file_key?: string;
};

export type Props = {
  open: boolean;
  fileKey: string;
  stepId: string;
  painIndex: number;
  painText: string;
  currentRecord?: PainConfirmationRecord | null;
  parentPainRemark?: string | null;
  versionOptions?: Array<{ value: string; label: string }>;
  onCancel: () => void;
  onSubmit: (payload: UpsertPainConfirmationPayload) => Promise<void>;
};

export type StepSnapshot = Partial<PainConfirmationRecord> & {
  status?: number;
  severity?: string | null;
  action_reason?: string | null;
  is_common_issue?: boolean;
  common_issue_type?: string | null;
  issue_link?: string | null;
  pr_link?: string | null;
  expected_close_time?: string | null;
  actual_close_time?: string | null;
  retest_decision?: 'passed' | 'failed' | 'not_detected' | null;
  retest_passed_file_key?: string | null;
  latest_file_key?: string | null;
  confirmed_by?: string | null;
  confirmed_at?: string | null;
};

export type PainConfirmationFormVisibilityArgs = {
  isReviewingHistoryStep: boolean;
  isCurrentNonProjectIssue: boolean;
  currentStatus: number;
  activeDisplayStep: number;
};

export type VersionOption = { value: string; label: string };
export type CommonIssueOption = { issueType: string; description: string };
export type SubmitHandler = (
  payload: UpsertPainConfirmationPayload
) => Promise<void>;
export type HistoryItems = PainHistoryItem[];
