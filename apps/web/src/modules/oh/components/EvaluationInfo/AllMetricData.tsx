export const allMetricData = [
  {
    key: 'complianceLicense',
    detailRender: ({ licenseAccessList, licenseNonAccessList }) => {
      const url = (
        <a
          className="text-[#69b1ff]"
          target="_blank"
          href="https://gitee.com/openharmony/docs/blob/master/zh-cn/contribute/%E8%AE%B8%E5%8F%AF%E8%AF%81%E4%B8%8E%E7%89%B9%E6%AE%8A%E8%AE%B8%E5%8F%AF%E8%AF%81%E8%AF%84%E5%AE%A1%E6%8C%87%E5%AF%BC.md"
        >
          准入清单
        </a>
      );
      let res = null;
      if (licenseNonAccessList?.length > 0) {
        return (
          <span>
            不在{url}的许可证：{licenseNonAccessList.join('、')}
          </span>
        );
      } else {
        res = `引入软件未检测到许可证`;
      }
      return res;
    },
    维度: '合法合规',
    指标名称: '许可证包含',
    风险重要性: '高',
    指标意义: `引入软件许可证合规性检查\n\n【规则】\n1. 禁止选用无许可证、许可证不在准入清单的软件；\n【建议】\n1. 项目的所有源码包含许可头与版权声明；`,
  },
  {
    key: 'complianceDco',
    detailRender: ({ commitCount, commitDcoCount }) => {
      let res = `引入软件代码提交共有${commitCount}次，其中${commitDcoCount}次已签署 DCO。`;
      return res;
    },
    维度: '合法合规',
    指标名称: 'DCO',
    风险重要性: '中',
    指标意义:
      '引入软件代码提交者原创性声明签署检查\n\n【建议】\n1. 项目的提交者签署 DCO；',
  },
  {
    key: 'compliancePackageSig',
    detailRender: null,
    维度: '合法合规',
    指标名称: '软件包签名',
    风险重要性: '中',
    指标意义:
      '引入软件软件包数据签名校验检查\n\n【建议】\n1. 优先选取有官方数字签名校验的软件包入库；',
  },
  {
    key: 'complianceLicenseCompatibility',
    detailRender: (list) => {
      let res = `引入软件中有 License 存在兼容性问题`;
      list.map(({ license, licenseConflictList }) => {
        console.log(licenseConflictList);
        res += `${license}License 与 ${
          licenseConflictList && licenseConflictList.join(',')
        } 存在兼容性问题; `;
      });
      return res;
    },
    维度: '合法合规',
    指标名称: '许可证兼容性',
    风险重要性: '高',
    指标意义:
      '引入软件许可证兼容性检查\n\n【规则】\n1. 禁止引入项目级、文件级 License 存在兼容性问题的软件及版本；',
  },
  {
    key: 'ecologyDependencyAcquisition',
    detailRender: (list) => {
      return `未检测到以下依赖软件的 License：${list.join('、')}`;
    },
    维度: '技术生态',
    指标名称: '依赖可获得',
    风险重要性: '高',
    指标意义:
      '引入软件依赖源码可获得检查\n\n【规则】\n1. 项目依赖的库必须是开源软件，可公开获得。保留原开源软件的提交记录；',
  },
  {
    key: 'ecologyCodeMaintenance',
    detailRender: (codeUrl) => {
      return (
        <>
          可点击链接
          <a
            className="text-[#69b1ff]"
            target="_blank"
            href={'./analyze?label=' + codeUrl}
          >
            {' ' + window.location.origin + '/analyze?label=' + codeUrl + ' '}
          </a>
          前往该软件的 Oss-Compass 评估报告查看社区活跃度详情
        </>
      );
    },
    维度: '技术生态',
    指标名称: '代码维护',
    风险重要性: '高',
    指标意义:
      '社区活跃度及是否活跃维护检查\n\n【规则】\n1.根据社区贡献者数量、代码提交频率、组织数量、Issue 数量、版本发布次数等指标进行综合评分；',
  },
  {
    key: 'ecologyCommunitySupport',
    detailRender: (codeUrl) => {
      return (
        <>
          可点击链接
          <a
            className="text-[#69b1ff]"
            target="_blank"
            href={'./analyze?label=' + codeUrl}
          >
            {' ' + window.location.origin + '/analyze?label=' + codeUrl + ' '}
          </a>
          前往该软件的 Oss-Compass 评估报告查看社区服务与支撑详情
        </>
      );
    },
    维度: '技术生态',
    指标名称: '社区支撑',
    风险重要性: '高',
    指标意义:
      '社区服务与支撑检查\n\n【建议】\n1. 根据更新 Issue 数量、关闭 PR 数量、Issue 首次响应时间、PR 处理时间、Issue 评论频率、代码审查评论频率等指标进行综合评分；',
  },
  {
    key: 'ecologyAdoptionAnalysis',
    detailRender: null,
    维度: '技术生态',
    指标名称: '采用度分析',
    风险重要性: '中',
    指标意义:
      '引入软件采用度分析，优选在业界广泛应用软件\n\n【建议】\n1. 优选主流的供应商/社区或社区项目；\n2. 优选在业界成熟应用或产品实际使用效果好的软件；',
  },
  {
    key: 'ecologySoftwareQuality',
    detailRender: ({
      coverageRatio,
      coverageScore,
      duplicationRatio,
      duplicationScore,
    }) => {
      if (coverageRatio === null || coverageScore === null) return '无';
      let res = `项目内代码重复率为${duplicationRatio || 0}%，得分${
        duplicationScore || 0
      }；\n 项目内测试覆盖率为${coverageRatio || 0}%，得分${
        coverageScore || 0
      }。`;
      return res;
    },
    维度: '技术生态',
    指标名称: '软件质量',
    风险重要性: '中',
    指标意义:
      '引入软件质量分析，包含代码规范，圈复杂度，代码复用度，测试用例覆盖度\n\n【规则】\n1. 不符合技术架构与技术演进淘汰的软件禁止引入；\n【建议】\n1. 技术架构优选更安全、灵活度高、支持组件化、插件化的软件；\n2. 优选代码质量高的软件，如使用不安全函数数量/密度少、代码结构规范（圈复杂度低）、重复度低、代码调试功能可关闭、有自动化构建能力、自动化测试充分；',
  },
  {
    key: 'ecologyPatentRisk',
    detailRender: null,
    维度: '技术生态',
    指标名称: '专利风险',
    风险重要性: '中',
    指标意义:
      '引入软件专利风险分析\n\n【建议】\n1. 优先选择全球专利保护社区 OIN（Open Invention Network）认证软件，未认证软件需单独审视专利风险',
  },
  //   {
  //     key: 'lifecycleVersionNormalization',
  //     detailRender: null,
  //     维度：'生命周期',
  //     指标名称：'版本归一化',
  //     风险重要性：'高',
  //     指标意义：
  //       '一款软件只在 OpenHarmony 及 TPC 中引入一次\n\n【规则】\n1. 主动选型开源软件与被动依赖开源软件只有一个社区版本；',
  //   },
  // {
  //   key: 'lifecycleVersionNumber',
  //   detailRender: null,
  //   维度：'生命周期',
  //   指标名称：'版本号',
  //   风险重要性：'中',
  //   指标意义：
  //     '引入软件版本规范检查\n\n【规则】\n1. master 是分支，不是版本号，不能用 master 作为版本号引入；\n2. 引入官方发布版本（Release 版本），非正式版本（beta 等）未经过全面测试，不允许入库；',
  // },
  {
    key: 'lifecycleVersionLifecycle',
    detailRender: (item) => {
      if (!item) {
        return '';
      }
      const { archived, latestVersionCreatedAt, latestVersionName } = item;
      let res = ``;
      if (archived) {
        res = `引入软件已归档`;
      } else {
        if (!latestVersionName) {
          return `引入软件无 release 版本`;
        }
        res = `引入软件最新版本为${latestVersionName}，发布于${latestVersionCreatedAt?.slice(
          0,
          10
        )}。`;
      }
      return res;
    },
    维度: '生命周期',
    指标名称: '版本生命周期',
    风险重要性: '高',
    指标意义:
      '检查引入软件版本社区维护生命周期是否结束\n\n【建议】\n1. 优先选择 2 年以内有正式版本发布的软件（以评审节点计算）；\n2. 社区已经 EOL(归档) 的软件，不建议引入；',
  },
  {
    key: 'securityBinaryArtifact',
    detailRender: (item) => {
      return `软件存在以下二进制制品:\n${item?.join('、')}`;
    },
    维度: '网络安全',
    指标名称: '二进制制品',
    风险重要性: '高',
    指标意义:
      '引入软件源码仓库是否包含二进制制品\n\n【建议】\n不建议二进制引入，应从源码构建。如必要引入须在 TPC SIG 决策，并提供构建指导；',
  },
  {
    key: 'securityVulnerability',
    detailRender: (item) => {
      if (!item) {
        return '';
      }
      let res = ``;
      item.forEach((item) => {
        res += `依赖软件${item.packageName} (${
          item.packageVersion
        })，存在漏洞：${item.vulnerabilities.join('、')};
        `;
      });
      return res;
    },
    维度: '网络安全',
    指标名称: '安全漏洞',
    风险重要性: '高',
    指标意义:
      '检查引入软件及依赖源码是否有公开未修复漏洞\n\n【规则】\n1. 禁止选用含非误报病毒告警的软件（含被动依赖软件）；\n2. 禁止选用含已知未修复漏洞软件；',
  },
  {
    key: 'securityVulnerabilityResponse',
    detailRender: null,
    维度: '网络安全',
    指标名称: '漏洞响应机制',
    风险重要性: '高',
    指标意义:
      '引入软件漏洞响应机制检查\n\n【规则】\n1. 选用开源软件必须有漏洞反馈与修复跟踪管理机制；',
  },
  //   {
  //     key: 'securityVulnerabilityDisclosure',
  //     detailRender: null,
  //     维度：'网络安全',
  //     指标名称：'漏洞披露机制',
  //     风险重要性：'中',
  //     指标意义：
  //       '引入软件漏洞披露机制检查\n\n【建议】\n1. 优先选择有漏洞披露源的开源软件;',
  //   },
  //   {
  //     key: 'securityHistoryVulnerability',
  //     detailRender: null,
  //     维度：'网络安全',
  //     指标名称：'历史漏洞',
  //     风险重要性：'中',
  //     指标意义：'引入软件历史漏洞检查\n\n【建议】\n1. 优选漏洞较少的版本',
  //   },
];
//6 分 -8 分
const getWarningContent = (item) => {
  const { key } = item;
  const statusMessages = {
    complianceLicense: '许可证不在准入清单',
    complianceDco: '未检测到项目的提交者签署 DCO',
    compliancePackageSig: '软件包分发不包含数字校验',
    ecologyDependencyAcquisition: '未检测到项目依赖的开源软件的 License',
    ecologyCommunitySupport: '软件的社区服务与支撑综合评分有提升空间',
    ecologyCodeMaintenance: '软件的社区活跃度综合评分有提升空间',
    ecologySoftwareQuality: '软件质量分析未达标',
    lifecycleVersionLifecycle: '无明确声明周期声明软件及版本 2 年以上发布',
  };
  return statusMessages[key];
};
//6 分以下
const getErrorContent = (item) => {
  const { key } = item;
  const statusMessages = {
    complianceLicense: '未检测到许可证',
    complianceLicenseCompatibility:
      '引入软件项目级、文件级许可证存在兼容性问题',
    complianceDco: '未检测到项目的提交者签署 DCO',
    compliancePackageSig: '软件包分发不包含数字校验',
    ecologyDependencyAcquisition: '未检测到项目依赖的开源软件的 License',
    ecologyCommunitySupport: '软件的社区服务与支撑综合评分偏低',
    ecologyCodeMaintenance: '软件的社区活跃度综合评分偏低',
    ecologySoftwareQuality: '软件质量分析未达标',
    ecologyPatentRisk:
      '非全球专利保护社区 OIN（Open Invention Network）认证软件',
    lifecycleVersionLifecycle: '版本没有 release 或处于 EOL 阶段',
    securityBinaryArtifact: '引入软件源码仓库包含二进制制品',
    securityVulnerability: '引入软件及依赖源码有公开未修复漏洞',
    securityVulnerabilityResponse: '软件无漏洞响应机制',
    // 版本归一化：'该软件已在 OpenHarmony 及 TPC 中引入',
    // 版本号：'未检测到版本号或版本号不规范',
  };
  return statusMessages[key];
};
export const getRishContent = (item) => {
  const { score } = item;
  if (score >= 8 || score === -1 || score === null) {
    return '无';
  } else if (score >= 6) {
    return getWarningContent(item);
  } else {
    return getErrorContent(item);
  }
};
export const getRishDeitalContent = (item) => {
  const { detailRender, detail } = item;
  if (Array.isArray(detail) && detail?.length == 0) {
    return '无';
  }
  if (detailRender && detail) {
    return <>{detailRender(detail)}</>;
  } else if (detail) {
    return <>{detail}</>;
  } else {
    return '无';
  }
};
