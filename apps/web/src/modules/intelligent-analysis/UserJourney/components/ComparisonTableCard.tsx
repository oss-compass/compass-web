import React from 'react';
import classNames from 'classnames';
import { Card } from 'antd';

type ComparisonTableColumn = {
  key: string;
  title: string;
};

type ComparisonTableCell = {
  content: React.ReactNode;
  className?: string;
};

type ComparisonTableRow = {
  key: string;
  projectName: React.ReactNode;
  cells: Record<string, ComparisonTableCell>;
};

type ComparisonTableCardProps = {
  title: string;
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
};

const borderList = [
  'border-t-[#90E6FF]',
  'border-t-[#FFB290]',
  'border-t-[#B990FF]',
  'border-t-[#61a2ff]',
];

const bgList = ['bg-[#f2fcff]', 'bg-[#fff9f3]', 'bg-[#f8f3ff]', 'bg-[#ddebff]'];

const getColumnClassName = (index: number) =>
  classNames(
    borderList[index % borderList.length],
    bgList[index % bgList.length]
  );

const ComparisonTableCard: React.FC<ComparisonTableCardProps> = ({
  title,
  columns,
  rows,
}) => {
  return (
    <Card
      bordered={false}
      className="h-full rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24, height: '100%' }}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex min-h-[28px] items-center text-base font-semibold text-slate-800">
          {title}
        </div>
        <div className="min-h-0 flex-1 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="min-w-[180px] border-b border-b-white bg-slate-50 px-2 py-2 text-left text-sm font-semibold text-slate-700">
                  项目名称
                </th>
                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={classNames(
                      'min-w-[130px] border-b border-t-2 border-b-white px-2 py-2 text-center text-sm font-semibold text-slate-700',
                      getColumnClassName(index)
                    )}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="group">
                  <td className="border-b border-b-white bg-white px-2 py-2 text-left align-top">
                    <div className="text-sm font-semibold text-slate-900">
                      {row.projectName}
                    </div>
                  </td>
                  {columns.map((column, index) => {
                    const cell = row.cells[column.key];

                    return (
                      <td
                        key={`${row.key}-${column.key}`}
                        className={classNames(
                          'border-b border-b-white px-2 py-2 text-center text-sm text-slate-700',
                          getColumnClassName(index),
                          cell?.className
                        )}
                      >
                        {cell?.content ?? '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export type { ComparisonTableColumn, ComparisonTableRow };
export default ComparisonTableCard;
