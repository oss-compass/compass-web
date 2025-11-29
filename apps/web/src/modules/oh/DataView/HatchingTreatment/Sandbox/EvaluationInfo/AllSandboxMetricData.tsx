const OATRender = (oatDetail) => {
  if (oatDetail?.length > 0) {
    if (oatDetail.length > 2) {
      return (
        <span title="更多告警信息请下载报告 csv 查看">
          以下告警来自 oat 扫描：${oatDetail.slice(0, 1)?.join('、')};
          (更多告警信息请下载报告 csv 查看)
        </span>
      );
    } else {
      return `以下告警来自 oat 扫描：${oatDetail?.join('、')}; `;
    }
  }
  return '';
};
export const allMetricData = [
  {
    key: 'complianceLicense',
    detailRender: ({
      nonOsiLicenses,
      osiCopyleftLimitedLicenses,
      osiFreeRestrictedLicenses,
      osiPermissiveLicenses,
    }) => {
      let res = null;
      if (nonOsiLicenses?.length > 0) {
        const url = (
          <a
            className="text-[#69b1ff]"
            target="_blank"
            href="https://spdx.org/licenses/"
          >
            OSI 批准的开源许可证
          </a>
        );
        return (
          <span>
            不是 {url} ：{nonOsiLicenses?.join('、')}
          </span>
        );
      } else if (osiFreeRestrictedLicenses?.length > 0) {
        const url = (
          <a
            className="text-[#69b1ff]"
            target="_blank"
            href="https://scancode-licensedb.aboutcode.org/"
          >
            宽松型许可证
          </a>
        );
        return (
          <span>
            非{url}：{osiFreeRestrictedLicenses?.join('、')}
          </span>
        );
      } else if (osiCopyleftLimitedLicenses?.length > 0) {
        const url = (
          <a
            className="text-[#69b1ff]"
            target="_blank"
            href="https://scancode-licensedb.aboutcode.org/"
          >
            弱宽松型许可证
          </a>
        );
        return (
          <span>
            {url}：{osiCopyleftLimitedLicenses?.join('、')}
          </span>
        );
      } else if (osiPermissiveLicenses?.length > 0) {
        res = `无`;
      } else {
        res = `未检测到项目级许可证`;
      }
      return res;
    },
    维度: '合法合规',
    指标名称: '许可证包含',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分。许可证是 OSI 批准的，且宽松型许可证 10 分，弱宽松型许可证 8 分，非宽松型许可证 6 分；无项目级许可证或许可证不是 OSI 批准的开源许可证 0 分；',
    指标意义: `引入软件许可证合规性检查\n\n【规则】\n1.禁止选用无许可证、许可证不是开源促进会 OSI 批准的开源许可证的软件；\n【建议】\n1.选择软件本身许可证（含项目级和文件级）及其依赖软件许可证均为宽松类型许可证的软件；
    2. 项目的所有源码包含许可头与版权声明；`,
  },
  {
    key: 'complianceLicenseCompatibility',
    detailRender: ({ tpcDetail, oatDetail }) => {
      let res = '';
      if (tpcDetail?.length > 0) {
        res += `引入软件中有 License 存在兼容性问题:`;
        tpcDetail.map(({ license, licenseConflictList }) => {
          res += `${license}License 与 ${
            licenseConflictList && licenseConflictList.join(',')
          } 存在兼容性问题; `;
        });
      }
      return (
        <>
          {res?.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          <span>{OATRender(oatDetail)}</span>
        </>
      );
    },
    维度: '合法合规',
    指标名称: '许可证兼容性',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分。引入软件项目级、文件级许可证存在兼容性问题 0 分，无兼容性问题 10 分；',
    指标意义:
      '引入软件许可证兼容性检查\n\n【规则】\n1. 禁止引入项目级、文件级 License 存在兼容性问题的软件及版本；',
  },
  {
    key: 'ecologyDependencyAcquisition',
    detailRender: (list) => {
      return `未检测到以下依赖软件的 License:${list.join('、')}`;
    },
    维度: '技术生态',
    指标名称: '依赖可获得',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分。引入软件依赖的库是开源软件 10 分；依赖软件非开源软件 0 分；',
    指标意义:
      '引入软件依赖源码可获得检查\n\n【规则】\n1. 项目依赖的库必须是开源软件，可公开获得；',
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
          前往该软件的 OSS-Compass 评估报告查看社区活跃度详情
        </>
      );
    },
    维度: '技术生态',
    指标名称: '代码维护',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分，采用 OSS-Compass 最近一年活跃度模型平均得分，得分范围 0-10 分',
    指标意义:
      '社区活跃度及是否活跃维护检查\n\n【规则】\n1.选用成熟期（代码更新活跃，定期发布）或成长期（代码更新活跃，频繁发布）的软件，禁止选用处于衰退期（代码无更新或无新版本发布）的软件；',
  },
  {
    key: 'ecologyAdaptationMethod',
    detailRender: null,
    维度: '技术生态',
    指标名称: '适配方式',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分。JS/TS 适配 10 分；C/C++ 库移植 10 分；仅作为实现参考 8 分；Java 库重写 6 分',
    指标意义:
      'OH TPC 适配方式及引入成本评估\n\n【建议】\n优先采用“JS/TS 适配”、“C/C++ 库移植”方式引入 TPC 软件；不建议采用“仅作为实现参考”、“Java 库重写”方式引入；',
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
    是否必须澄清: '否',
    指标检查项及评分项:
      '设置评分，代码重复率评分：0% - 2%   => 10 分; 3% - 4%   => 8 分;5% - 9%   => 6 分;10% - 19% => 4 分;20% - 99% => 2 分;100%      => 0 分',
    指标意义:
      '引入软件质量分析，包含代码规范，圈复杂度，代码复用度，测试用例覆盖度\n\n【规则】\n1. 不符合技术架构与技术演进淘汰的软件禁止引入；\n【建议】\n1. 技术架构优选更安全、灵活度高、支持组件化、插件化的软件；\n2. 优选代码质量高的软件，如使用不安全函数数量/密度少、代码结构规范（圈复杂度低）、重复度低、代码调试功能可关闭、有自动化构建能力、自动化测试充分；',
  },
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
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分。最近 2 年内有版本发布 10 分，版本发布超过 2 年 6 分，没有发布任何版本 4 分，仓库已归档 0 分',
    指标意义:
      '检查引入软件版本社区维护生命周期是否结束\n\n【建议】\n1. 优先选择 2 年以内有正式版本发布的软件（以评审节点计算）；\n2. 社区已经 EOL(归档) 的软件，不建议引入；',
  },
  {
    key: 'securityBinaryArtifact',
    detailRender: ({ tpcDetail, oatDetail }) => {
      let res = '';
      if (tpcDetail?.length > 0) {
        res += `软件存在以下二进制制品:\n${tpcDetail?.join('、')}; `;
      }
      if (oatDetail?.length > 0) {
        res += `以下告警来自 oat 扫描：${oatDetail?.join('、')}; `;
      }
      return (
        <>
          {res?.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          <span>{OATRender(oatDetail)}</span>
        </>
      );
    },
    维度: '网络安全',
    指标名称: '二进制制品',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
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
        })，存在漏洞:${item.vulnerabilities.join('、')};\n        `;
      });
      return res;
    },
    维度: '网络安全',
    指标名称: '安全漏洞',
    风险重要性: '高',
    是否必须澄清: '是',
    指标检查项及评分项:
      '设置评分。无公开未修复漏洞 10 分，有公开未修复漏洞 0 分；',
    指标意义:
      '检查引入软件及依赖源码是否有公开未修复漏洞\n\n【规则】\n1. 禁止选用含非误报病毒告警的软件（含被动依赖软件）\n2. 禁止选用含已知未修复漏洞软件；',
  },
];
const getContent8 = (item) => {
  const { key } = item;
  const statusMessages = {
    complianceLicense: '许可证为弱宽松型许可证',
    complianceDco: '部分项目的提交者签署 DCO',
    ecologyCommunitySupport: '软件的社区服务与支撑综合评分有提升空间',
    ecologyCodeMaintenance: '软件的社区活跃度综合评分有提升空间',
    ecologySoftwareQuality: '软件质量分析未达标',
    ecologyAdaptationMethod: '未采用“JS/TS 适配”、“C/C++ 库移植”方式引入',
  };
  return statusMessages[key];
};
const getWarningContent = (item) => {
  const { key } = item;
  const statusMessages = {
    complianceLicense: '许可证为非宽松型许可证',
    complianceDco: '未检测到项目的提交者签署 DCO',
    compliancePackageSig: '软件包分发不包含数字校验',
    ecologyDependencyAcquisition: '未检测到项目依赖的开源软件的 License',
    ecologyCommunitySupport: '软件的社区服务与支撑综合评分有提升空间',
    ecologyCodeMaintenance: '软件的社区活跃度综合评分有提升空间',
    ecologySoftwareQuality: '软件质量分析未达标',
    lifecycleVersionLifecycle: '无明确声明周期声明软件及版本 2 年以上发布',
    ecologyAdaptationMethod: '未采用“JS/TS 适配”、“C/C++ 库移植”方式引入',
    upstreamCollaborationStrategy:
      '未采用上游社区贡献协同策略，需要社区开源能力代表角色审批',
  };
  return statusMessages[key];
};
const getErrorContent = (item) => {
  const { key } = item;
  const statusMessages = {
    complianceLicense: '无项目级许可证或许可证不是 OSI 批准的开源许可证',
    complianceLicenseCompatibility:
      '引入软件项目级、文件级许可证存在兼容性问题或存在 oat 告警',
    complianceDco: '未检测到项目的提交者签署 DCO',
    compliancePackageSig: '软件包分发不包含数字校验',
    ecologyDependencyAcquisition: '未检测到项目依赖的开源软件的 License',
    ecologyCommunitySupport: '软件的社区服务与支撑综合评分偏低',
    ecologyCodeMaintenance: '软件的社区活跃度综合评分偏低',
    ecologySoftwareQuality: '软件质量分析未达标',
    ecologyPatentRisk:
      '非全球专利保护社区 OIN（Open Invention Network）认证软件',
    lifecycleVersionLifecycle: '版本没有 release 或处于 EOL 阶段',
    securityBinaryArtifact: '引入软件源码仓库包含二进制制品或存在 oat 告警',
    securityVulnerability: '引入软件及依赖源码有公开未修复漏洞',
    securityVulnerabilityResponse: '软件无漏洞响应机制',
    upstreamCollaborationStrategy:
      '未采用上游社区贡献协同策略，需要社区开源能力代表角色审批',
  };
  return statusMessages[key];
};
export const getRishContent = (item) => {
  const { score } = item;
  if (score >= 10 || score === -1 || score === null) {
    return '无';
  } else if (score >= 8) {
    return getContent8(item);
  } else if (score >= 6) {
    return getWarningContent(item);
  } else {
    return getErrorContent(item);
  }
};
export const getRishDeitalContent = (item) => {
  const { detailRender, detail, score } = item;
  if (score === 10) {
    return '无';
  }
  if (Array.isArray(detail) && detail?.length == 0) {
    return '无';
  }
  if (detailRender && detail) {
    return detailRender(detail);
  } else if (detail) {
    return <>{detail}</>;
  } else {
    return '无';
  }
};
