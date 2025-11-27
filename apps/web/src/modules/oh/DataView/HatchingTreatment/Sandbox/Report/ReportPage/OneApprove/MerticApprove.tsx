import React, { useMemo } from 'react';
import { Collapse, Tag } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Sandbox/Report/ReportPage/store/useReportStore';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { useGetTargetSoftwareData } from '@modules/oh/store/useTargetSoftwareStore';
import { useGetAllRisk } from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/store/useRiskStore';
import MetricItemApprove from './MetricItemApprove';

const MetricApprove = () => {
  const { currentUser } = useUserInfo();
  const userId = currentUser?.id;
  const { targetSoftware, metricItemScoreList } = useGetTargetSoftwareData();
  const { metricClarificationState } = useGetAllRisk(targetSoftware?.shortCode);

  const {
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
  } = useGetReportData();
  const metricList = useMemo(() => {
    if (!metricItemScoreList?.length) {
      return [];
    }
    let legalList = metricItemScoreList?.filter((m) => {
      return (
        m.维度 == '合法合规' &&
        m.是否必须澄清 === '是' &&
        m.score !== 10 &&
        m.score !== null &&
        m.score !== -1 &&
        m.score !== -2
      );
    });
    let otherList = metricItemScoreList?.filter((m) => {
      return (
        m.维度 !== '合法合规' &&
        m.key !== 'upstreamCollaborationStrategy' &&
        m.是否必须澄清 === '是' &&
        m.score !== 10 &&
        m.score !== null &&
        m.score !== -1 &&
        m.score !== -2
      );
    });
    let roundList = metricItemScoreList?.filter((m) => {
      return (
        m.key == 'upstreamCollaborationStrategy' &&
        m.score !== 10 &&
        m.score !== null &&
        m.score !== -1 &&
        m.score !== -2
      );
    });
    const res = [];
    if (commentCompliancePermission) {
      return [...res, ...legalList, ...otherList];
    }
    if (commentLegalPermission) {
      res.push(...legalList);
    }
    if (commentSigLeadPermission) {
      res.push(...otherList);
    }
    return res;
  }, [
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
    metricItemScoreList,
  ]);
  const genExtra = (metric) => {
    let clarificationState = metricClarificationState?.[metric.key];
    const errorText = (
      <Tag icon={<ExclamationCircleOutlined />} color="error">
        未审批
      </Tag>
    );
    if (!clarificationState) {
      return errorText;
    }
    let approvalState = clarificationState.filter(
      (s) => s.userId === userId && s.state === 1
    );
    if (approvalState.length > 0) {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已赞同
        </Tag>
      );
    }
    let rejectState = clarificationState.filter(
      (s) => s.userId === userId && s.state === -1
    );
    if (rejectState.length > 0) {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已拒绝
        </Tag>
      );
    }
    return errorText;
  };
  const items = metricList.map((item, index) => {
    const metric = {
      key: index,
      label: item.指标名称,
      children: <MetricItemApprove report={targetSoftware} metric={item} />,
      extra: genExtra(item),
    };
    return metric;
  });
  if (!metricList || metricList.length === 0) {
    return <div className="my-4"></div>;
  }
  return (
    <div className="oh">
      <div className="my-4 text-base font-semibold">指标评审：</div>
      <Collapse accordion items={items} expandIconPosition={'end'} />
      <div className="my-4"></div>
    </div>
  );
};
export default MetricApprove;
