import React from 'react';
import type { CiDimCmpRow } from '../types';
import { ScrollX, Table, Td, Th } from './Table';
import { EmptyState, ValText } from './shared';

/** 四维度周对比 · 本周 vs 上周 */
const DimComparison: React.FC<{ rows: CiDimCmpRow[] }> = ({ rows }) => {
  if (!rows.length) {
    return <EmptyState>本周无对比数据。</EmptyState>;
  }
  return (
    <ScrollX>
      <Table>
        <thead>
          <tr>
            <Th>维度</Th>
            <Th>结果指标</Th>
            <Th numeric>本周</Th>
            <Th numeric>上周</Th>
            <Th>说明</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r[0]}-${r[1]}-${i}`}>
              <Td>{r[0]}</Td>
              <Td>{r[1]}</Td>
              <Td numeric>
                <ValText value={r[2]} className="font-semibold text-slate-800" />
              </Td>
              <Td numeric>
                <ValText value={r[3]} />
              </Td>
              <Td className="text-[11.5px] text-slate-400">{r[4]}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollX>
  );
};

export default DimComparison;
