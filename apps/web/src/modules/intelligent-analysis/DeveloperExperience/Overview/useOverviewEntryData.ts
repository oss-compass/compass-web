import { useRouter } from 'next/router';
import { useDefaultOverviewSummary } from '../../UserJourney/OverviewDashboard/useOverviewSummaryQuery';
import { useCiDatasetsQuery } from '../CiExperience/queries';
import { useIssueOverviewSummaryQuery } from '../IssueContribution/components/IssueOverview/useIssueOverviewSummaryQuery';

const single = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** Start only the selected module's first-screen request while its code loads. */
export const useOverviewEntryData = (org?: string) => {
  const router = useRouter();
  const activeModule = single(router.query.module);
  useDefaultOverviewSummary(org);
  useIssueOverviewSummaryQuery(org, router.isReady && activeModule === 'issue');
  useCiDatasetsQuery(
    router.isReady &&
      activeModule === 'ci' &&
      (!org || org.toLowerCase() === 'cann') &&
      single(router.query.ciView) !== 'embedded-report',
    { reuseFreshData: true }
  );
};
