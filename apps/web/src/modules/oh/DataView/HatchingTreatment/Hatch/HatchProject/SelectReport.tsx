import SelectReportDialog from '@modules/oh/components/SelectReport/SelectReportDialog';
import { useTpcSoftwareSelectionReportPageQuery } from '@oss-compass/graphql';
import GetReportData from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/GetReportData';
import { getMetricScore } from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/MerticDetail';

const HatchSelectReport = ({ getReport }) => {
  return (
    <SelectReportDialog
      getReport={getReport}
      fetcher={useTpcSoftwareSelectionReportPageQuery}
      getMetricScore={getMetricScore}
      GetReportComponent={GetReportData}
      reportMetricName={'tpcSoftwareReportMetric'}
    />
  );
};
export default HatchSelectReport;
