import React, { useMemo } from 'react';
import { Collapse, Tag } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useGetReportData } from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/ReportPage/store/useReportStore';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { useGetTargetSoftwareData } from '@modules/oh/store/useTargetSoftwareStore';
import { useGetAllRisk } from '@modules/oh/store/useRiskStore';
import MetricItemApprove from './MetricItemApprove';

const MetricApprove = () => {
  const { currentUser } = useUserInfo();
  const userId = currentUser?.id;
  const { targetSoftware, metricItemScoreList } = useGetTargetSoftwareData(); //指标定义和得分
  const { metricClarificationState } = useGetAllRisk(targetSoftware?.shortCode); //指标澄清状态

  const {
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
  } = useGetReportData();
  const metricList = useMemo(() => {
    if (!metricItemScoreList?.length) {
      return [];
    }
    // 过滤出合法合规的列表
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
        m.是否必须澄清 === '是' &&
        m.score !== 10 &&
        m.score !== null &&
        m.score !== -1 &&
        m.score !== -2
      );
    });
    if (commentCompliancePermission) {
      return [...legalList, ...otherList];
    }
    const res = [];
    if (commentLegalPermission) {
      res.push(...legalList);
    }
    if (commentCommitterPermission || commentSigLeadPermission) {
      res.push(...otherList);
    }
    return res;
  }, [
    commentCommitterPermission,
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
    //查找当前用户是否通过澄清
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
