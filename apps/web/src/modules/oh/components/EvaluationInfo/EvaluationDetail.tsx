import React, { useState } from 'react';
import { AiOutlineLeftCircle } from 'react-icons/ai';
// import { RightOutlined } from '@ant-design/icons';
import { TbMessage2 } from 'react-icons/tb';
import { Tag, Descriptions } from 'antd';
import { getPathname } from '@common/utils';
import Pie from '@modules/oh/components/EvaluationInfo/Pie';
import EvaluationDownLoad from '@modules/oh/components/EvaluationInfo/EvaluationDownLoad';
import MetricDrawer from '@modules/oh/components/EvaluationInfo/MetricDrawer';
import RiskBadge from '@modules/oh/components/EvaluationInfo/RiskBadge';
import RiskFetcher from '@modules/oh/store/RiskFetcher';
import {
  metricList,
  getEvaluationDetail,
  getMetricItemScore,
  setMetricIcon,
  setRiskTag,
} from '@modules/oh/components/EvaluationInfo/MerticDetail';

const EvaluationTopScore = ({ items, score }) => {
  const clickAnchor = (e: any, id: string) => {
    e.preventDefault();
    let anchorElement = document.getElementById(id);
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };
  return (
    <div className="mt-6 flex h-52 border bg-[#f9f9f9]">
      <div className="flex h-full w-40 items-center ">
        <Pie score={score} />
      </div>
      <div className="flex-1 px-6 pt-5">
        {items?.map(({ name, score }) => {
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

const EvaluationMerticItem = ({ report, mertic, items, score, showDrawer }) => {
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
        <div className="ml-4 text-base font-semibold">{score}</div>
      </div>
      <div className="mt-6 w-full border-b">
        {items.map((item) => {
          return (
            <div
              key={item.指标名称}
              onClick={() => {
                showDrawer(item);
              }}
              className="flex h-[90px] cursor-pointer border border-b-0 bg-white px-4 py-3 hover:bg-[#f5f6fd]"
            >
              <div className="flex w-12 flex-shrink-0 items-center justify-start pl-2 text-lg text-green-600">
                {setMetricIcon(item)}
              </div>
              {/* <div className="mr-4 flex items-center justify-center">
                {item.score}
              </div> */}
              <div className="flex-1 pr-3">
                <div className="flex h-[29px] text-base font-semibold">
                  <div className="flex-shrink-0"> {item.指标名称}</div>
                  <div className="ml-4">
                    {item.风险重要性 === '高' ? (
                      <Tag color="geekblue">重要性： {item.风险重要性}</Tag>
                    ) : (
                      <Tag color="cyan">重要性： {item.风险重要性}</Tag>
                    )}
                  </div>
                  <div className="ml-2">{setRiskTag(item)}</div>
                </div>
                <div
                  title={item.指标意义.split('\n\n')}
                  className="line-clamp-2 mt-1 text-xs"
                >
                  {item.指标意义.split('\n\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <RiskBadge shortCode={report.shortCode} keyId={item.key} />
              {/* <div
                title="风险澄清"
                className="flex w-8 flex-shrink-0 items-center justify-center"
              >
                <Badge count={0} size="small">
                  <TbMessage2 className="text-xl" />
                </Badge>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationMertic = ({ allData }) => {
  const data = getMetricItemScore(allData.tpcSoftwareReportMetric);
  const [metric, setMetric] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = (item) => {
    setOpen(true);
    setMetric(item);
  };
  const nextAndPre = (type) => {
    const index = data.findIndex((z) => z.key === metric.key);
    if (type === 'next') {
      if (index < data.length - 1) {
        setMetric(data[index + 1]);
      } else {
        setMetric(data[0]);
      }
    } else {
      if (index > 0) {
        setMetric(data[index - 1]);
      } else {
        setMetric(data[data.length - 1]);
      }
    }
  };
  return (
    <div className="mt-6">
      {metricList.map((mertic) => {
        const items = data.filter((item) => item.维度 === mertic);
        const score = allData.evaluationDetail.find(
          (item) => item.name === mertic
        ).score;
        return (
          <EvaluationMerticItem
            report={allData}
            showDrawer={showDrawer}
            key={mertic}
            mertic={mertic}
            items={items}
            score={score}
          />
        );
      })}
      <MetricDrawer
        // report={getPathname(allData.codeUrl)}
        report={allData}
        metric={metric}
        open={open}
        onClose={() => setOpen(false)}
        nextAndPre={nextAndPre}
      />
    </div>
  );
};
const EvaluationBaseInfo = ({ item }) => {
  const baseItems = [
    {
      key: '1',
      label: '软件名称',
      children: item.name,
    },
    {
      key: '2',
      label: '所属领域',
      children: item?.tpcSoftwareSig?.name,
    },
    {
      key: '3',
      label: '开发商',
      children: item.manufacturer,
    },
    {
      key: '4',
      label: '编程语言',
      children: item.programmingLanguage,
    },
    {
      key: '5',
      label: '代码量',
      children: item.codeCount,
    },
    {
      key: '6',
      label: '官网地址',
      children: (
        <>
          <a
            className="line-clamp-1 text-[#69b1ff]"
            target="_blank"
            href={item.websiteUrl}
          >
            {item.websiteUrl}
          </a>
        </>
      ),
    },
    {
      key: '7',
      label: '源码地址',
      children: (
        <>
          <a className="text-[#69b1ff]" target="_blank" href={item.codeUrl}>
            {item.codeUrl}
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="mt-6 border bg-[#f9f9f9] p-6 pb-3">
      <div className="mb-4 text-lg font-semibold">基础信息</div>
      <div className="oh">
        <Descriptions items={baseItems} />
      </div>
    </div>
  );
};
const EvaluationDetail = ({ back, item }: { item: any; back?: () => void }) => {
  if (!item.evaluationDetail) {
    item = getEvaluationDetail(item);
  }
  return (
    <div>
      <RiskFetcher shortCode={item.shortCode} />
      <div className="flex justify-between border bg-[#f9f9f9] py-3 px-6">
        <div className="flex">
          {back && (
            <AiOutlineLeftCircle
              onClick={() => {
                back();
              }}
              className="mr-2  cursor-pointer text-2xl text-[#3f60ef]"
            />
          )}
          <div className="text-lg font-semibold">
            <a
              className="hover:underline"
              href={item.codeUrl}
              target="_blank"
            >{`${getPathname(item.codeUrl) || item.name}`}</a>{' '}
            选型评估报告
          </div>
          <div className="mt-2 ml-4 text-xs">
            更新于：
            {item?.tpcSoftwareReportMetric?.updatedAt?.slice(0, 10) || ''}
          </div>
        </div>
        <div className="float-right cursor-pointer text-lg">
          <EvaluationDownLoad item={item} />
        </div>
      </div>
      <EvaluationBaseInfo item={item} />
      <EvaluationTopScore items={item.evaluationDetail} score={item.score} />
      <EvaluationMertic allData={item} />
    </div>
  );
};

export default EvaluationDetail;
