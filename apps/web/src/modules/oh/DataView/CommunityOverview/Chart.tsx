import React, { useState, useEffect } from 'react';
import { connect, init, getInstanceByDom } from 'echarts';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import { Select } from 'antd';

let TPC = {
  加解密算法: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  安全: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  编码转换: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  多媒体: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  文件数据与传输: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  字体字幕处理: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  工具: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  数据存储: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  数据库: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  网络: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  音视频: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  客户端: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  动画: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  框架类: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  日志打印: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  搜索引擎: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  UI: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  其他: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  消息传递: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  图像图形处理: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  办公: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  数据解析: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  文本解析器: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  图片: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  数据压缩算法: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
  深度学习: [
    'blockchain',
    'buildsystem',
    'distributeddatamgr',
    'distributedhardwaremgr',
    'edu_data_specification',
    'gaming',
    'mips',
  ],
};
let yList = Object.keys(TPC);
console.log(yList.length);
// prettier-ignore
function getRecentYearMonths() {
    var monthsArray: any = [];
    var currentDate = new Date(); // 获取当前日期
    for (var i = 0; i < 12; i++) {
      var month = currentDate.getMonth(); // 月份从 0 开始，需要加 1
      var year = currentDate.getFullYear();
      var formattedMonth: string = year + "-" + (month < 10 ? "0" : "") + month; // 格式化为 YYYY-MM 形式
      monthsArray.unshift(formattedMonth); // 将月份添加到数组的开头
      currentDate.setMonth(currentDate.getMonth() - 1); // 获取上一个月的日期
    }
    return monthsArray;
  }
const getdata = (days) => {
  const data: any = [];
  for (let d = 0; d < days.length; d += 1) {
    for (let j = 0; j < 52; j += 1) {
      data.push([d, j, Math.floor(Math.random() * (100 - 20 + 1)) + 20]);
    }
  }
  return data;
};
const Chart = () => {
  const [type, setType] = useState('活跃度');

  const { range } = useQueryDateRange();
  const hours = getRecentYearMonths();

  const initChart = () => {
    var chartDom = document.getElementById('main');
    var myChart = init(chartDom);
    const data_tmp = getdata(yList);
    const data = data_tmp.map(function (item) {
      return [item[1], item[0], item[2], item[3] || ''];
    });
    let option = {
      dataZoom: [
        {
          id: 'dataZoomY',
          type: 'slider',
          yAxisIndex: [0],
          startValue: 0,
          endValue: 40,
          filterMode: 'empty',
        },
      ],
      tooltip: {
        position: 'top',
      },
      grid: {
        height: '80%',
        width: 'auto',
        top: '5%',
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: yList,
        splitArea: {
          show: true,
        },
        axisTick: {
          show: false,
        },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        inRange: {
          color: ['#e2fae2', '#77c74e'],
        },
        dimension: 2,
        orient: 'horizontal',
        left: 'center',
        bottom: '1%',
      },
      series: [
        {
          name: '',
          type: 'heatmap',
          data: data,
          label: {
            // formatter:(item)=>{
            //   return item.data[2]
            //   console.log(item)
            // },
            show: false,
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            borderWidth: 2,
            borderColor: '#fff',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
    myChart.on('click', () => {
      window.open('https://compass.gitee.com/analyze/ck8eobrl');
    });
  };
  useEffect(() => {
    // init
    let chart: ECharts | undefined;
    initChart();
    return () => {
      chart?.dispose();
    };
  }, []);
  const onChange = (e) => {
    setType(e);
  };
  return (
    <>
      <div>
        模型：
        <Select onChange={onChange} style={{ width: 120 }} value={type}>
          <Select.Option value="活跃度">活跃度</Select.Option>
          <Select.Option value="社区响应">社区响应</Select.Option>
          <Select.Option value="代码贡献">代码贡献</Select.Option>
        </Select>
      </div>
      <div className="mt-2 h-[800px] w-full" id="main"></div>
    </>
  );
};

export default Chart;
