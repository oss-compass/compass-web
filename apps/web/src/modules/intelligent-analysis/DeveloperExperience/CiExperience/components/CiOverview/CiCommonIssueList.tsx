import React from 'react';
import { Pagination } from 'antd';

const PAGE_SIZE = 10;

const CiCommonIssueList = <Item,>({
  items,
  renderItem,
}: {
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
}) => {
  const [page, setPage] = React.useState(1);
  const lastPage = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, lastPage);
  const start = (currentPage - 1) * PAGE_SIZE;

  React.useEffect(() => {
    setPage((current) => Math.min(current, lastPage));
  }, [lastPage]);

  return (
    <>
      <div key={currentPage} className="min-h-0 flex-1 overflow-y-auto">
        <ul
          aria-label="共性问题列表"
          className={`m-0 grid list-none grid-cols-1 gap-2 p-0 ${
            lastPage === 1 ? 'min-h-full' : ''
          }`}
        >
          {items.slice(start, start + PAGE_SIZE).map(renderItem)}
        </ul>
      </div>
      {lastPage > 1 && (
        <nav
          aria-label="共性问题分页"
          className="mt-3 flex shrink-0 justify-end"
        >
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={items.length}
            size="small"
            showLessItems
            showSizeChanger={false}
            onChange={setPage}
          />
        </nav>
      )}
    </>
  );
};

export default CiCommonIssueList;
