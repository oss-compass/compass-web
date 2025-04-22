import React from 'react';
import { toFixed } from '@common/utils';
import {
  allMetricData,
  getRishContent,
} from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/AllGraduateMetricData';
import { Tag, Badge, Popover } from 'antd';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { getRiskFillScore } from '@modules/oh/utils/utils';

export const metricList = ['合法合规', '技术生态', '生命周期', '网络安全'];
// 计算单个报告四个维度得分和总分
export const getEvaluationDetail = (row) => {
  const evaluationDetail = metricList.map((item) => {
    //计算每个维度的总分
    const d = allMetricData.filter((i) => {
      let hasScore =
        row?.graduationReportMetric?.[i.key] !== null &&
        row?.graduationReportMetric?.[i.key] >= 0;
      return i.维度 === item && hasScore;
    });
    let scoreTotal = 0;
    d.forEach((i) => {
      scoreTotal += row?.graduationReportMetric?.[i.key] || 0;
    });
    const score: number = toFixed((scoreTotal / d.length) * 10, 0);
    return {
      name: item,
      score,
    };
  });
  //计算总分
  const scoreTotal = evaluationDetail.reduce((acc, cur) => {
    return cur.score + acc;
  }, 0);
  const score: number = toFixed(scoreTotal / metricList.length, 0);
  return { ...row, evaluationDetail, score };
};
// 获取多个报告的四个维度得分和总分
export const getMetricScore = (rowData) => {
  const res = rowData.map((row) => {
    return getEvaluationDetail(row);
  });
  return res;
};
// 根据指标 key 计算 24 个指标的得分
export const getMetricItemScore = (rowData) => {
  return allMetricData.map((item) => {
    return {
      ...item,
      score: rowData?.[item.key],
      detail: rowData?.[item.key + 'Detail'] || '',
    };
  });
};

const getDeital = (item) => {
  const { detailRender, detail } = item;
  if (Array.isArray(detail) && detail?.length == 0) {
    return '';
  }
  if (detailRender && detail) {
    return <>{detailRender(detail)}</>;
  } else if (detail) {
    return <>{detail}</>;
  } else {
    return '';
  }
};
export const getContent = (item, riskFill = false) => {
  if (item.score === null) {
    return '功能开发中，敬请期待';
  }
  if (item.score === -1) {
    return '未检测到该指标';
  }
  if (item.score === -2) {
    return '此报告不涉及该指标';
  }
  const scoreText = riskFill
    ? `得分：10 (澄清前：${item.score})`
    : `得分：${item.score}`;
  const scoreContent = <div>{scoreText}</div>;
  if (item.score === 10) {
    return scoreContent;
  } else {
    const deital = getDeital(item);
    return (
      <>
        {scoreContent}
        <div>
          风险：
          {getRishContent(item)}
        </div>
        <div>{deital ? <>风险详情：{getDeital(item)}</> : ''}</div>
      </>
    );
  }
};
export const useGetMetricIcon = (item, riskFill) => {
  let icon = null;
  if (item.score === null || item.score === -1 || item.score === -2) {
    icon = (
      <ClockCircleOutlined className="cursor-pointer text-lg text-[#ABABAB]" />
    );
  } else if (riskFill) {
    icon = <CheckCircleOutlined className="cursor-pointer text-lg " />;
  } else if (item.score == 10) {
    icon = <CheckCircleOutlined className="cursor-pointer text-lg" />;
  } else if (item.score >= 6) {
    icon = (
      <Badge dot>
        <ExclamationCircleOutlined className="cursor-pointer text-lg text-[#f8961e]" />
      </Badge>
    );
  } else {
    icon = (
      <Badge dot>
        <CloseCircleOutlined className="cursor-pointer text-lg text-[#ff4d4f]" />
      </Badge>
    );
  }
  return (
    <Popover content={getContent(item, riskFill)} title="">
      {icon}
    </Popover>
  );
};
export const setRiskTag = (item, riskFill) => {
  const { score } = item;
  if (score === 10 || score === -1 || score === -2 || score === null) {
    return '';
  } else if (score >= 6) {
    return (
      <>
        <Tag color={riskFill ? 'green' : 'orange'}>
          风险： {getRishContent(item)}
        </Tag>
      </>
    );
  } else {
    return (
      <>
        <Tag color={riskFill ? 'green' : 'red'}>
          风险： {getRishContent(item)}
        </Tag>
      </>
    );
  }
};
function format(data) {
  return String(data)
    .replace(/"/g, '""')
    .replace(/(^[\s\S]*$)/, '"$1"');
}
function saveCSV(title, head, data) {
  let wordSeparator = ',';
  let lineSeparator = '\n';

  let reTitle = title + '.csv';
  let headBOM = '\ufeff';
  let headStr = head
    ? head.map((item) => format(item)).join(wordSeparator) + lineSeparator
    : '';
  let dataStr = data
    ? data
        .map((row) => row.map((item) => format(item)).join(wordSeparator))
        .join(lineSeparator)
    : '';

  return new Promise((resolve) => {
    // Chrome、Firefox
    let a = document.createElement('a');
    a.href =
      'data:text/csv;charset=utf-8,' +
      headBOM +
      encodeURIComponent(headStr + dataStr);
    a.download = reTitle;
    a.click();
    resolve('');
  });
}
const getAllText = (children) => {
  if (typeof children === 'string') {
    return children;
  }
  let allText = '';
  const traverseChildren = (children: React.ReactNode) => {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        traverseChildren(child);
      });
    } else if (typeof children === 'string') {
      allText += children;
    } else if (React.isValidElement(children)) {
      traverseChildren(children.props.children);
    }
  };

  traverseChildren(children);
  return allText;
};
const getDeitalRow = (item, tpcSoftwareReportMetricRaw) => {
  let row = tpcSoftwareReportMetricRaw[item.key + 'Raw'];
  return row || '';
};
export const downloadReport = (item) => {
  const { graduationReportMetric, name, tpcSoftwareReportMetricRaw } = item;
  const metricScore = getMetricItemScore(graduationReportMetric);
  let title = name + '评估报告';
  let head = [
    '指标名称',
    '维度',
    '得分',
    '风险',
    '风险详情',
    '风险详情原数据',
    '指标意义',
  ];
  let tableData = metricScore.map((item) => {
    const row = head.map((z) => {
      if (z == '得分') {
        return item.score;
      } else if (z == '风险') {
        return getRishContent(item);
      } else if (z == '风险详情') {
        if (item.score == 10 || item.score === null) {
          return '无';
        } else {
          const element = getDeital({ ...item });
          const text = getAllText(element);
          return text;
        }
      } else if (z == '风险详情原数据') {
        return getDeitalRow(item, tpcSoftwareReportMetricRaw);
      } else {
        return item[z];
      }
    });
    return row;
  });
  saveCSV(title, head, tableData).then(() => {});
};
