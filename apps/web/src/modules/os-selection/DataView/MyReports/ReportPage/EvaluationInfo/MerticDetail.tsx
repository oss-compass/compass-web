import React from 'react';
import { toFixed } from '@common/utils';
import { useAllMetricData } from './AllHatchMetricData';
import { Tag, Badge, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

export const useMerticDetailData = () => {
  const { t } = useTranslation('os-selection');
  const { allMetricData, getRishContent } = useAllMetricData();

  const metricList = [
    t('mertic_detail.metric_list.legal_compliance'),
    t('mertic_detail.metric_list.technical_ecology'),
    t('mertic_detail.metric_list.lifecycle'),
    t('mertic_detail.metric_list.network_security'),
  ];

  // 计算单个报告四个维度得分和总分
  const getEvaluationDetail = (row) => {
    const evaluationDetail = metricList.map((item) => {
      //计算每个维度的总分
      const d = allMetricData.filter((i) => {
        let hasScore =
          row?.tpcSoftwareReportMetric?.[i.key] !== null &&
          row?.tpcSoftwareReportMetric?.[i.key] >= 0;
        return i.维度 === item && hasScore;
      });
      let scoreTotal = 0;
      d.forEach((i) => {
        scoreTotal += row?.tpcSoftwareReportMetric?.[i.key] || 0;
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
  const getMetricScore = (rowData) => {
    const res = rowData.map((row) => {
      return getEvaluationDetail(row);
    });
    return res;
  };

  // 根据指标 key 计算 24 个指标的得分
  const getMetricItemScore = (rowData) => {
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

  const getContent = (item, riskFill = false) => {
    let scoreContent = null;
    if (riskFill) {
      scoreContent = (
        <div>
          {t('mertic_detail.content.score_clarified_prefix')}
          {item.score}
          {t('mertic_detail.content.score_clarified_suffix')}
        </div>
      );
    } else {
      scoreContent = (
        <div>
          {t('mertic_detail.content.score_prefix')}
          {item.score}
        </div>
      );
    }
    if (item.score === 10) {
      return scoreContent;
    } else {
      const deital = getDeital(item);
      return (
        <>
          {scoreContent}
          <div>
            {t('mertic_detail.content.risk_prefix')}
            {getRishContent(item)}
          </div>
          <div>
            {deital ? (
              <>
                {t('mertic_detail.content.risk_detail_prefix')}
                {getDeital(item)}
              </>
            ) : (
              ''
            )}
          </div>
        </>
      );
    }
  };

  const useGetMetricIcon = (item, riskFill) => {
    if (riskFill) {
      return (
        <Popover content={getContent(item, true)} title="">
          <CheckCircleOutlined className="cursor-pointer text-lg " />
        </Popover>
      );
    }
    if (item.score === null) {
      return (
        <Popover content={t('mertic_detail.metric_icon.developing')} title="">
          <ClockCircleOutlined className="cursor-pointer text-lg text-[#ABABAB]" />
        </Popover>
      );
    } else if (item.score === -1) {
      return (
        <Popover content={t('mertic_detail.metric_icon.not_detected')} title="">
          <ClockCircleOutlined className="cursor-pointer text-lg text-[#ABABAB]" />
        </Popover>
      );
    } else if (item.score == 10) {
      return (
        <Popover content={getContent(item)} title="">
          <CheckCircleOutlined className="cursor-pointer text-lg " />
        </Popover>
      );
    } else if (item.score >= 6) {
      return (
        <Popover content={getContent(item)} title="">
          <Badge dot>
            <ExclamationCircleOutlined className="cursor-pointer text-lg text-[#f8961e]" />
          </Badge>
        </Popover>
      );
    } else {
      return (
        <Popover content={getContent(item)} title="">
          <Badge dot>
            <CloseCircleOutlined className="cursor-pointer text-lg text-[#ff4d4f]" />
          </Badge>
        </Popover>
      );
    }
  };

  const setRiskTag = (item, riskFill) => {
    const { score } = item;
    if (score === 10 || score === -1 || score === null) {
      return '';
    } else if (score >= 6) {
      return (
        <>
          <Tag color={riskFill ? 'green' : 'orange'}>
            {t('mertic_detail.risk_tag.risk_prefix')} {getRishContent(item)}
          </Tag>
        </>
      );
    } else {
      return (
        <>
          <Tag color={riskFill ? 'green' : 'red'}>
            {t('mertic_detail.risk_tag.risk_prefix')} {getRishContent(item)}
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
      } else if (React.isValidElement(children)) {
        const childProps = children.props as { children?: React.ReactNode };
        if (childProps && childProps.children) {
          traverseChildren(childProps.children);
        }
      } else if (children) {
        allText += String(children);
      }
    };
    traverseChildren(children);
    return allText;
  };

  const getRiskDetailText = (item) => {
    return getRishContent(item);
  };

  const getDeitalRow = (item, tpcSoftwareReportMetricRaw) => {
    let row = tpcSoftwareReportMetricRaw[item.key + 'Raw'];
    return row || '';
  };

  const downloadReport = (item) => {
    const { tpcSoftwareReportMetric, name, tpcSoftwareReportMetricRaw } = item;
    const metricScore = getMetricItemScore(tpcSoftwareReportMetric);
    let title = t('mertic_detail.download_report.title_suffix', { name: name });
    let head = [
      t('mertic_detail.download_report.header.metric_name'),
      t('mertic_detail.download_report.header.dimension'),
      t('mertic_detail.download_report.header.score'),
      t('mertic_detail.download_report.header.risk'),
      t('mertic_detail.download_report.header.risk_detail'),
      t('mertic_detail.download_report.header.risk_detail_raw'),
      t('mertic_detail.download_report.header.risk_importance'),
      t('mertic_detail.download_report.header.metric_significance'),
    ];
    let tableData = metricScore.map((item) => {
      const row = head.map((z) => {
        if (z == t('mertic_detail.download_report.header.score')) {
          return item.score;
        } else if (z == t('mertic_detail.download_report.header.risk')) {
          return getRishContent(item);
        } else if (z == t('mertic_detail.download_report.header.risk_detail')) {
          if (item.score == 10 || item.score === null) {
            return t('mertic_detail.download_report.no_risk');
          } else {
            const element = getDeital({ ...item });
            const text = getAllText(element);
            return text;
          }
        } else if (
          z == t('mertic_detail.download_report.header.risk_detail_raw')
        ) {
          return getDeitalRow(item, tpcSoftwareReportMetricRaw);
        } else {
          return item[z];
        }
      });
      return row;
    });
    saveCSV(title, head, tableData).then(() => {});
  };

  return {
    metricList,
    getEvaluationDetail,
    getMetricScore,
    getMetricItemScore,
    getContent,
    useGetMetricIcon,
    setRiskTag,
    getRiskDetailText,
    downloadReport,
  };
};
