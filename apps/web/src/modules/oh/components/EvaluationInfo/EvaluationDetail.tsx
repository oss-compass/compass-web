import React, { useState, useRef, useEffect } from 'react';
import { EChartsOption, init, LineSeriesOption } from 'echarts';
import EChartX from '@common/components/EChartX';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

const Pie = () => {
  var colorList = ['#998CEF', '#D9D8EB'];
  let option: EChartsOption = {
    title: {
      text: '80',
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
            value: 80,
          },
          {
            name: '一月',
            value: 20,
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

const EvaluationScore = () => {
  const items = [
    {
      name: '合法合规',
      score: 73,
      color: '#4ade80',
    },
    {
      name: '生命周期',
      score: 77,
      color: '#4ade80',
    },
    {
      name: '技术生态',
      score: 65,
      color: '#4ade80',
    },
    {
      name: '网络安全',
      score: 44,
      color: '#f8961e',
    },
  ];
  return (
    <div className="flex h-52 border bg-[#f9f9f9]">
      <div className="flex h-full w-40 items-center ">
        <Pie />
      </div>
      <div className="flex-1 px-6 pt-5">
        {items.map(({ name, score, color }) => {
          return (
            <div key={name} className="mb-2 flex h-9 w-full  border bg-white">
              <div className="flex min-w-[128px] items-center justify-start px-3 font-semibold">
                {name}
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
                      backgroundColor: color,
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
const EvaluationMertic = () => {
  let items = [
    {
      维度: '合法合规',
      名称: '许可头与版权声明',
      优先级: '高',
      含义: '孵化软件源文件许可头与版权声明检查：项目的所有源码必须包含许可头与版权声明',
    },
    {
      维度: '合法合规',
      名称: '三方来源声明',
      优先级: '高',
      含义: '孵化软件代码提交者原创性声明签署检查：新开发代码为独立自主开发，当提交第三方贡献时，提交备注中要包含可靠的代码来源信息',
    },
    {
      维度: '合法合规',
      名称: 'DCO',
      优先级: '中',
      含义: '孵化项目代码提交者原创性声明签署检查：所有代码提交者都应签署 DCO',
    },
    {
      维度: '合法合规',
      名称: '许可证包含',
      优先级: '高',
      含义: '孵化软件许可证合规性检查',
    },
    {
      维度: '合法合规',
      名称: '许可证与版权声明防篡改',
      优先级: '高',
      含义: '孵化软件涉及第三方开源软件的许可证和版权声明篡改检查：项目中不能篡改第三方开源软件的许可证和版权声明',
    },
    {
      维度: '合法合规',
      名称: '软件包签名',
      优先级: '中',
      含义: '孵化项目软件包数据签名校验检查：项目发布的版本需要进行数字签名或带有哈希摘要，以校验下载包的完整可靠',
    },
    {
      维度: '技术生态',
      名称: 'README',
      优先级: '高',
      含义: '仓库是否在特定位置包含 README 文档，且命名、内容符合规范 (简明扼要地描述本项目的功能，显示项目的孵化状态) 检查',
    },
    {
      维度: '技术生态',
      名称: '构建文档',
      优先级: '高',
      含义: '仓库是否包括构建文档，应在特定位置或 README 中检查',
    },
  ];
  return (
    <div className="flex flex-col border bg-[#f9f9f9] p-6">
      <div className="mb-4 text-lg font-semibold">合法合规</div>
      <div className="flex h-6 items-center justify-start">
        <div className="h-1.5 w-[600px] bg-[#e5e5e5]">
          <div
            className="h-1.5 w-[75%] bg-green-400"
            // style={{
            //   width: `${score}%`,
            //   backgroundColor: color,
            // }}
          ></div>
        </div>
        <div className="ml-4 text-base font-semibold">73%</div>
      </div>
      <div className="mt-6 w-full border-b">
        {items.map((item) => {
          return (
            <div
              key={item.名称}
              className="flex h-[70px] border border-b-0 bg-white px-4 py-3"
            >
              <div className="flex w-12 items-center justify-start pl-2 text-lg text-green-600">
                <CheckCircleOutlined rev={undefined} />
              </div>
              <div className="">
                <div className="flex text-base font-semibold">
                  {item.名称}
                  <div className="ml-4">
                    {item.优先级 === '高' ? (
                      <Tag color="orange">优先级： {item.优先级}</Tag>
                    ) : (
                      <Tag color="cyan">优先级： {item.优先级}</Tag>
                    )}
                  </div>
                </div>
                <div className="mt-1 text-xs">{item.含义}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationDetail = () => {
  return (
    <>
      <EvaluationScore />
      <div className="mt-6">
        <EvaluationMertic />
      </div>
    </>
  );
};

export default EvaluationDetail;
