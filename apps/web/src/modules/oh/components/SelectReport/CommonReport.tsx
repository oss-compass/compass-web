import React, { useState } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import client from '@common/gqlClient';
import Loading from '@modules/oh/components/Loading';
import Pagination from '@common/components/Antd/Pagination';
import MiniReportCard from './MiniReportCard';

const CommonReport = ({
  query,
  selectFun,
  fetcher,
  getMetricScore,
  GetReportComponent,
  reportMetricName,
}) => {
  const [page, setPage] = useState(1);

  const [activeItem, setActiveItem] = useState(null);
  const [checked, setChecked] = useState([]);

  // 数据获取
  const { data, isLoading, isFetching } = fetcher(client, {
    ...query,
    page,
    per: 30,
  });
  if (isFetching) {
    return (
      <div className="h-[calc(100vh-218px)] w-full">
        <Loading />
      </div>
    );
  }
  if (!data) return <div className="p-10 text-center">暂无数据</div>;
  const key = Object.keys(data)[0];
  const items = getMetricScore(data?.[key]?.items || []);
  const totalCount = data?.[key].count || 0;

  // 选择逻辑
  const onSelectChange = (isChecked, item) => {
    setChecked((prev) =>
      prev.some((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item]
    );
  };
  //毕业只能单选
  const onSelectChangeGraduate = (isChecked, item) => {
    if (selectFun) {
      if (!isChecked) {
        setChecked([item]);
      } else {
        setChecked([]);
      }
    }
  };
  // 提交逻辑
  const submit = () => selectFun?.(checked);
  if (totalCount === 0) return <div className="p-10 text-center">暂无数据</div>;

  return (
    <>
      {activeItem ? (
        <div className="mb-6 h-[calc(100%-24px)] overflow-auto p-5">
          <GetReportComponent
            canClarify={false}
            shortCode={activeItem.shortCode}
            back={() => setActiveItem(null)}
          />
        </div>
      ) : (
        <div className="relative h-full w-full">
          <div
            className={classnames('h-[calc(100vh-266px)] overflow-auto', {
              border: selectFun,
            })}
          >
            <div className="mx-auto flex flex-wrap gap-6 p-6 xl:max-w-[900px] 2xl:w-[1079px]">
              {items.map((item) => (
                <MiniReportCard
                  key={item.id}
                  item={item}
                  isChecked={checked.some((c) => c.id === item.id)}
                  onSelect={
                    reportMetricName === 'graduationReportMetric'
                      ? onSelectChangeGraduate
                      : onSelectChange
                  }
                  onDetail={() => setActiveItem(item)}
                  showCheckbox={!!selectFun}
                  reportMetricName={reportMetricName}
                />
              ))}
            </div>

            <Pagination
              total={totalCount}
              current={page}
              pageSize={30}
              onChange={setPage}
              className="flex justify-center py-6"
            />
          </div>

          {selectFun && (
            <div className="flex justify-center pt-4">
              <Button type="primary" onClick={submit}>
                确定
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CommonReport;
