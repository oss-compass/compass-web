import React from 'react';
import ReportSectionCard from '../../components/ReportSectionCard';

type SectionCardProps = React.ComponentProps<typeof ReportSectionCard> & {
  anno?: React.ReactNode;
};

/** CI compatibility wrapper around the shared report section shell. */
const SectionCard: React.FC<SectionCardProps> = ({ anno, ...props }) => (
  <ReportSectionCard description={anno} {...props} />
);

export default SectionCard;
