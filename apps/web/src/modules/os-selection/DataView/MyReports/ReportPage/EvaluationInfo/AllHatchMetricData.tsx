import { useTranslation } from 'next-i18next';

const OATRender = (oatDetail, t) => {
  if (oatDetail?.length > 0) {
    if (oatDetail.length > 2) {
      return (
        <span title={t('all_hatch_metric_data.oat_render.more_alarm_tooltip')}>
          {t('all_hatch_metric_data.oat_render.alarm_prefix')}$
          {oatDetail.slice(0, 1)?.join('、')}; (
          {t('all_hatch_metric_data.oat_render.more_alarm_suffix')})
        </span>
      );
    } else {
      return `${t(
        'all_hatch_metric_data.oat_render.alarm_prefix'
      )}${oatDetail?.join('、')}; `;
    }
  }
  return '';
};
export const useAllMetricData = () => {
  const { t } = useTranslation('os-selection');

  const allMetricData = [
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
              {t('all_hatch_metric_data.compliance_license.osi_approved_link')}
            </a>
          );
          return (
            <span>
              {t(
                'all_hatch_metric_data.compliance_license.not_osi_approved_prefix'
              )}{' '}
              {url} ：{nonOsiLicenses?.join('、')}
            </span>
          );
        } else if (osiFreeRestrictedLicenses?.length > 0) {
          const url = (
            <a
              className="text-[#69b1ff]"
              target="_blank"
              href="https://scancode-licensedb.aboutcode.org/"
            >
              {t(
                'all_hatch_metric_data.compliance_license.permissive_license_link'
              )}
            </a>
          );
          return (
            <span>
              {t(
                'all_hatch_metric_data.compliance_license.non_permissive_prefix'
              )}
              {url}：{osiFreeRestrictedLicenses?.join('、')}
            </span>
          );
        } else if (osiCopyleftLimitedLicenses?.length > 0) {
          const url = (
            <a
              className="text-[#69b1ff]"
              target="_blank"
              href="https://scancode-licensedb.aboutcode.org/"
            >
              {t(
                'all_hatch_metric_data.compliance_license.weak_permissive_license_link'
              )}
            </a>
          );
          return (
            <span>
              {url}：{osiCopyleftLimitedLicenses?.join('、')}
            </span>
          );
        } else if (osiPermissiveLicenses?.length > 0) {
          res = t('all_hatch_metric_data.compliance_license.none');
        } else {
          res = t(
            'all_hatch_metric_data.compliance_license.no_project_license'
          );
        }
        return res;
      },
      维度: t('all_hatch_metric_data.dimension.legal_compliance'),
      指标名称: t('all_hatch_metric_data.metric_name.license_inclusion'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.compliance_license.check_items'
      ),
      指标意义: t('all_hatch_metric_data.compliance_license.significance'),
    },
    {
      key: 'complianceLicenseCompatibility',
      detailRender: ({ tpcDetail, oatDetail }) => {
        let res = '';
        if (tpcDetail?.length > 0) {
          res += t(
            'all_hatch_metric_data.license_compatibility.compatibility_issue_prefix'
          );
          tpcDetail.map(({ license, licenseConflictList }) => {
            res += `${license}${t(
              'all_hatch_metric_data.license_compatibility.license_with'
            )} ${licenseConflictList && licenseConflictList.join(',')}${t(
              'all_hatch_metric_data.license_compatibility.compatibility_issue_suffix'
            )}; `;
          });
        }
        return (
          <>
            {res?.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
            <span>{OATRender(oatDetail, t)}</span>
          </>
        );
      },
      维度: t('all_hatch_metric_data.dimension.legal_compliance'),
      指标名称: t('all_hatch_metric_data.metric_name.license_compatibility'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.license_compatibility.check_items'
      ),
      指标意义: t('all_hatch_metric_data.license_compatibility.significance'),
    },
    {
      key: 'ecologyPatentRisk',
      detailRender: null,
      维度: t('all_hatch_metric_data.dimension.legal_compliance'),
      指标名称: t('all_hatch_metric_data.metric_name.patent_risk'),
      风险重要性: t('all_hatch_metric_data.risk_importance.medium'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t('all_hatch_metric_data.patent_risk.check_items'),
      指标意义: t('all_hatch_metric_data.patent_risk.significance'),
    },
    {
      key: 'complianceDco',
      detailRender: ({ commitCount, commitDcoCount }) => {
        return t('all_hatch_metric_data.dco.detail', {
          commitCount,
          commitDcoCount,
        });
      },
      维度: t('all_hatch_metric_data.dimension.legal_compliance'),
      指标名称: t('all_hatch_metric_data.metric_name.dco'),
      风险重要性: t('all_hatch_metric_data.risk_importance.medium'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.no'),
      指标检查项及评分项: t('all_hatch_metric_data.dco.check_items'),
      指标意义: t('all_hatch_metric_data.dco.significance'),
    },
    {
      key: 'ecologyDependencyAcquisition',
      detailRender: (list) => {
        return t('all_hatch_metric_data.dependency_acquisition.detail', {
          list: list.join('、'),
        });
      },
      维度: t('all_hatch_metric_data.dimension.technical_ecology'),
      指标名称: t('all_hatch_metric_data.metric_name.dependency_acquisition'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.dependency_acquisition.check_items'
      ),
      指标意义: t('all_hatch_metric_data.dependency_acquisition.significance'),
    },
    {
      key: 'ecologyCodeMaintenance',
      detailRender: (codeUrl) => {
        return (
          <>
            {t('all_hatch_metric_data.code_maintenance.detail_prefix')}
            <a
              className="text-[#69b1ff]"
              target="_blank"
              href={'./analyze?label=' + codeUrl}
            >
              {' ' +
                (typeof window !== 'undefined' ? window.location.origin : '') +
                '/analyze?label=' +
                codeUrl +
                ' '}
            </a>
            {t('all_hatch_metric_data.code_maintenance.detail_suffix')}
          </>
        );
      },
      维度: t('all_hatch_metric_data.dimension.technical_ecology'),
      指标名称: t('all_hatch_metric_data.metric_name.code_maintenance'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.code_maintenance.check_items'
      ),
      指标意义: t('all_hatch_metric_data.code_maintenance.significance'),
    },
    {
      key: 'ecologyCommunitySupport',
      detailRender: (codeUrl) => {
        return (
          <>
            {t('all_hatch_metric_data.community_support.detail_prefix')}
            <a
              className="text-[#69b1ff]"
              target="_blank"
              href={'./analyze?label=' + codeUrl}
            >
              {' ' +
                (typeof window !== 'undefined' ? window.location.origin : '') +
                '/analyze?label=' +
                codeUrl +
                ' '}
            </a>
            {t('all_hatch_metric_data.community_support.detail_suffix')}
          </>
        );
      },
      维度: t('all_hatch_metric_data.dimension.technical_ecology'),
      指标名称: t('all_hatch_metric_data.metric_name.community_support'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.community_support.check_items'
      ),
      指标意义: t('all_hatch_metric_data.community_support.significance'),
    },
    {
      key: 'ecologyAdoptionAnalysis',
      detailRender: null,
      维度: t('all_hatch_metric_data.dimension.technical_ecology'),
      指标名称: t('all_hatch_metric_data.metric_name.adoption_analysis'),
      风险重要性: t('all_hatch_metric_data.risk_importance.medium'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.adoption_analysis.check_items'
      ),
      指标意义: t('all_hatch_metric_data.adoption_analysis.significance'),
    },
    {
      key: 'ecologySoftwareQuality',
      detailRender: ({
        coverageRatio,
        coverageScore,
        duplicationRatio,
        duplicationScore,
      }) => {
        if (coverageRatio === null || coverageScore === null)
          return t('all_hatch_metric_data.software_quality.none');
        return t('all_hatch_metric_data.software_quality.detail', {
          duplicationRatio: duplicationRatio || 0,
          duplicationScore: duplicationScore || 0,
          coverageRatio: coverageRatio || 0,
          coverageScore: coverageScore || 0,
        });
      },
      维度: t('all_hatch_metric_data.dimension.technical_ecology'),
      指标名称: t('all_hatch_metric_data.metric_name.software_quality'),
      风险重要性: t('all_hatch_metric_data.risk_importance.medium'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.no'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.software_quality.check_items'
      ),
      指标意义: t('all_hatch_metric_data.software_quality.significance'),
    },
    {
      key: 'lifecycleVersionLifecycle',
      detailRender: (item) => {
        if (!item) {
          return '';
        }
        const { archived, latestVersionCreatedAt, latestVersionName } = item;
        if (archived) {
          return t('all_hatch_metric_data.version_lifecycle.archived');
        }
        if (!latestVersionName) {
          return t('all_hatch_metric_data.version_lifecycle.no_release');
        }
        return t(
          'all_hatch_metric_data.version_lifecycle.latest_version_info',
          {
            latestVersionName,
            latestVersionCreatedAt: latestVersionCreatedAt?.slice(0, 10),
          }
        );
      },
      维度: t('all_hatch_metric_data.dimension.lifecycle'),
      指标名称: t('all_hatch_metric_data.metric_name.version_lifecycle'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.version_lifecycle.check_items'
      ),
      指标意义: t('all_hatch_metric_data.version_lifecycle.significance'),
    },
    {
      key: 'securityBinaryArtifact',
      detailRender: ({ tpcDetail, oatDetail }) => {
        let res = '';
        if (tpcDetail?.length > 0) {
          res += `${t(
            'all_hatch_metric_data.binary_artifact.exists_prefix'
          )}\n${tpcDetail?.join('、')}; `;
        }
        // OATRender is called within the return JSX, so no need to call it here for res string concatenation
        return (
          <>
            {res?.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
            <span>{OATRender(oatDetail, t)}</span>
          </>
        );
      },
      维度: t('all_hatch_metric_data.dimension.network_security'),
      指标名称: t('all_hatch_metric_data.metric_name.binary_artifact'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.binary_artifact.check_items'
      ),
      指标意义: t('all_hatch_metric_data.binary_artifact.significance'),
    },
    {
      key: 'securityVulnerability',
      detailRender: (item) => {
        if (!item) {
          return '';
        }
        let res = '';
        item.forEach((vuln) => {
          res += t('all_hatch_metric_data.vulnerability.detail_item', {
            packageName: vuln.packageName,
            packageVersion: vuln.packageVersion,
            vulnerabilities: vuln.vulnerabilities.join('、'),
          });
        });
        return res;
      },
      维度: t('all_hatch_metric_data.dimension.network_security'),
      指标名称: t('all_hatch_metric_data.metric_name.security_vulnerability'),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.yes'),
      指标检查项及评分项: t('all_hatch_metric_data.vulnerability.check_items'),
      指标意义: t('all_hatch_metric_data.vulnerability.significance'),
    },
    {
      key: 'securityVulnerabilityResponse',
      detailRender: null,
      维度: t('all_hatch_metric_data.dimension.network_security'),
      指标名称: t(
        'all_hatch_metric_data.metric_name.vulnerability_response_mechanism'
      ),
      风险重要性: t('all_hatch_metric_data.risk_importance.high'),
      是否必须澄清: t('all_hatch_metric_data.clarification_required.no'),
      指标检查项及评分项: t(
        'all_hatch_metric_data.vulnerability_response.check_items'
      ),
      指标意义: t('all_hatch_metric_data.vulnerability_response.significance'),
    },
  ];
  //8 分
  const getContent8 = (item) => {
    const { key } = item;
    const i18nKey = `all_hatch_metric_data.score8.${key}`;
    const message = t(i18nKey, { returnObjects: true });
    // Fallback if key doesn't exist or isn't a string
    return typeof message === 'string'
      ? message
      : t('all_hatch_metric_data.score_messages.default_8');
  };
  //6 分
  const getWarningContent = (item) => {
    const { key } = item;
    const i18nKey = `all_hatch_metric_data.score6.${key}`;
    const message = t(i18nKey, { returnObjects: true });
    return typeof message === 'string'
      ? message
      : t('all_hatch_metric_data.score_messages.default_6');
  };
  //6 分以下
  const getErrorContent = (item) => {
    const { key } = item;
    const i18nKey = `all_hatch_metric_data.score_less_than_6.${key}`;
    const message = t(i18nKey, { returnObjects: true });
    return typeof message === 'string'
      ? message
      : t('all_hatch_metric_data.score_messages.default_less_than_6');
  };

  const getRishContent = (item) => {
    const { score } = item;
    if (score >= 10 || score === -1 || score === null) {
      return t('all_hatch_metric_data.risk_content.none');
    } else if (score >= 8) {
      return getContent8(item);
    } else if (score >= 6) {
      return getWarningContent(item);
    } else {
      return getErrorContent(item);
    }
  };

  const getRishDeitalContent = (item) => {
    const { detailRender, detail, score } = item;
    if (score === 10) {
      return t('all_hatch_metric_data.risk_detail.none');
    }
    if (Array.isArray(detail) && detail?.length === 0) {
      return t('all_hatch_metric_data.risk_detail.none');
    }
    if (detailRender && detail) {
      // Pass t function to detailRender if it expects it
      // This requires detailRender functions to be adapted to accept t as a parameter if they need it.
      // For now, assuming detailRender handles its own text or gets it from props.
      return detailRender(detail, t);
    } else if (detail) {
      return <>{detail}</>;
    } else {
      return t('all_hatch_metric_data.risk_detail.none');
    }
  };

  return { allMetricData, getRishContent, getRishDeitalContent, OATRender };
};
//8 分
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
//6 分
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
  };
  return statusMessages[key];
};
//6 分以下
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
    // 版本归一化:'该软件已在 OpenHarmony 及 TPC 中引入',
    // 版本号:'未检测到版本号或版本号不规范',
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
