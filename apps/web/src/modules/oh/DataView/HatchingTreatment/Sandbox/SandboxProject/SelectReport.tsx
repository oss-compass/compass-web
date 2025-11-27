import SelectReportDialog from '@modules/oh/components/SelectReport/SelectReportDialog';
import { useTpcSoftwareSandboxReportPageQuery } from '@oss-compass/graphql';
import GetReportData from '@modules/oh/DataView/HatchingTreatment/Sandbox/Report/GetReportData';
import { getMetricScore } from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/MerticDetail';

const SandboxSelectReport = ({ getReport }) => {
  return (
    <SelectReportDialog
      getReport={getReport}
      fetcher={useTpcSoftwareSandboxReportPageQuery}
      getMetricScore={getMetricScore}
      GetReportComponent={GetReportData}
      reportMetricName={'tpcSoftwareSandboxReportMetric'}
    />
  );
};
export default SandboxSelectReport;
