import React from 'react';
import type { CiBill } from '../types';
import { ScrollX, Table, Td, Th } from './Table';
import { EmptyState, ValText } from './shared';

/** 机时账单 · 资源池 × 阶段 */
const MachineHourBill: React.FC<{ bill: CiBill }> = ({ bill }) => {
  if (!bill.cols.length || !bill.rows.length) {
    return <EmptyState>本周暂无机时账单数据。</EmptyState>;
  }
  return (
    <div className="flex flex-col gap-2">
      <ScrollX>
        <Table>
          <thead>
            <tr>
              {bill.cols.map((c, i) => (
                <Th key={c} numeric={i > 0}>
                  {c}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bill.rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) => (
                  <Td key={ci} numeric={ci > 0}>
                    <ValText value={c} />
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollX>
      {bill.note ? (
        <p className="text-[11.5px] leading-relaxed text-slate-400">
          {bill.note}
        </p>
      ) : null}
    </div>
  );
};

export default MachineHourBill;
