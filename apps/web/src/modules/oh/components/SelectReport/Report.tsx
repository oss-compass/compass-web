import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { EChartsOption, init } from 'echarts';
import { Button } from 'antd';
import Detail from '@modules/oh/DataView/HatchingTreatment/Workbench/Detail';
import Pie from '@modules/oh/components/EvaluationInfo/Pie';
import { getMetricScore } from '@modules/oh/utils';
import { useTpcSoftwareSelectionReportPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

const MiniEvaluationDetail = ({ score, evaluationDetail }) => {
  return (
    <div className="flex h-40  bg-[#f9f9f9]">
      <div className="flex h-full w-28 items-center ">
        <Pie score={score} />
      </div>
      <div className="flex-1 pr-3 pt-3">
        {evaluationDetail.map(({ name, score, color }) => {
          return (
            <div
              key={name}
              className="mb-2 flex h-7 w-full border bg-white text-sm"
            >
              <div className="flex min-w-[90px] items-center justify-start px-3 font-semibold">
                {name}
              </div>
              <div className="flex w-[40px] items-center justify-center bg-[#e5e5e5] px-2 font-semibold">
                {score}
              </div>
              <div className="flex flex-1 items-center justify-center px-3">
                <div className="h-1 w-full bg-[#e5e5e5]">
                  <div
                    className="h-1"
                    style={{
                      width: `${score}%`,
                      backgroundColor: '#4ade80',
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
const Report = ({
  query,
  selected,
  selectFun,
}: {
  query: any;
  selected?: string;
  selectFun?: (name) => void;
}) => {
  const { isLoading, data } = useTpcSoftwareSelectionReportPageQuery(
    client,
    query,
    {
      onSuccess: (data) => {},
    }
  );
  let rowData = [
    {
      id: 'jasonsantos',
      name: 'jasonsantos/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updated: '2024-06-20',
      score: '49.25',
      tpcSoftwareReportMetric: {
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
      id: 'gudzpoz',
      name: 'gudzpoz/luajava',
      description:
        '该工具的目标是允许用 Lua 编写的脚本操作用 Java 开发的组件。LuaJava 允许使用与访问 Lua 原生对象相同的语法从 Lua 访问 Java 组件，而无需任何声明或任何形式的预处理。',
      reportVersion: 'v1',
      updated: '2024-06-20',
      score: '86',
      tpcSoftwareReportMetric: {
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
        security_vulnerability_disclosure: 6,
        security_history_vulnerability: 10,
      },
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
    {
      name: 'vue',
      description:
        'Vue.js 是构建 Web 界面的 JavaScript 库，提供数据驱动的组件，还有简单灵活的 API，使得 MVVM 更简单。',
      reportVersion: 'v2',
      updated: '2024-06-01',
      score: '88',
      tpcSoftwareReportMetric: {
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
      evaluationDetail: [
        {
          name: '合法合规',
          score: 73,
        },
        {
          name: '技术生态',
          score: 65,
        },
        {
          name: '生命周期',
          score: 77,
        },
        {
          name: '网络安全',
          score: 44,
        },
      ],
    },
    {
      name: 'angular',
      description:
        'Angular 是一个基于 TypeScript 的 Web 应用程序框架。它提供了完整的解决方案，涵盖了路由、表单管理、状态管理等常见需求，是企业级 Web 应用的理想选择。',
      reportVersion: 'v1',
      updated: '2024-07-01',
      score: '86',
      tpcSoftwareReportMetric: {
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
      evaluationDetail: [
        {
          name: '合法合规',
          score: 78,
        },
        {
          name: '技术生态',
          score: 72,
        },
        {
          name: '生命周期',
          score: 68,
        },
        {
          name: '网络安全',
          score: 64,
        },
      ],
    },
    {
      name: 'node.js',
      description:
        'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。它使用事件驱动、非阻塞 I/O 模型，非常适合构建高性能、实时的网络应用。',
      reportVersion: 'v2',
      updated: '2024-04-20',
      score: '91',
      tpcSoftwareReportMetric: {
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
        security_vulnerability_disclosure: 6,
        security_history_vulnerability: 10,
      },
      evaluationDetail: [
        {
          name: '合法合规',
          score: 82,
        },
        {
          name: '技术生态',
          score: 88,
        },
        {
          name: '生命周期',
          score: 79,
        },
        {
          name: '网络安全',
          score: 72,
        },
      ],
    },
    {
      name: 'django',
      description:
        'Django 是一个基于 Python 的 Web 框架，它强调快速开发、安全性和灵活性。它提供了很多开箱即用的功能，如 ORM、Admin 后台、模板引擎等。',
      reportVersion: 'v1',
      updated: '2024-08-01',
      score: '87',

      tpcSoftwareReportMetric: {
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
      evaluationDetail: [
        {
          name: '合法合规',
          score: 75,
        },
        {
          name: '技术生态',
          score: 81,
        },
        {
          name: '生命周期',
          score: 73,
        },
        {
          name: '网络安全',
          score: 69,
        },
      ],
    },
    {
      name: 'flask',
      description:
        'Flask 是一个轻量级的 Python Web 框架，它专注于构建 API 和微服务。它具有简单、优雅、灵活的特点，非常适合快速开发小型到中型的 Web 应用。',
      reportVersion: 'v2',
      updated: '2024-03-01',
      score: '84',
      tpcSoftwareReportMetric: {
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
      evaluationDetail: [
        {
          name: '合法合规',
          score: 71,
        },
        {
          name: '技术生态',
          score: 75,
        },
        {
          name: '生命周期',
          score: 68,
        },
        {
          name: '网络安全',
          score: 62,
        },
      ],
    },
  ];
  const items = getMetricScore(
    data?.tpcSoftwareSelectionReportPage?.items || []
  );

  const [activeItem, setActiveItem] = useState(null);
  const [checked, setChecked] = useState(null);

  const submit = () => {
    if (checked) {
      selectFun(checked);
    }
  };
  return (
    <>
      {activeItem ? (
        <Detail item={activeItem} setActiveItem={setActiveItem} />
      ) : (
        <div className="relative h-full w-full">
          <div
            className={classnames(
              'h-[calc(100vh-252px)] w-full overflow-auto ',
              {
                border: selectFun,
              }
            )}
          >
            <div className=">2xl:max-w-[1640px] mx-auto flex flex-wrap gap-6 p-6 xl:max-w-[900px] 2xl:w-[1079px]">
              {/* <div className="flex flex-wrap gap-6 overflow-auto p-6"> */}
              {items.map((item, index) => {
                return (
                  <div
                    key={item.name + index}
                    className={classnames('h-[320px] w-[380px] border p-5 ', {
                      'cursor-pointer': selectFun,
                      'border-primary': checked?.id === item.id,
                    })}
                    onClick={() => {
                      if (selectFun)
                        checked?.id === item.id
                          ? setChecked(null)
                          : setChecked(item);
                    }}
                  >
                    <div className="flex w-full justify-between text-xl font-semibold">
                      <a
                        className="cursor-pointer  hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveItem(item);
                        }}
                      >
                        {item.name}
                      </a>

                      <div className="">
                        {selectFun && (
                          <input
                            type="checkbox"
                            checked={checked && checked.id === item.id}
                            onChange={() => {}}
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex text-sm font-normal text-[#3e8eff] hover:text-[#3e8eff] hover:underline">
                      <a
                        onClick={() => {
                          window.open(item.codeUrl, '_blank');
                        }}
                      >
                        {item.codeUrl}
                      </a>
                    </div>
                    <div
                      title={item.description}
                      className="line-clamp-2 my-3 flex items-center text-sm font-medium"
                    >
                      {item.description}
                    </div>
                    <MiniEvaluationDetail
                      score={item.score}
                      evaluationDetail={item.evaluationDetail}
                    />
                    <div className="mt-4 flex justify-end text-xs">
                      更新于：{' '}
                      {item?.tpcSoftwareReportMetric?.updatedAt?.slice(0, 10) ||
                        ''}
                    </div>
                  </div>
                );
              })}
              {/* </div> */}
            </div>
          </div>
          {selectFun && (
            <div className="flex w-[100%] justify-center pt-4">
              <Button
                className="rounded-none"
                type="primary"
                //   loading={submitLoading}
                onClick={() => {
                  submit();
                }}
              >
                确定
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Report;
