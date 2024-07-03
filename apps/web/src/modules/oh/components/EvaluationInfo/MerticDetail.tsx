import React from 'react';
import { toFixed } from '@common/utils';
import { allMetricData } from '@modules/oh/components/EvaluationInfo/AllMetricData';
import { Tag, Badge, Button, Popover } from 'antd';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const metricList = ['合法合规', '技术生态', '生命周期', '网络安全'];
// 计算单个报告四个维度得分和总分
export const getEvaluationDetail = (row) => {
  const evaluationDetail = metricList.map((item) => {
    //计算每个维度的总分
    const d = allMetricData.filter((i) => i.维度 === item);
    //   const score = d.reduce((acc, cur) => {
    //     return row?.tpcSoftwareReportMetric?.[cur.key] || 0 + acc;
    //   }, 0);
    let scoreTotal = 0;
    d.forEach((i) => {
      scoreTotal += row?.tpcSoftwareReportMetric?.[i.key] || 0;
    });
    const score: number = toFixed(scoreTotal / d.length, 0) * 10;
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
//6 分
export const getWarningContent = (name) => {
  switch (name) {
    case '许可证包含':
      return '许可证不在准入清单';
    case 'DCO':
      return '未检测到项目的提交者签署 DCO';
    case '依赖可获得':
      return '未检测到项目依赖的开源软件的 License';
    case '代码维护':
      return '过去 90 天平均每周少于 1 次代码提交';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以内响应';
    case '历史漏洞':
      return '引入开源软件年漏洞 5 个以上';
    // case '采用度分析':
    //   return '包管理平台下载数据量较低';
    case '软件质量':
      return '软件质量分析未达标';
    case '软件包签名':
      return '软件包分发不包含数字校验';
    // case '漏洞披露机制':
    //   return '软件未检测到漏洞披露机制';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以内响应';
    case '版本生命周期':
      return '无明确声明周期声明软件及版本 2 年以上发布';
  }
};
//0 分
export const getErrorContent = (name) => {
  switch (name) {
    case '依赖可获得':
      return '未检测到项目依赖的开源软件的 License';
    case '软件质量':
      return '软件质量分析未达标';
    case 'DCO':
      return '未检测到项目的提交者签署 DCO';
    case '软件包签名':
      return '软件包分发不包含数字校验';
    case '二进制制品':
      return '引入软件源码仓库包含二进制制品';
    case '版本归一化':
      return '该软件已在 OpenHarmony 及 TPC 中引入';
    case '版本号':
      return '未检测到版本号或版本号不规范';
    case '许可证包含':
      return '未检测到许可证';
    case '许可证兼容性':
      return '引入软件项目级、文件级许可证存在兼容性问题';
    // case '专利风险':
    //   return '非全球专利保护社区 OIN（Open Invention Network）认证软件';
    case '代码维护':
      return '项目已归档或从未有版本发布';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以上响应';
    case '版本生命周期':
      return '版本没有 release 或处于 EOL 阶段';
    // case '漏洞响应机制':
    //   return '软件无漏洞响应机制';
    case '安全漏洞':
      return '引入软件及依赖源码有公开未修复漏洞';
  }
};
const getDeital = (item) => {
  const { detailRender, detail } = item;
  if (Array.isArray(detail) && detail?.length == 0) {
    return '';
  }
  if (detailRender) {
    return <>{detailRender(detail)}</>;
  } else if (detail) {
    return <>{detail}</>;
  } else {
    return '';
  }
};
export const getContent = (item) => {
  if (item.score >= 8) {
    return <div>得分：{item.score}</div>;
  } else {
    const deital = getDeital(item);
    return (
      <>
        <div>得分：{item.score}</div>
        <div>
          风险：
          {item.score >= 6
            ? getWarningContent(item.指标名称)
            : getErrorContent(item.指标名称)}
        </div>
        <div>{deital ? <>风险详情：{getDeital(item)}</> : ''}</div>
      </>
    );
  }
};
export const setMetricIcon = (item) => {
  if (item.score === null) {
    return (
      <Popover content={'功能开发中，敬请期待'} title="">
        <ClockCircleOutlined
          rev={undefined}
          className="cursor-pointer text-lg text-[#ABABAB]"
        />
      </Popover>
    );
  } else if (item.score >= 8) {
    return (
      <Popover content={getContent(item)} title="">
        <CheckCircleOutlined
          rev={undefined}
          className="cursor-pointer text-lg "
        />
      </Popover>
    );
  } else if (item.score >= 6) {
    return (
      <Popover content={getContent(item)} title="">
        <Badge dot>
          <ExclamationCircleOutlined
            rev={undefined}
            className="cursor-pointer text-lg text-[#f8961e]"
          />
        </Badge>
      </Popover>
    );
  } else {
    return (
      <Popover content={getContent(item)} title="">
        <Badge dot>
          <CloseCircleOutlined
            rev={undefined}
            className="cursor-pointer text-lg text-[#ff4d4f]"
          />
        </Badge>
      </Popover>
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
export const downloadReport = (item) => {
  const { tpcSoftwareReportMetric, name } = item;
  const metricScore = getMetricItemScore(tpcSoftwareReportMetric);
  let title = name + '选型评估报告';
  let head = [
    '指标名称',
    '维度',
    '得分',
    '风险',
    '风险详情',
    '风险重要性',
    '指标意义',
  ];
  let tableData = metricScore.map((item) => {
    console.log(item.指标名称);
    const row = head.map((z) => {
      if (z == '得分') {
        return item.score;
      } else if (z == '风险') {
        if (item.score >= 8 || item.score === null) {
          return '无';
        } else if (item.score >= 6) {
          return getWarningContent(item.指标名称);
        } else {
          return getErrorContent(item.指标名称);
        }
      } else if (z == '风险详情') {
        if (item.score >= 8 || item.score === null) {
          return '无';
        } else {
          const element = getDeital({ ...item });
          const text = getAllText(element);
          return text;
        }
      } else {
        return item[z];
      }
    });
    return row;
  });
  saveCSV(title, head, tableData).then(() => {
    console.log('success');
  });
};
