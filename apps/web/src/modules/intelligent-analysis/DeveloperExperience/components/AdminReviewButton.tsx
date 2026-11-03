import React from 'react';
import { Button } from 'antd';
import type { CompassOperatorUser } from '../../UserJourney/rawData/apiClient';

type AdminReviewButtonProps = {
  user: CompassOperatorUser | null;
  reportType: 'community' | 'issue';
};

const AdminReviewButton: React.FC<AdminReviewButtonProps> = ({
  user,
  reportType,
}) => {
  if (!user?.enabled || user.role !== 'admin') return null;

  return (
    <Button
      type="text"
      className="group inline-flex h-9 flex-shrink-0 items-center gap-2 !rounded-full border border-white/80 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition hover:!-translate-y-0.5 hover:!border-sky-200 hover:!bg-white hover:!text-sky-700 hover:!shadow-[0_16px_36px_rgba(59,130,246,0.18)]"
      href={
        reportType === 'issue'
          ? '/pain-admin/#/issue-invalid-reviews'
          : '/pain-admin/#/report-reviews'
      }
    >
      去后台审核
    </Button>
  );
};

export default AdminReviewButton;
