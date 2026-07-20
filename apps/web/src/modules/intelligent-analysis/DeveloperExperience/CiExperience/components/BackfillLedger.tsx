import React from 'react';
import type { CiWeeklyProb } from '../types';
import { ScrollX, Table, Td, Th } from './Table';
import { EmptyState } from './shared';

/** 待定/回填台账 */
const BackfillLedger: React.FC<{ rows: CiWeeklyProb[] }> = ({ rows }) => {
  if (!rows.length) {
    return <EmptyState>本周无待回填条目。</EmptyState>;
  }
  return (
    <ScrollX>
      <Table>
        <thead>
          <tr>
            <Th>机理</Th>
            <Th>维度</Th>
            <Th numeric>累计 run</Th>
            <Th numeric>首现</Th>
            <Th>状态</Th>
            <Th>处置（人工判读后回填改判）</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr key={`${p.kb}-${i}`}>
              <Td>
                <b className="font-semibold text-slate-800">{p.kb}</b>
              </Td>
              <Td>{p.dim}</Td>
              <Td numeric>{p.runs}</Td>
              <Td numeric>{p.first}</Td>
              <Td>{p.status}</Td>
              <Td className="text-[11.5px] text-slate-400">{p.action}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollX>
  );
};

export default BackfillLedger;
