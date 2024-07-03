import React, { useState } from 'react';
import { Input, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import NotFoundOh from '@modules/oh/components/NotFoundOh';
import Loading from '@modules/oh/components/Loading';
import Analyzing from '@modules/oh/components/Analyzing';

import useLabelData from '@modules/oh/hooks/useLabelData';

const DetailItem = ({ item }) => {
  <div className="div">
    <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
      <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
        {'TPC 软件报告详情'}
        <div>
          <Input prefix={<SearchOutlined rev={undefined} />} />
        </div>
      </div>
      <div className="relative mb-6 flex h-[calc(100%-60px)] justify-center overflow-auto p-5">
        <EvaluationDetail item={item} />
      </div>
    </div>
  </div>;
};

const DetailPage = () => {
  const { isLoading, status, reportItems, notFound } = useLabelData();
  if (isLoading) {
    return (
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <Loading />;
      </div>
    );
  }
  if (notFound) {
    return <NotFoundOh />;
  }
  if (status != 'success') {
    return <Analyzing />;
  }
  return (
    <div className="div">
      <div className="relative flex h-[calc(100vh-170px)] flex-1 flex-col border bg-white drop-shadow-sm">
        <div className="oh-tabs flex items-center justify-between border-b px-5 py-3 font-semibold">
          {'TPC 软件报告详情'}
          <div>
            {/* <Input prefix={<SearchOutlined rev={undefined} />} /> */}
          </div>
        </div>
        <div className="relative mb-6 flex h-[calc(100%-60px)] justify-center overflow-auto p-5">
          {reportItems.length === 1 ? (
            <EvaluationDetail item={reportItems[0]} />
          ) : (
            <Tabs
              className="oh-antd"
              size={'small'}
              items={reportItems.map((r) => {
                return {
                  key: r.id + '',
                  label: r.name,
                  children: <EvaluationDetail item={r} />,
                };
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
