import SelectReportDialog from '@modules/oh/components/SelectReport/SelectReportDialog';
import { useTpcSoftwareGraduationReportPageQuery } from '@oss-compass/graphql';
import GetReportData from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/GetReportData';
import { getMetricScore } from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/MerticDetail';

const HatchSelectReport = ({ getReport }) => {
  return (
    <SelectReportDialog
      getReport={getReport}
      fetcher={useTpcSoftwareGraduationReportPageQuery}
      getMetricScore={getMetricScore}
      GetReportComponent={GetReportData}
      reportMetricName={'graduationReportMetric'}
    />
  );
};
export default HatchSelectReport;
