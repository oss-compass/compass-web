import React from 'react';
import { Tabs } from 'antd';
import EvaluationDetail from '@modules/oh/components/EvaluationInfo/EvaluationDetail';
import NotFoundOh from '@modules/oh/components/NotFoundOh';

const PeportPageItem = ({ reportItems }) => {
  if (!reportItems && reportItems === 0) {
    return <NotFoundOh />;
  }
  return (
    <>
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
              children: (
                <div className="pt-4">
                  <EvaluationDetail item={r} />
                </div>
              ),
            };
          })}
        />
      )}
    </>
  );
};

export default PeportPageItem;
