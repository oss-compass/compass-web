import { toFixed } from '@common/utils';

export const allMetricData = [
  {
    key: 'complianceLicense',
    维度: '合法合规',
    指标名称: '许可证包含',
    风险重要性: '高',
    指标意义: `引入软件许可证合规性检查\n\n【规则】\n1. 禁止选用无许可证、许可证不在准入清单的软件；\n【建议】\n1. 项目的所有源码包含许可头与版权声明；`,
  },
  {
    key: 'complianceDco',
    维度: '合法合规',
    指标名称: 'DCO',
    风险重要性: '中',
    指标意义:
      '引入软件代码提交者原创性声明签署检查\n\n【建议】\n1. 项目的提交者签署 DCO;',
  },
  {
    key: 'compliancePackageSig',
    维度: '合法合规',
    指标名称: '软件包签名',
    风险重要性: '中',
    指标意义:
      '引入软件软件包数据签名校验检查\n\n【建议】\n1. 优先选取有官方数字签名校验的软件包入库；',
  },
  {
    key: 'complianceLicenseCompatibility',
    维度: '合法合规',
    指标名称: '许可证兼容性',
    风险重要性: '高',
    指标意义:
      '引入软件许可证兼容性检查\n\n【规则】\n1. 禁止引入项目级、文件级 License 存在兼容性问题的软件及版本；',
  },
  {
    key: 'ecologyDependencyAcquisition',
    维度: '技术生态',
    指标名称: '依赖可获得',
    风险重要性: '高',
    指标意义:
      '引入软件依赖源码可获得检查\n\n【规则】\n1. 项目依赖的库必须是开源软件，可公开获得。保留原开源软件的提交记录',
  },
  {
    key: 'ecologyCodeMaintenance',
    维度: '技术生态',
    指标名称: '代码维护',
    风险重要性: '高',
    指标意义:
      '社区活跃度及是否活跃维护检查\n\n【规则】\n1. 选用成熟期（代码更新活跃，定期发布）或成长期（代码更新活跃，频繁发布）的软件，禁止选用处于衰退期（代码无更新或无新版本发布）的软件；',
  },
  {
    key: 'ecologyCommunitySupport',
    维度: '技术生态',
    指标名称: '社区支撑',
    风险重要性: '高',
    指标意义:
      '社区服务与支撑检查\n\n【建议】\n1. 社区无明确版本计划，有效 bug、PR 半年以上未响应不建议选用；',
  },
  {
    key: 'ecologyAdoptionAnalysis',
    维度: '技术生态',
    指标名称: '采用度分析',
    风险重要性: '中',
    指标意义:
      '引入软件采用度分析，优选在业界广泛应用软件\n\n【建议】\n1. 优选主流的供应商/社区或社区项目；\n2. 优选在业界成熟应用或产品实际使用效果好的软件；',
  },
  {
    key: 'ecologySoftwareQuality',
    维度: '技术生态',
    指标名称: '软件质量',
    风险重要性: '中',
    指标意义:
      '引入软件质量分析，包含代码规范，圈复杂度，代码复用度，测试用例覆盖度\n\n【规则】\n1. 不符合技术架构与技术演进淘汰的软件禁止引入；\n【建议】\n1. 技术架构优选更安全、灵活度高、支持组件化、插件化的软件；\n2. 优选代码质量高的软件，如使用不安全函数数量/密度少、代码结构规范（圈复杂度低）、重复度低、代码调试功能可关闭、有自动化构建能力、自动化测试充分；',
  },
  {
    key: 'ecologyPatentRisk',
    维度: '技术生态',
    指标名称: '专利风险',
    风险重要性: '中',
    指标意义:
      '引入软件专利风险分析\n\n【建议】\n1. 优先选择全球专利保护社区 OIN（Open Invention Network）认证软件，未认证软件需单独审视专利风险',
  },
  {
    key: 'lifecycleVersionNormalization',
    维度: '生命周期',
    指标名称: '版本归一化',
    风险重要性: '高',
    指标意义:
      '一款软件只在 OpenHarmony 及 TPC 中引入一次\n\n【规则】\n1. 主动选型开源软件与被动依赖开源软件只有一个社区版本；',
  },
  {
    key: 'lifecycleVersionNumber',
    维度: '生命周期',
    指标名称: '版本号',
    风险重要性: '中',
    指标意义:
      '引入软件版本规范检查\n\n【规则】\n1. master 是分支，不是版本号，不能用 master 作为版本号引入；\n2. 引入官方发布版本（Release 版本），非正式版本（beta 等）未经过全面测试，不允许入库；',
  },
  {
    key: 'lifecycleVersionLifecycle',
    维度: '生命周期',
    指标名称: '版本生命周期',
    风险重要性: '高',
    指标意义:
      '检查引入软件版本社区维护生命周期是否结束\n\n【建议】\n1. 优先选择 2 年以内发布的版本（以评审节点计算）；\n2. 社区已经 EOL 的版本，不建议引入；',
  },
  {
    key: 'securityBinaryArtifact',
    维度: '网络安全',
    指标名称: '二进制制品',
    风险重要性: '高',
    指标意义:
      '引入软件源码仓库是否包含二进制制品\n\n【建议】\n不建议二进制引入，应从源码构建。如必要引入须在 TPC SIG 决策，并提供构建指导；',
  },
  {
    key: 'securityVulnerability',
    维度: '网络安全',
    指标名称: '安全漏洞',
    风险重要性: '高',
    指标意义:
      '检查引入软件及依赖源码是否有公开未修复漏洞\n\n【规则】\n1. 禁止选用含非误报病毒告警的软件（含被动依赖软件）；\n2. 禁止选用含已知未修复漏洞软件；',
  },
  {
    key: 'securityVulnerabilityResponse',
    维度: '网络安全',
    指标名称: '漏洞响应机制',
    风险重要性: '高',
    指标意义:
      '引入软件漏洞响应机制检查\n\n【规则】\n1. 选用开源软件必须有漏洞反馈与修复跟踪管理机制；',
  },
  {
    key: 'securityVulnerabilityDisclosure',
    维度: '网络安全',
    指标名称: '漏洞披露机制',
    风险重要性: '中',
    指标意义:
      '引入软件漏洞披露机制检查\n\n【建议】\n1. 优先选择有漏洞披露源的开源软件;',
  },
  {
    key: 'securityHistoryVulnerability',
    维度: '网络安全',
    指标名称: '历史漏洞',
    风险重要性: '中',
    指标意义: '引入软件历史漏洞检查\n\n【建议】\n1. 优选漏洞较少的版本',
  },
];
const metric = ['合法合规', '技术生态', '生命周期', '网络安全'];

export const getEvaluationDetail = (row) => {
  const evaluationDetail = metric.map((item) => {
    //计算每个维度的总分
    const d = allMetricData.filter((i) => i.维度 === item);
    //   const score = d.reduce((acc, cur) => {
    //     console.log(cur.key, row?.tpcSoftwareReportMetric?.[cur.key]);
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
  const score: number = toFixed(scoreTotal / metric.length, 0);
  console.log(evaluationDetail);
  return { ...row, evaluationDetail, score };
};
export const getMetricScore = (rowData) => {
  const res = rowData.map((row) => {
    return getEvaluationDetail(row);
  });
  return res;
};
export const getMetricItemScore = (rowData) => {
  return allMetricData.map((item) => {
    return {
      ...item,
      score: rowData?.[item.key] || 0,
    };
  });
};
//6 分
export const getWarningConent = (name) => {
  switch (name) {
    case '许可证包含':
      return '许可证不在准入清单';
    case 'DCO':
      return '未检测到项目的提交者签署 DCO';
    case '依赖可获得':
      return '未检测到项目依赖的开源软件的提交记录';
    case '代码维护':
      return '过去 90 天平均每周少于 1 次代码提交';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以内响应';
    case '安全漏洞':
      return '引入软件及依赖源码有公开未修复漏洞';
    case '历史漏洞':
      return '引入开源软件年漏洞 5 个以上';
    case '采用度分析':
      return '包管理平台下载数据量较低';
    case '软件质量':
      return '引入软件仓库未包含 Static Application Security Testing (SAST)';
    case '软件包签名':
      return '软件包分发不包含数字校验';
    case '漏洞披露机制':
      return '软件未检测到漏洞披露机制';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以内响应';
  }
};
//0 分
export const getErrorConent = (name) => {
  switch (name) {
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
    case '专利风险':
      return '非全球专利保护社区 OIN（Open Invention Network）认证软件';
    case '代码维护':
      return '项目未有正式版本发布';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以上响应';
    case '版本生命周期':
      return '版本处于 EOL 阶段';
    case '漏洞响应机制':
      return '软件无漏洞响应机制';
  }
};

export const setUrlHost = (url) => {
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  } else {
    return `//${url}`;
  }
};
