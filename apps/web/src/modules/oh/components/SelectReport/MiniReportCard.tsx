import React, { useState } from 'react';
import classnames from 'classnames';
import MiniEvaluationDetail from './MiniEvaluationDetail';

const MiniReportCard = ({
  item,
  isChecked,
  onSelect,
  onDetail,
  showCheckbox,
  reportMetricName,
}) => (
  <div
    className={classnames('h-[320px] w-[380px] border p-5', {
      'border-primary cursor-pointer': isChecked,
    })}
    onClick={() => showCheckbox && onSelect(isChecked, item)}
  >
    <div className="flex justify-between text-xl font-semibold">
      <a
        className="line-clamp-1 hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          onDetail();
        }}
        title={item.name}
      >
        {item.name}
      </a>
      {showCheckbox && (
        <input type="checkbox" checked={isChecked} onChange={() => {}} />
      )}
    </div>

    <CodeLink url={item.codeUrl} />
    <Description text={item.description} />
    <MiniEvaluationDetail
      score={item.score}
      evaluationDetail={item.evaluationDetail}
    />
    <UpdateTime date={item?.[reportMetricName]?.updatedAt} />
  </div>
);

// 子组件封装
const CodeLink = ({ url }: { url: string }) => (
  <div className="line-clamp-1 mt-4 text-sm text-[#3e8eff] hover:underline">
    <a onClick={() => window.open(url, '_blank')} title={url}>
      {url}
    </a>
  </div>
);

const Description = ({ text }: { text: string }) => (
  <div className="line-clamp-2 my-3 text-sm font-medium" title={text}>
    {text}
  </div>
);

const UpdateTime = ({ date }: { date?: string }) => (
  <div className="mt-4 text-right text-xs">
    更新于：{date?.slice(0, 10) || ''}
  </div>
);
export default React.memo(MiniReportCard);
