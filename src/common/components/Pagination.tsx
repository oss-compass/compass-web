import React from 'react';
import classnames from 'classnames';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import usePagination from '@mui/material/usePagination';

const Pagination: React.FC<{
  page: number;
  pageTotal: number;
  onChange: (page: number) => void;
}> = ({ page, pageTotal, onChange }) => {
  const { items } = usePagination({
    page,
    count: pageTotal,
    onChange(event, page) {
      onChange(page);
    },
  });

  return (
    <ul className="flex items-center justify-center">
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        switch (type) {
          case 'start-ellipsis':
          case 'end-ellipsis':
            children = '…';
            break;
          case 'page':
            children = (
              <button
                type="button"
                className={classnames(
                  'mx-1 h-[25px] rounded px-2.5 text-sm text-slate-600 hover:bg-blue-50',
                  [selected ? 'bg-blue-50 !text-primary' : '']
                )}
                {...item}
              >
                {page}
              </button>
            );
            break;
          case 'previous':
            children = (
              <button
                {...item}
                className={classnames(
                  'mx-1 h-[25px] cursor-pointer rounded px-2 text-slate-600 hover:bg-blue-50',
                  { 'cursor-not-allowed opacity-50 ': item.disabled }
                )}
              >
                <AiOutlineLeft />
              </button>
            );
            break;
          case 'next':
            children = (
              <button
                {...item}
                className={classnames(
                  'mx-1 h-[25px] cursor-pointer rounded px-2  text-slate-600 hover:bg-blue-50',
                  { 'cursor-not-allowed opacity-50 ': item.disabled }
                )}
              >
                <AiOutlineRight />
              </button>
            );
            break;
          default:
            children = (
              <button type="button" className="h-[25px]" {...item}>
                {type}
              </button>
            );
            break;
        }

        return <li key={index}>{children}</li>;
      })}
    </ul>
  );
};

export default Pagination;
