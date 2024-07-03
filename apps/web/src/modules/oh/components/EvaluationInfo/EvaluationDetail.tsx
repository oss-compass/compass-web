import React from 'react';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { DownloadOutlined } from '@ant-design/icons';
import { Tag, Descriptions, Dropdown, Popover } from 'antd';
import type { MenuProps } from 'antd';
import { getPathname } from '@common/utils';
import Pie from '@modules/oh/components/EvaluationInfo/Pie';
import {
  downloadReport,
  getEvaluationDetail,
  getMetricItemScore,
  setMetricIcon,
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

const EvaluationMerticItem = ({ mertic, items, score }) => {
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
                {setMetricIcon(item)}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EvaluationMertic = ({ allData }) => {
  let metricList = ['合法合规', '技术生态', '生命周期', '网络安全'];
  const data = getMetricItemScore(allData.tpcSoftwareReportMetric);
  return (
    <div className="mt-6">
      {metricList.map((mertic) => {
        const items = data.filter((item) => item.维度 === mertic);
        const score = allData.evaluationDetail.find(
          (item) => item.name === mertic
        ).score;
        return (
          <EvaluationMerticItem
            key={mertic}
            mertic={mertic}
            items={items}
            score={score}
          />
        );
      })}
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
  const dropdownItem: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          onClick={() => {
            downloadReport(item);
          }}
        >
          下载 CSV
        </a>
      ),
    },
  ];
  return (
    <div>
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
          <Dropdown placement="bottom" menu={{ items: dropdownItem }}>
            <DownloadOutlined rev={undefined} />
          </Dropdown>
        </div>
      </div>
      <EvaluationBaseInfo item={item} />
      <EvaluationTopScore items={item.evaluationDetail} score={item.score} />
      <EvaluationMertic allData={item} />
    </div>
  );
};

export default EvaluationDetail;
