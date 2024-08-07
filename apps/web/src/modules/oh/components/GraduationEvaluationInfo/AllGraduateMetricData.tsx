import { toFixed } from '@common/utils';

export const allMetricData = [
  {
    key: 'ecologyReadme',
    detailRender: null,
    维度: '技术生态',
    指标名称: 'README',
    '风险重要性\n(去除)': '高',
    指标意义:
      '仓库须在特定位置包含 README 文档，且命名、内容符合规范（简明扼要地描述本项目的功能，显示项目的孵化状态）。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'CLOMonitor',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目首页简明扼要地描述本项目的功能，并显示项目的孵化状态。',
    检查方式: '规则检查工具 - 后端\n',
    规则类型: 'OH',
    是否已有: '0',
    责任: '国强、兴友',
  },
  {
    key: 'ecologyBuildDoc',
    detailRender: null,
    维度: '技术生态',
    指标名称: '构建文档',
    '风险重要性\n(去除)': '高',
    指标意义: '仓库须在特定位置或 README 中提供构建文档。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'CLOMonitor',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）': '项目在清晰的位置提供构建本项目的指导文档。',
    检查方式: '规则检查工具 - 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '国强、兴友',
  },
  {
    key: 'ecologyInterfaceDoc',
    detailRender: null,
    维度: '技术生态',
    指标名称: '接口文档',
    '风险重要性\n(去除)': '高',
    指标意义: '仓库须在特定位置提供接口文档。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'CLOMonitor',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目在清晰的位置提供本项目的对外接口文档，如果该项目可供最终用户直接使用，需要提供对应的用户指南。',
    检查方式: '规则检查工具 - 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '国强、兴友',
  },
  {
    key: 'complianceCopyrightStatement',
    detailRender: ({ includeCopyrights, notIncludedCopyrights }) => {
      let res = null;
      if (notIncludedCopyrights?.length > 0) {
        res = `不包含的许可证的源码文件：${notIncludedCopyrights?.join('、')}`;
      } else if (includeCopyrights?.length > 0) {
        return <span>包含的许可证：{includeCopyrights?.join('、')}</span>;
      } else {
        res = `无`;
      }
      return res;
    },
    维度: '合法合规',
    指标名称: '许可头与版权声明',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化软件源文件许可头与版权声明检查：项目的所有源码必须包含许可头与版权声明。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'OH 社区',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目的所有源码必须包含许可头与版权声明。\n许可证使用遵循<TPC 代码许可证指导>：\n1. 针对贡献者的原创代码，建议采用 Apache License 2.0 (Apache-2.0) \n2. 针对衍生作品代码，建议贡献者**必须检视并判断**本衍生作品代码的上游软件的许可证是否允许贡献者将本衍生作品代码进行开源贡献，以及上游软件的许可证允许贡献者采用何种许可证进行贡献。',
    检查方式: 'scancode 扫描工具 - 后端',
    规则类型: 'OH',
    是否已有: '0.5',
    责任: '国强',
  },
  {
    key: 'securityBinaryArtifact',
    detailRender: null,
    维度: '网络安全',
    指标名称: '二进制制品',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化软件源码仓库是否包含二进制制品检查：源码仓库包含二进制增加用户风险，不允许。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'ScoreCard',
    数据来源: 'OSS-Compass',
    涉及阶段: '引入、孵化毕业',
    '检查条目（社区要求）':
      '原则上不允许二进制交付，特殊场景二进制交付都需要同时提供对应的源码；',
    检查方式: '二进制检查工具 - 后端',
    规则类型: 'OH 改',
    是否已有: '1',
    责任: '',
  },
  {
    key: 'complianceDco',
    detailRender: ({ commitCount, commitDcoCount }) => {
      let res = `软件代码提交共有${commitCount}次，其中${commitDcoCount}次已签署 DCO。`;
      return res;
    },
    维度: '合法合规',
    指标名称: 'DCO',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化项目代码提交者原创性声明签署检查：所有孵化期新增代码代码提交者都应签署 DCO。',
    指标检查项及评分项:
      '设置评分。项目孵化期所有贡献者签署 DCO 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'CLOMonitor',
    数据来源: 'OSS-Compass',
    涉及阶段: '引入、孵化毕业',
    '检查条目（社区要求）': '项目 Committer 都签署 DCO 协议',
    检查方式: 'DCO-检查工具 - 后端',
    规则类型: 'OH',
    是否已有: '1',
    责任: '',
  },
  {
    key: 'complianceLicense',
    detailRender: ({ nonOsiLicenses, osiPermissiveLicenses }) => {
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
      } else if (osiPermissiveLicenses?.length > 0) {
        res = `无`;
      } else {
        res = `未检测到项目级许可证`;
      }
      return res;
    },
    维度: '合法合规',
    指标名称: '许可证包含',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化软件许可证合规性检查：仓库标准位置包含许可证且许可证为 OSI 批准的开源许可证。引用或适配的开源软件必须在其根目录提供 README.OpenSource 文件，在该文件中准确描述上游软件名、许可证、许可文件位置、版本、对应版本的上游社区地址、软件的维护 Owner、功能描述。',
    指标检查项及评分项: '设置评分。满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'ScoreCard',
    数据来源: 'OSS-Compass',
    涉及阶段: '引入、孵化毕业',
    '检查条目（社区要求）':
      '项目包含的许可证为 OSI 批准的，且其许可证及其依赖软件的许可证不会比 OpenHarmony 项目的许可证添加更多的限制。\n引用或适配的开源软件必须在其根目录提供 README.OpenSource 文件，在该文件中准确描述上游软件名、许可证、许可文件位置、版本、对应版本的上游社区地址、软件的维护 Owner、功能描述',
    检查方式: 'scancode 扫描工具 - 后端\nREADME.OpenSource 文件检查 - 后端',
    规则类型: 'OH',
    是否已有: '0.5',
    责任: '国强',
  },
  {
    key: 'complianceLicenseCompatibility',
    detailRender: (list) => {
      let res = `引入软件中有 License 存在兼容性问题:`;
      list.map(({ license, licenseConflictList }) => {
        res += `${license}License 与 ${
          licenseConflictList && licenseConflictList.join(',')
        } 存在兼容性问题; `;
      });
      return res;
    },
    维度: '合法合规',
    指标名称: '许可证兼容性',
    '风险重要性\n(去除)': '高',
    指标意义:
      '软件许可证兼容性检查\n\n针对衍生作品代码，检查上游软件的许可证是否允许贡献者将本衍生作品代码进行开源贡献，以及上游软件的许可证允许贡献者采用何种许可证进行贡献。',
    指标检查项及评分项:
      '设置评分。软件项目级、文件级许可证存在兼容性问题 0 分，无兼容性问题 10 分；',
    修复建议: '',
    指标业界实践: 'OSTMS',
    数据来源: 'OSS-Compass',
    涉及阶段: '引入',
    '检查条目（社区要求）':
      '许可证使用遵循<TPC 代码许可证指导>：\n1. 针对贡献者的原创代码，建议采用 Apache License 2.0 (Apache-2.0) \n2. 针对衍生作品代码，建议贡献者**必须检视并判断**本衍生作品代码的上游软件的许可证是否允许贡献者将本衍生作品代码进行开源贡献，以及上游软件的许可证允许贡献者采用何种许可证进行贡献。',
    检查方式: 'Scancode 扫描 - 后端',
    规则类型: '新增',
    是否已有: '1',
    责任: '国强',
  },
  {
    key: 'complianceCopyrightStatementAntiTamper',
    detailRender: null,
    维度: '合法合规',
    指标名称: '许可证与版权声明防篡改',
    '风险重要性\n(去除)': '高',
    指标意义:
      '软件涉及第三方开源软件的许可证和版权声明篡改检查：通过上游软件衍生的作品应当完整保留原上游软件的 License 及 Copyright 信息，项目中不能篡改第三方开源软件的许可证和版权声明。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'ScoreCard',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目中不能篡改第三方开源软件的许可证和版权声明\n2.  衍生的作品需保留原上游软件许可证信息，并在版权头中注明改写者信息，同时增加 base on（上游软件信息）',
    检查方式: 'Scanoss 扫描（待接入）- 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '国强',
  },
  {
    key: 'ecologyIssueManagement',
    detailRender: ({ issueCount, issueTypeList }) => {
      let res = '';
      if (issueCount) {
        res += `Issue 数量：${issueCount}；`;
        if (issueTypeList?.length > 0) {
          res += `Issue 分类：${issueTypeList.join('、')}；`;
        } else {
          res += `未对登记的 issue 进行合理的分类或分级`;
        }
      }

      if (!issueCount && issueTypeList?.length === 0) {
        res += '未实现 Issue 跟踪和分类';
      }
      return res;
    },
    维度: '技术生态',
    指标名称: '问题管理机制',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化软件问题管理、跟踪系统检查：项目必须提供 issue 跟踪所有问题，并对登记的 issue 应进行合理的分类、分级。',
    指标检查项及评分项:
      '设置评分。项目提供 issue 跟踪所有问题 6 分，未实现 0 分，对登记的 issue 应进行合理的分类或分级 8 分，分类且分级 10 分',
    修复建议: '',
    指标业界实践: 'OH 社区',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目必须提供 issue 跟踪所有问题，并对登记的 issue 应进行合理的分类、分级。',
    检查方式: 'comass 检查 - 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '升保、兴友',
  },
  {
    key: 'ecologyIssueResponseRatio',
    detailRender: ({ issueCount, issueResponseCount, issueResponseRatio }) => {
      let res = '';
      if (issueCount !== null) {
        res += `过去 6 个月 Issue 数量：${issueCount}；`;
        if (issueResponseCount !== null) {
          res += `Issue 响应数量：${issueResponseCount}；`;
        }
        if (issueResponseRatio !== null) {
          res += `Issue 响应比例：${
            toFixed(issueResponseRatio * 100, 2) + '%'
          }；`;
        }
      } else {
        res = '无';
      }
      return res;
    },
    维度: '技术生态',
    指标名称: '问题响应比例',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化软件问题响应检查：项目需响应过去 2~12 个月的大多数 Issues（>80%)。',
    指标检查项及评分项:
      '设置评分。项目过去 6 个月的 Issues 响应比例 80% 以下 6 分，以上 10 分',
    修复建议: '',
    指标业界实践: 'OSS-Compass',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目必须响应过去 2~12 个月的大多数 Issues（>80%)。',
    检查方式: 'compass 检查 - 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '升保、兴友',
  },
  {
    key: 'ecologyIssueResponseTime',
    detailRender: ({ issueResponseCount, issueResponseTime }) => {
      let res = '';
      if (issueResponseCount !== null) {
        res += `Issue 响应数量：${issueResponseCount}；`;
        if (issueResponseTime !== null) {
          res += `Issue 响应时间：${issueResponseTime}；`;
        }
      } else {
        res = '无';
      }
      return res;
    },
    维度: '技术生态',
    指标名称: '问题响应时长',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化软件问题时长检查：项目在过去 6 个月收到的本项目涉及的三方软件的任何漏洞报告的初始响应时间必须小于或等于 14 天。',
    指标检查项及评分项:
      '设置评分。项目在过去 6 个月收到的本项目涉及的三方软件的任何漏洞报告的初始响应时间小于或等于 14 天 10 分，14 天到 30 天 8 分，未响应 0 分，其他 6 分',
    修复建议: '',
    指标业界实践: 'OSS-Compass',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目在过去 6 个月收到的本项目涉及的三方软件的任何漏洞报告的初始响应时间必须小于或等于 14 天。',
    检查方式: 'compass 检查 - 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '升保、兴友',
  },
  {
    key: 'ecologyMaintainerDoc',
    detailRender: null,
    维度: '技术生态',
    指标名称: 'Maintainers 文件',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化项目 Maintainers 文件检查：维护一个具备决策权的贡献者的公开列表。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'CLOMonitor',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目维护一个具备决策权的贡献者的公开列表，项目的所有重要讨论都以书面方式记录在项目的正式沟通渠道上，对于讨论不充分或意见不完全一致的问题，基于社区公开的投票规则建立共识。',
    检查方式: '规则检查工具 - 后端',
    规则类型: 'OH 改',
    是否已有: '0',
    责任: '国强、兴友',
  },
  {
    key: 'ecologyBuild',
    detailRender: null,
    维度: '技术生态',
    指标名称: '可构建',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化项目可构建出可工作的系统检查：项目必须支持从源代码构建出可工作的系统，且应该仅使用业界可公开获得的构建工具。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'OH 社区',
    数据来源: '待定',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目必须支持从源代码构建出可工作的系统，且应该仅使用业界可公开获得的构建工具。',
    检查方式: '基础设施数据接入 - 后端\n检查 CI 记录',
    规则类型: 'OH',
    是否已有: '0',
    责任: '国强',
  },
  {
    key: 'ecologyCi',
    detailRender: null,
    维度: '技术生态',
    指标名称: 'CI 集成',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化项目 CI 集成检查：项目支持与社区现有工具链集成并提供 CI 服务。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'ScoreCard',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）': '支持与社区现有工具链集成。',
    检查方式: '基础设施数据接入 - 后端\n检查 CI 记录',
    规则类型: 'OH',
    是否已有: '0',
    责任: '国强',
  },
  {
    key: 'ecologyTestCoverage',
    detailRender: ({
      coverageRatio,
      coverageScore,
      duplicationRatio,
      duplicationScore,
    }) => {
      let res = '';
      if (coverageRatio !== null) {
        res += `测试覆盖率：${toFixed(coverageRatio * 100, 2) + '%'}；`;
        if (coverageScore !== null) {
          res += `测试覆盖率得分：${coverageScore}；`;
        }
      }
      if (duplicationRatio !== null) {
        res += `代码重复率：${toFixed(duplicationRatio * 100, 2) + '%'}；`;
        if (duplicationScore !== null) {
          res += `代码重复率得分：${duplicationScore}；`;
        }
      }
      return res || '无';
    },
    维度: '技术生态',
    指标名称: '测试覆盖度',
    '风险重要性\n(去除)': '高',
    指标意义:
      '代码质量检查，要求不使用不安全函数、代码结构规范（圈复杂度低）、重复度低、自动化测试充分。',
    指标检查项及评分项:
      '设置评分。最终得分 = avg(代码重复率得分  + 测试覆盖率得分)\n\n代码重复率评分:\n0% - 2%   => 10 分\n3% - 4%   => 8 分\n5% - 9%   => 6 分\n10% - 19% => 4 分\n20% - 99% => 2 分\n100%      => 0 分\n\n测试覆盖率评分:\n80% - 100% => 10 分\n70% - 79%  => 8 分\n50% - 69%  => 6 分\n30% - 49%  => 4 分\n1% - 29%   => 2 分\n0%         => 0 分',
    修复建议: '',
    指标业界实践: 'OH 社区',
    数据来源: '待定',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目必须提供完备的测试用例，覆盖大部分逻辑分支及所有外部接口，且支持 OpenHarmony 社区测试套件实现构建自动测试。',
    检查方式: 'sonarqube 检查 - 后端',
    规则类型: 'OH 改',
    是否已有: '1',
    责任: '',
  },
  {
    key: 'ecologyCodeReview',
    detailRender: ({ pullCount, pullReviewCount, pullReviewRatio }) => {
      let res = '';
      if (pullCount !== null) {
        res += `PR 数量：${pullCount}；`;
        if (pullReviewCount !== null) {
          res += `PR Review 数量：${pullReviewCount}；`;
        }
        if (pullReviewRatio !== null) {
          res += `PR Review 比率：${toFixed(pullReviewRatio * 100, 2) + '%'}；`;
        }
      } else {
        res = '无';
      }
      return res;
    },
    维度: '技术生态',
    指标名称: '代码评审机制',
    '风险重要性\n(去除)': '中',
    指标意义: '孵化项目代码评审机制检查：项目代码合入前须经过评审。',
    指标检查项及评分项:
      '设置评分。项目代码合入前审查比例超过 80% 10 分，60%-80% 6 分，其他 0 分',
    修复建议: '',
    指标业界实践: 'OSS-Compass',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）': '项目代码合入前须经过评审',
    检查方式: 'compass 检查 - 后端',
    规则类型: 'OH',
    是否已有: '0',
    责任: '升保、兴友',
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
        })，存在漏洞:${item.vulnerabilities.join('、')};
        `;
      });
      return res;
    },
    维度: '网络安全',
    指标名称: '安全漏洞',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化软件及依赖源码是否有公开未修复漏洞检查：\n项目被公开超过 60 天的中等或更高严重程度的漏洞必须被修复，所有致命漏洞必须完成修复。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'ScoreCard&OSTMS',
    数据来源: 'OSV&公司 VMS',
    涉及阶段: '引入、孵化毕业',
    '检查条目（社区要求）':
      '项目被公开超过 60 天的中等或更高严重程度的漏洞必须被修复，所有致命漏洞必须完成修复。',
    检查方式: 'osv-scanner 扫描 - 后端',
    规则类型: 'OH',
    是否已有: '1',
    责任: '',
  },
  {
    key: 'lifecycleReleaseNote',
    detailRender: null,
    维度: '生命周期',
    指标名称: 'Release Notes',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化项目 Release Notes 检查：项目版本发布需在特定位置包含 Release Notes，提供清晰明了的版本变更说明。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'OH 社区',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '项目发布的版本都必须提供清晰明了的版本变更说明，明确升级带来什么影响，以便用户决定是否升级。如涉及安全漏洞修复，须明确列举修改了哪些公开的漏洞。',
    检查方式: 'Compass 检查（仓库 Release 检查）- 后端',
    规则类型: 'OH 改',
    是否已有: '0',
    责任: '国强、兴友',
  },
  {
    key: 'securityPackageSig',
    detailRender: null,
    维度: '网络安全',
    指标名称: '软件包签名',
    '风险重要性\n(去除)': '中',
    指标意义:
      '孵化项目软件包数据签名校验检查：项目发布的版本需要进行数字签名，以校验下载包的完整可靠。',
    指标检查项及评分项: '设置评分。软件包分发包含数字校验 10 分，不包含 6 分',
    修复建议: '',
    指标业界实践: 'ScoreCard',
    数据来源: 'OSS-Compass',
    涉及阶段: '引入、孵化毕业',
    '检查条目（社区要求）':
      '项目发布的版本需要进行数字签名或带有哈希摘要，以校验下载包的完整可靠',
    检查方式: '软件包签名检查 - 后端',
    规则类型: 'OH 改',
    是否已有: '1',
    责任: '',
  },
  {
    key: 'ecologyCodeUpstream',
    detailRender: null,
    维度: '技术生态',
    指标名称: '回合上游',
    '风险重要性\n(去除)': '高',
    指标意义:
      '孵化软件适配、新增特性推荐回合上游社区，毕业前需检查是否实施回合动作（在上游社区建立 Issue、PR 讨论回合需求），受限于上游社区业务规划和开源策略，不要求特性代码最终合入上游分支，但需保留相关提案和讨论记录（上游社区 Issue 和 PR 即可）。',
    指标检查项及评分项:
      '设置评分。在上游社区建立回合 Issue 和 PR 6 分，未完成 0 分，特性合入上游分支 10 分；',
    修复建议: '',
    指标业界实践: 'OSTMS',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）':
      '适配、新增特性建议回合上游，项目毕业前需在上游社区实施回合动作',
    检查方式: '回合动作检查工具 - 后端',
    规则类型: 'TPC 新增',
    是否已有: '0',
    责任: '升保、兴友',
  },
  {
    key: 'lifecycleStatement',
    detailRender: null,
    维度: '生命周期',
    指标名称: '生命周期申明',
    '风险重要性\n(去除)': '高',
    指标意义:
      '发布软件版本须在版本发布文档中对生命周期进行申明或者提供社区统一生命周期管理策略。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
    修复建议: '',
    指标业界实践: 'OSTMS',
    数据来源: 'OSS-Compass',
    涉及阶段: '孵化毕业',
    '检查条目（社区要求）': '',
    检查方式: '开发者申请时提供',
    规则类型: 'TPC 新增',
    是否已有: '0',
    责任: '国强',
  },
  {
    key: 'complianceSnippetReference',
    detailRender: null,
    维度: '合法合规',
    指标名称: '片段引用',
    '风险重要性\n(去除)': '高',
    指标意义:
      '片段引用源代码应申明其原始 License 和 Copyright，并禁止变更其原始 License 和 Copyright 声明；片段引用的源代码的 License 和项目的 License 须保证兼容性。',
    指标检查项及评分项: '设置评分，满足 10 分，不满足 0 分',
  },
];
//8 分
const getContent8 = (item) => {
  const { key } = item;
  const statusMessages = {
    ecologyIssueManagement: '未对登记的 issue 进行合理的分类且分级',
    ecologyIssueResponseTime:
      '过去 6 个月收到的本项目涉及的三方软件的任何漏洞报告的初始响应时间 14 天到 30 天',
    ecologyTestCoverage: '测试覆盖度最终得分较低',
    ecologyCodeReview: '项目代码合入前审查比例 80%-99%',
  };
  return statusMessages[key];
};
//6 分
const getWarningContent = (item) => {
  const { key } = item;
  const statusMessages = {
    ecologyIssueManagement: '未对登记的 issue 进行合理的分类或分级',
    ecologyIssueResponseRatio: '项目过去 6 个月的 Issues 响应比例 80% 以下',
    ecologyIssueResponseTime:
      '过去 6 个月收到的本项目涉及的三方软件的任何漏洞报告的初始响应时间大于 30 天',
    ecologyTestCoverage: '测试覆盖度最终得分较低',
    ecologyCodeReview: '项目代码合入前审查比例 60%-80%',
    securityPackageSig: '软件包分发不包含数字校验',
    ecologyCodeUpstream: '特性未合入上游分支',
  };
  return statusMessages[key];
};
//6 分以下
const getErrorContent = (item) => {
  const { key } = item;
  const statusMessages = {
    ecologyReadme: '未在仓库特定位置检测到 README 文档',
    ecologyBuildDoc: '未在仓库特定位置或 README 中检测到构建文档',
    ecologyInterfaceDoc: '未在仓库须在特定位置检测到接口文档',
    complianceCopyrightStatement: '项目有源码未检测到许可头与版权声明',
    securityBinaryArtifact: '软件源码仓库包含二进制制品',
    complianceDco: '未检测到项目孵化期所有贡献者签署 DCO',
    complianceLicense:
      '未检测到 README.OpenSource 文件或 README.OpenSource 文件不规范',
    complianceLicenseCompatibility: '软件项目级、文件级许可证存在兼容性问题',
    complianceCopyrightStatementAntiTamper:
      '第三方开源软件的许可证和版权声明篡改检查未通过',
    ecologyIssueManagement: '未实现问题管理机制',
    ecologyIssueResponseTime:
      '过去 6 个月收到的本项目涉及的三方软件的任何漏洞报告未响应',
    ecologyMaintainerDoc: '未在仓库检测到 Maintainers 文件',
    ecologyBuild: '项目可构建出可工作的系统检查未通过',
    ecologyCi: '项目 CI 集成检查未通过',
    ecologyTestCoverage: '测试覆盖度最终得分不合格',
    ecologyCodeReview: '项目代码合入前审查比例低于 60%',
    securityVulnerability: '孵化软件及依赖源码有公开未修复漏洞',
    lifecycleReleaseNote: '未在仓库特定位置检测到 Release Notes',
    ecologyCodeUpstream: '特性未合入上游分支，未在上游社区建立回合 Issue 和 PR',
    lifecycleStatement:
      '发布软件版本须在版本发布文档中未对生命周期进行申明或者提供社区统一生命周期管理策略',
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
