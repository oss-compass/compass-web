import React, { useState } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import { useTpcSoftwareSelectionReportPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import { getMetricScore } from '@modules/oh/components/EvaluationInfo/MerticDetail';
import Loading from '@modules/oh/components/Loading';
import Pie from '@modules/oh/components/EvaluationInfo/Pie';

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
  selectFun,
}: {
  query: any;
  selected?: string;
  selectFun?: (name) => void;
}) => {
  const { isLoading, data } = useTpcSoftwareSelectionReportPageQuery(
    client,
    query
  );

  const dataList = data?.tpcSoftwareSelectionReportPage?.items;
  const items = getMetricScore(dataList || []);

  const [activeItem, setActiveItem] = useState(null);

  const [checked, setChecked] = useState([]);
  const onSelectChange = (isChecked, item) => {
    if (selectFun) {
      if (!isChecked) {
        setChecked([...checked, item]);
      } else {
        const pre = [...checked];
        pre.splice(
          pre.findIndex((c) => c.id === item.id),
          1
        );
        setChecked([...pre]);
      }
    }
  };
  const submit = () => {
    if (checked) {
      selectFun(checked);
    }
  };
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-222px)] w-full">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {activeItem ? (
        <div className="mb-6 h-[calc(100%-24px)] overflow-auto p-5">
          <EvaluationDetail
            item={activeItem}
            back={() => {
              setActiveItem(null);
            }}
          />
        </div>
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
                let isChecked = checked?.find((c) => c.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={classnames('h-[320px] w-[380px] border p-5 ', {
                      'cursor-pointer': selectFun,
                      'border-primary': isChecked,
                    })}
                    onClick={() => {
                      onSelectChange(isChecked, item);
                    }}
                  >
                    <div className="flex w-full justify-between text-xl font-semibold">
                      <div className="mr-2 w-[300px] overflow-hidden text-ellipsis">
                        <a
                          className="cursor-pointer hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveItem(item);
                          }}
                          title={item.name}
                        >
                          {item.name}
                        </a>
                      </div>

                      <div className="flex flex-shrink-0">
                        {selectFun && (
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                          />
                        )}
                      </div>
                    </div>
                    <div className="line-clamp-1 mt-4 flex text-sm font-normal text-[#3e8eff] hover:text-[#3e8eff] hover:underline">
                      <a
                        onClick={() => {
                          window.open(item.codeUrl, '_blank');
                        }}
                        title={item.codeUrl}
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
                      更新于：
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
