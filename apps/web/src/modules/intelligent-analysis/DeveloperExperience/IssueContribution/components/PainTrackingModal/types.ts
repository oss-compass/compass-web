import type {
  IssuePainTracking,
  IssuePainTrackingActionPayload,
  IssueReportPain,
} from '../../types';

export type PainTrackingAction = Omit<
  IssuePainTrackingActionPayload,
  'community'
>;

export type PainTrackingModalProps = {
  open: boolean;
  pain: IssueReportPain;
  tracking: IssuePainTracking;
  metricLabels: string[];
  onClose: () => void;
  onAction: (payload: PainTrackingAction) => Promise<IssuePainTracking>;
};
