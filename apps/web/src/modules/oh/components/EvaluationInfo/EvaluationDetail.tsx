import React, { useState, useRef, useEffect } from 'react';
import { EChartsOption, init, LineSeriesOption } from 'echarts';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { Tag, Input, Button, Popover } from 'antd';

const Pie = ({ score }) => {
  var colorList = ['#998CEF', '#D9D8EB'];
  let option: EChartsOption = {
    title: {
      text: score,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 24,
        color: '#2A3A77',
      },
    },
    tooltip: {
      trigger: 'item',
      show: false,
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['64%', '72%'],
        clockwise: false,
        avoidLabelOverlap: false,
        itemStyle: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1,
          },
        },
        data: [
          {
            name: '一月',
            value: score,
          },
          {
            name: '一月',
            value: 100 - score,
          },
        ],
      },
    ],
  };
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart = init(cardRef.current);
    chart.setOption(option);
  }, [option]);

  return <div className="h-32 w-full" ref={cardRef}></div>;
};

const EvaluationScore = ({ items }) => {
  // const items = [
  //   {
  //     name: '合法合规',
  //     score: 73,
  //     color: '#4ade80',
  //   },
  //   {
  //     name: '技术生态',
  //     score: 65,
  //     color: '#4ade80',
  //   },
  //   {
  //     name: '生命周期',
  //     score: 77,
  //     color: '#4ade80',
  //   },
  //   {
  //     name: '网络安全',
  //     score: 44,
  //     color: '#f8961e',
  //   },
  // ];
  const clickAnchor = (e: any, id: string) => {
    e.preventDefault();
    let anchorElement = document.getElementById(id);
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };
  const score = items.reduce((acc, curr) => acc + curr.score, 0) / 4;
  return (
    <div className="flex h-52 border bg-[#f9f9f9]">
      <div className="flex h-full w-40 items-center ">
        <Pie score={score} />
      </div>
      <div className="flex-1 px-6 pt-5">
        {items.map(({ name, score, color }) => {
          return (
            <div key={name} className="mb-2 flex h-9 w-full  border bg-white">
              <div
                onClick={(e) => clickAnchor(e, name)}
                className="flex min-w-[128px] cursor-pointer items-center justify-start px-3 font-semibold"
              >
                <a className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline">
                  {name}
                </a>
              </div>
              <div className="flex w-[50px] items-center justify-center bg-[#e5e5e5] px-2 font-semibold">
                {score}
              </div>
              <div className="flex flex-1 items-center justify-center px-3">
                <div className="h-1 w-full bg-[#e5e5e5]">
                  <div
                    className="h-1"
                    style={{
                      width: `${score}%`,
                      backgroundColor: score > 60 ? '#4ade80' : '#f8961e',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const getConent1 = (name) => {
  switch (name) {
    case 'DCO':
      return '未检测到项目的提交者签署 DCO';
    case '软件包签名':
      return '软件包分发不包含数字校验';
    case '软件质量':
      return '引入软件仓库未包含 Static Application Security Testing (SAST)';
    case '漏洞披露机制':
      return '软件未检测到漏洞披露机制';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以内响应';
  }
};
const getConent2 = (name) => {
  switch (name) {
    case '采用度分析':
      return '包管理平台下载数据量较低';
    case '专利风险':
      return '非全球专利保护社区 OIN（Open Invention Network）认证软件';
    case '代码维护':
      return '项目未有正式版本发布';
    case '社区支撑':
      return '有效 bug、PR 平均 1 月以上响应';
    case '版本号':
      return '未检测到版本号或版本号不规范';
    case '版本生命周期':
      return '版本处于 EOL 阶段';
    case '二进制制品':
      return '引入软件源码仓库包含二进制制品';
    case '漏洞响应机制':
      return '软件无漏洞响应机制';
  }
};
const EvaluationMerticItem = ({ mertic, items, scoreObj, type }) => {
  const { score, color } = scoreObj;
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  return (
    <div className="mb-4 flex flex-col border bg-[#f9f9f9] p-6">
      <div id={mertic} className="mb-4 text-lg font-semibold">
        {mertic}
      </div>
      <div className="flex h-6 items-center justify-start">
        <div className="h-1.5 w-[600px] bg-[#e5e5e5]">
          <div
            className="h-1.5"
            style={{
              width: `${score}%`,
              backgroundColor: score > 60 ? '#4ade80' : '#f8961e',
            }}
          ></div>
        </div>
        <div className="ml-4 text-base font-semibold">{score}%</div>
      </div>
      <div className="mt-6 w-full border-b">
        {items.map((item) => {
          return (
            <div
              key={item.指标名称}
              className="flex h-[88px] border border-b-0 bg-white px-4 py-3"
            >
              <div className="flex w-12 flex-shrink-0 items-center justify-start pl-2 text-lg text-green-600">
                {item.score >= 8 ? (
                  <CheckCircleOutlined rev={undefined} />
                ) : item.score >= 6 ? (
                  <Popover content={getConent1(item.指标名称)} title="">
                    <ExclamationCircleOutlined
                      rev={undefined}
                      className="cursor-pointer text-[#f8961e]"
                    />
                  </Popover>
                ) : (
                  <Popover content={getConent2(item.指标名称)} title="">
                    <CloseCircleOutlined
                      rev={undefined}
                      className="cursor-pointer text-[#ff4d4f]"
                    />
                  </Popover>
                )}
              </div>
              {/* <div className="mr-4 flex items-center justify-center">
                {item.score}
              </div> */}
              <div className="">
                <div className="flex h-[29px] text-base font-semibold">
                  <div className="flex-shrink-0"> {item.指标名称}</div>
                  <div className="ml-4 mr-4">
                    {item.风险重要性 === '高' ? (
                      <Tag color="orange">风险重要性： {item.风险重要性}</Tag>
                    ) : (
                      <Tag color="cyan">风险重要性： {item.风险重要性}</Tag>
                    )}
                  </div>
                  {item.指标名称 === '漏洞响应机制 1' &&
                    item.score === 0 &&
                    type === 'edit' &&
                    (showInput ? (
                      <>
                        <Input
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value);
                          }}
                          className="mr-4 h-full"
                          placeholder="请输入漏洞响应地址"
                        />
                        <Button
                          className="h-[29px] rounded-none"
                          onClick={() => {
                            setShowInput(false);
                          }}
                        >
                          录入
                        </Button>
                      </>
                    ) : (
                      <div
                        onClick={() => {
                          setShowInput(true);
                        }}
                        className="cursor-pointer text-base text-[#ff4d4f]"
                      >
                        {!inputValue && (
                          <>
                            <ExclamationCircleOutlined
                              rev={undefined}
                              className="mr-2 text-[#ff4d4f] "
                            />
                            未识别到漏洞响应机制，请点击此处录入
                          </>
                        )}
                      </div>
                    ))}
                </div>
                <div className="line-clamp-2 mt-1 text-xs">
                  {item.指标意义.split('\n\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationMertic = ({ allData, scoreList, type }) => {
  let yList = ['合法合规', '技术生态', '生命周期', '网络安全'];
  const [mertic, setMertic] = useState('合法合规');
  // const items = allData.filter((item) => item.维度 === mertic);
  return (
    <>
      {yList.map((mertic) => {
        const items = allData.filter((item) => item.维度 === mertic);
        const scoreObj = scoreList.find((item) => item.name === mertic);
        return (
          <EvaluationMerticItem
            key={mertic}
            mertic={mertic}
            items={items}
            scoreObj={scoreObj}
            type={type}
          />
        );
      })}
    </>
  );
};
const EvaluationDetail = ({
  back,
  type,
  name = 'jasonsantos/luajava',
}: {
  name?: string;
  back?: () => void;
  type?: string;
}) => {
  const obj = {
    'jasonsantos/luajava': {
      // base_repo_name: 10,
      // base_website_url: 10,
      // base_code_url: 10,

      compliance_license: 10,
      compliance_dco: 6,
      compliance_package_sig: 6,
      compliance_license_compatibility: 10,

      ecology_dependency_acquisition: 10,
      ecology_code_maintenance: 0,
      ecology_community_support: 0,
      ecology_adoption_analysis: 0,
      ecology_software_quality: 6,
      ecology_patent_risk: 0,

      lifecycle_version_normalization: 10,
      lifecycle_version_number: 0,
      lifecycle_version_lifecycle: 0,

      security_binary_artifact: 0,
      security_vulnerability: 10,
      security_vulnerability_response: 0,
      security_vulnerability_disclosure: 6,
      security_history_vulnerability: 10,
    },
    'gudzpoz/luajava': {
      // base_repo_name: 10,
      // base_website_url: 10,
      // base_code_url: 10,

      compliance_license: 10,
      compliance_dco: 6,
      compliance_package_sig: 6,
      compliance_license_compatibility: 10,

      ecology_dependency_acquisition: 10,
      ecology_code_maintenance: 10,
      ecology_community_support: 6,
      ecology_adoption_analysis: 0,
      ecology_software_quality: 6,
      ecology_patent_risk: 0,

      lifecycle_version_normalization: 10,
      lifecycle_version_number: 10,
      lifecycle_version_lifecycle: 10,

      security_binary_artifact: 10,
      security_vulnerability: 10,
      security_vulnerability_response: 10,
      security_vulnerability_disclosure: 0,
      security_history_vulnerability: 10,
    },
  };
  let scoreOj = null;
  if (obj[name]) {
    scoreOj = obj[name];
  } else {
    scoreOj = obj['jasonsantos/luajava'];
  }
  const typeItems = [
    {
      name: 'jasonsantos/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updated: '2024-06-20',
      score: '49.25',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 80,
        },
        {
          name: '技术生态',
          score: 32,
        },
        {
          name: '生命周期',
          score: 33,
        },
        {
          name: '网络安全',
          score: 52,
        },
      ],
    },
    {
      name: 'gudzpoz/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updated: '2024-06-20',
      score: '86',
      evaluationDetail: [
        {
          name: '合法合规',
          score: 80,
        },
        {
          name: '技术生态',
          score: 84,
        },
        {
          name: '生命周期',
          score: 100,
        },
        {
          name: '网络安全',
          score: 80,
        },
      ],
    },
  ];
  const items =
    typeItems.find((item) => item.name === name)?.evaluationDetail ||
    typeItems[0].evaluationDetail;
  const itemScore = Object.values(scoreOj);
  let allData = [
    {
      维度: '合法合规',
      指标名称: '许可证包含',
      风险重要性: '高',
      score: 0,
      指标意义: `引入软件许可证合规性检查\n\n【规则】\n1. 禁止选用无许可证、许可证不在准入清单的软件；\n【建议】\n1. 项目的所有源码包含许可头与版权声明；`,
    },
    {
      维度: '合法合规',
      指标名称: 'DCO',
      风险重要性: '中',
      指标意义:
        '引入软件代码提交者原创性声明签署检查\n\n【建议】\n1. 项目的提交者签署 DCO;',
    },
    {
      维度: '合法合规',
      指标名称: '软件包签名',
      风险重要性: '中',
      指标意义:
        '引入软件软件包数据签名校验检查\n\n【建议】\n1. 优先选取有官方数字签名校验的软件包入库；',
    },
    {
      维度: '合规合规',
      指标名称: '许可证兼容性',
      风险重要性: '高',
      指标意义:
        '引入软件许可证兼容性检查\n\n【规则】\n1. 禁止引入项目级、文件级 License 存在兼容性问题的软件及版本；',
    },
    // {
    //   维度：'基本信息',
    //   指标名称：'仓库命名',
    //   风险重要性：'低',
    //   指标意义：
    //     '仓库名需满足社区要求以便统一管理\n\n【规则】\n1. 仓库命名统一为 ohos_软件名称，其中软件名称和其官网保持一致；\n2. 禁止以软件的子模块作为软件名；',
    // },
    // {
    //   维度：'基本信息',
    //   指标名称：'官方网址',
    //   风险重要性：'低',
    //   指标意义：
    //     '引入软件官方网址\n\n【规则】\n1. 提供引入软件官方网址，无正式官网则提供主流代码托管商（github、gitee 等）对应项目托管地址；',
    // },
    // {
    //   维度：'基本信息',
    //   指标名称：'源码地址',
    //   风险重要性：'低',
    //   指标意义：
    //     '引入软件官方源码下载地址\n\n【规则】\n1. 提供引入软件版本的官方源代码包下载地址，保证可溯源；',
    // },
    {
      维度: '技术生态',
      指标名称: '依赖可获得',
      风险重要性: '高',
      指标意义:
        '引入软件依赖源码可获得检查\n\n【规则】\n1. 项目依赖的库必须是开源软件，可公开获得。保留原开源软件的提交记录',
    },
    {
      维度: '技术生态',
      指标名称: '代码维护',
      风险重要性: '高',
      指标意义:
        '社区活跃度及是否活跃维护检查\n\n【规则】\n1. 选用成熟期（代码更新活跃，定期发布）或成长期（代码更新活跃，频繁发布）的软件，禁止选用处于衰退期（代码无更新或无新版本发布）的软件；',
    },
    {
      维度: '技术生态',
      指标名称: '社区支撑',
      风险重要性: '高',
      指标意义:
        '社区服务与支撑检查\n\n【建议】\n1. 社区无明确版本计划，有效 bug、PR 半年以上未响应不建议选用；',
    },
    {
      维度: '技术生态',
      指标名称: '采用度分析',
      风险重要性: '中',
      指标意义:
        '引入软件采用度分析，优选在业界广泛应用软件\n\n【建议】\n1. 优选主流的供应商/社区或社区项目；\n2. 优选在业界成熟应用或产品实际使用效果好的软件；',
    },
    {
      维度: '技术生态',
      指标名称: '软件质量',
      风险重要性: '中',
      指标意义:
        '引入软件质量分析，包含代码规范，圈复杂度，代码复用度，测试用例覆盖度\n\n【规则】\n1. 不符合技术架构与技术演进淘汰的软件禁止引入；\n【建议】\n1. 技术架构优选更安全、灵活度高、支持组件化、插件化的软件；\n2. 优选代码质量高的软件，如使用不安全函数数量/密度少、代码结构规范（圈复杂度低）、重复度低、代码调试功能可关闭、有自动化构建能力、自动化测试充分；',
    },
    {
      维度: '技术生态',
      指标名称: '专利风险',
      风险重要性: '中',
      指标意义:
        '引入软件专利风险分析\n\n【建议】\n1. 优先选择全球专利保护社区 OIN（Open Invention Network）认证软件，未认证软件需单独审视专利风险',
    },
    {
      维度: '生命周期',
      指标名称: '版本归一化',
      风险重要性: '高',
      指标意义:
        '一款软件只在 OpenHarmony 及 TPC 中引入一次\n\n【规则】\n1. 主动选型开源软件与被动依赖开源软件只有一个社区版本；',
    },
    {
      维度: '生命周期',
      指标名称: '版本号',
      风险重要性: '中',
      指标意义:
        '引入软件版本规范检查\n\n【规则】\n1. master 是分支，不是版本号，不能用 master 作为版本号引入；\n2. 引入官方发布版本（Release 版本），非正式版本（beta 等）未经过全面测试，不允许入库；',
    },
    {
      维度: '生命周期',
      指标名称: '版本生命周期',
      风险重要性: '高',
      指标意义:
        '检查引入软件版本社区维护生命周期是否结束\n\n【建议】\n1. 优先选择 2 年以内发布的版本（以评审节点计算）；\n2. 社区已经 EOL 的版本，不建议引入；',
    },
    {
      维度: '网络安全',
      指标名称: '二进制制品',
      风险重要性: '高',
      指标意义:
        '引入软件源码仓库是否包含二进制制品\n\n【建议】\n不建议二进制引入，应从源码构建。如必要引入须在 TPC SIG 决策，并提供构建指导；',
    },
    {
      维度: '网络安全',
      指标名称: '安全漏洞',
      风险重要性: '高',
      指标意义:
        '检查引入软件及依赖源码是否有公开未修复漏洞\n\n【规则】\n1. 禁止选用含非误报病毒告警的软件（含被动依赖软件）；\n2. 禁止选用含已知未修复漏洞软件；',
    },
    {
      维度: '网络安全',
      指标名称: '漏洞响应机制',
      风险重要性: '高',
      指标意义:
        '引入软件漏洞响应机制检查\n\n【规则】\n1. 选用开源软件必须有漏洞反馈与修复跟踪管理机制；',
    },
    {
      维度: '网络安全',
      指标名称: '漏洞披露机制',
      风险重要性: '中',
      指标意义:
        '引入软件漏洞披露机制检查\n\n【建议】\n1. 优先选择有漏洞披露源的开源软件;',
    },
    {
      维度: '网络安全',
      指标名称: '历史漏洞',
      风险重要性: '中',
      指标意义: '引入软件历史漏洞检查\n\n【建议】\n1. 优选漏洞较少的版本',
    },
  ];
  allData = allData.map((item, index) => {
    item.score = itemScore[index] as number;
    return item;
  });
  return (
    <div>
      <div className="mb-6 flex border bg-[#f9f9f9] py-3 px-6">
        {back && (
          <AiOutlineLeftCircle
            onClick={() => {
              back();
            }}
            className="mr-2  cursor-pointer text-2xl text-[#3f60ef]"
          />
        )}
        <div className="text-lg font-semibold">{name} 选型评估报告</div>
        <div className="mt-2 ml-4 text-xs">更新于：2024-06-01</div>
      </div>
      <EvaluationScore items={items} />
      <div className="mt-6">
        <EvaluationMertic allData={allData} scoreList={items} type={type} />
      </div>
    </div>
  );
};

export default EvaluationDetail;
