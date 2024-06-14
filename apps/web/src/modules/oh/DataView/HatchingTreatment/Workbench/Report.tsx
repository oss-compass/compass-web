import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { EChartsOption, init } from 'echarts';
import Detail from '@modules/oh/DataView/HatchingTreatment/Workbench/Detail';
import { Button } from 'antd';

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
  items,
  selected,
  selectFun,
}: {
  items: any[];
  selected?: string;
  selectFun?: (name: string) => void;
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const [checked, setChecked] = useState<string>(selected);

  const submit = () => {
    if (checked) {
      selectFun(checked);
    }
  };
  return (
    <>
      {activeItem ? (
        <Detail setActiveItem={setActiveItem} />
      ) : (
        <div className="relative h-full">
          <div
            className={classnames('h-[calc(100vh-252px)] overflow-auto ', {
              border: selectFun,
            })}
          >
            <div className="flex  flex-wrap content-start gap-6 overflow-auto p-6">
              {items.map((item) => {
                return (
                  <div
                    key={item.name}
                    className={classnames('h-[320px] w-[380px] border p-5 ', {
                      'cursor-pointer': selectFun,
                      'border-primary': checked === item.name,
                    })}
                    onClick={() => {
                      selectFun && setChecked(item.name);
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
                            checked={checked === item.name}
                            onChange={() => {}}
                          />
                        )}
                      </div>
                    </div>
                    <div className="line-clamp-2 my-3 flex items-center text-sm font-medium">
                      {item.description}
                    </div>
                    <MiniEvaluationDetail
                      score={item.score}
                      evaluationDetail={item.evaluationDetail}
                    />
                    <div className="mt-4 flex justify-end text-xs">
                      更新于： {item.updated}
                    </div>
                  </div>
                );
              })}
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
