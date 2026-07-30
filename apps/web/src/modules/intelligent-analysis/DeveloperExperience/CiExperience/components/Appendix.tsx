import React, { type ReactNode } from 'react';
import appendixData from '../ci-appendix.json';
import { ScrollX, Table, Td, Th } from './Table';

// ── ci-appendix.json 形状（extract_ci.js 自源 HTML 的 DICT/TAXONOMY 抽取）──
type DictGroup = {
  no: string;
  title: string;
  cols: string[];
  rows: string[][]; // 11 列：层/中文名/英文名/落库位置/旅程段/指标定义/单位/计算方法/阈值/评分公式/责任方
  notes: string[];
  head: [string, string][]; // 组头要点 [标签, 内容]
};
type AppendixData = {
  dict: {
    version: string;
    updated: string;
    groups: DictGroup[];
    changelog: [string, string, string][]; // [版本, 日期, 变更]
  };
  taxonomy: {
    order: string[];
    rows: { cls: string; mechs: string[]; counts: Record<string, number> }[];
    window: string;
  };
};

const { dict, taxonomy } = appendixData as unknown as AppendixData;

const Code: React.FC<{ children: ReactNode }> = ({ children }) => (
  <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-slate-700">
    {children}
  </code>
);

const B: React.FC<{ children: ReactNode }> = ({ children }) => (
  <b className="font-semibold text-slate-900">{children}</b>
);

/** 数据单元格的轻量内联渲染：`**加粗**` 与 `` `code` ``（对齐源页面 mdcell 规则）。 */
const md = (s: string | null | undefined): ReactNode =>
  String(s ?? '')
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <B key={i}>{part.slice(2, -2)}</B>;
      if (part.startsWith('`') && part.endsWith('`'))
        return <Code key={i}>{part.slice(1, -1)}</Code>;
      return part;
    });

const Detail: React.FC<{ summary: ReactNode; children: ReactNode }> = ({
  summary,
  children,
}) => (
  <details className=">md:px-5 group rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
    <summary className="cursor-pointer list-none text-[13.5px] font-semibold text-slate-800 before:mr-1 before:content-['▸'] group-open:before:content-['▾']">
      {summary}
    </summary>
    {children}
  </details>
);

const Mini: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className="text-[11px] font-normal text-slate-400">{children}</span>
);

// 字典表列宽：0 层 / 1 中文名 宽列；5 指标定义 / 7 计算方法 长文列；其余窄列
const dictColClass = (i: number) =>
  i === 5 || i === 7
    ? 'min-w-[340px] max-w-[460px]'
    : i === 0 || i === 1
    ? 'min-w-[140px] max-w-[460px]'
    : 'min-w-[90px] max-w-[460px]';

const dictRowCount = dict.groups.reduce((n, g) => n + g.rows.length, 0);

// ── 附录 B · 改进受理人（源页面渲染函数中的固定映射）──
const TAX_OWNER: Record<string, ReactNode> = {
  代码失败:
    '贡献者（经告知渠道；报告不追究代码对错，只看有没有真把问题报给他）',
  'Action 平台失败': 'CANN 基础设施团队',
  待定: (
    <>
      —（<B>待定即暂缓归责</B>
      ：系统性失败拦截命中的失败移入此类，人工判读后回填改判；待定率被监控）
    </>
  ),
};

/** 口径与数据来源附录内容（三块折叠 Detail；由调用方提供卡片外壳与标题）。
 *  A/B 两块由 ci-appendix.json 数据驱动，随 extract_ci.js 一键同步。 */
const Appendix: React.FC = () => (
  <div className="flex flex-col gap-3">
    <Detail
      summary={
        <>
          附录 A · 指标字典{' '}
          <Mini>
            （唯一事实源 {dict.version}，{dict.updated}；共 {dictRowCount} 项）
          </Mini>
        </>
      }
    >
      <p className="mt-2 text-[11.5px] leading-relaxed text-slate-400">
        全量自动注入自唯一事实源{' '}
        <Code>Cogito/ci_experience_agent/docs/ci_metrics_dictionary.md</Code>
        （一个源两个渲染，决策
        54）——本附录不再手工维护，口径变更只改字典、重新注入即同步；此前的手写摘要表因双源漂移已废弃。
      </p>
      {dict.groups.map((g) => (
        <div key={g.no} className="mt-3">
          <p className="mb-1 text-[12.5px] font-semibold text-slate-800">
            {g.no} {md(g.title)}
          </p>
          {g.head.length ? (
            <ul className="mb-2 ml-4 list-disc text-[11.5px] leading-relaxed text-slate-500">
              {g.head.map(([label, text], i) => (
                <li key={i}>
                  <B>{label}</B>：{md(text)}
                </li>
              ))}
            </ul>
          ) : null}
          <ScrollX>
            <Table>
              <thead>
                <tr>
                  {g.cols.map((c, i) => (
                    <Th key={i}>{c}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.rows.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((cell, ci) => (
                      <Td key={ci} className={dictColClass(ci)}>
                        {md(cell)}
                      </Td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollX>
          {g.notes.length ? (
            <ul className="ml-4 mt-2 list-disc text-[11.5px] leading-relaxed text-slate-400">
              {g.notes.map((n, i) => (
                <li key={i}>{md(n)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
      <div className="mt-3">
        <p className="mb-1 text-[12.5px] font-semibold text-slate-800">
          版本记录
        </p>
        <ScrollX>
          <Table>
            <thead>
              <tr>
                <Th>版本</Th>
                <Th>日期</Th>
                <Th>变更</Th>
              </tr>
            </thead>
            <tbody>
              {dict.changelog.map((r, i) => (
                <tr key={i}>
                  <Td className="whitespace-nowrap font-semibold text-slate-800">
                    {r[0]}
                  </Td>
                  <Td className="whitespace-nowrap">{r[1]}</Td>
                  <Td>{md(r[2])}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollX>
      </div>
    </Detail>

    <Detail
      summary={
        <>
          附录 B · 失败分类学（两级：责任方 × 机理）{' '}
          <Mini>（自 classify.py 抽取，实测样本 {taxonomy.window}）</Mini>
        </>
      }
    >
      <p className="mt-2 text-[11.5px] leading-relaxed text-slate-400">
        全量<B>自 </B>
        <Code>parser/classify.py</Code>
        <B> 源码抽取</B>
        ，不再手工维护（决策 67）——手写版已实证漂移：「待定」列曾写 7
        条而分类器实际 9
        条，缺的「构建报错不可见」当天恰好有一张问题卡，读者查附录查不到。右列是各机理在全窗已标注失败
        run 中的实测条数（0 = 规则在册但本窗未命中）。
        <B>判定规则</B>
        （系统性失败拦截两道口径、Flaky
        分型、「规则顺序是安全要件」）不在此复述，见架构设计文档 §6.2。
      </p>
      <div className="mt-2">
        <ScrollX>
          <Table>
            <thead>
              <tr>
                <Th>一级（责任方，三类不扩）</Th>
                <Th>二级（机理，开放集合）· 全窗实测条数</Th>
                <Th>改进受理人</Th>
              </tr>
            </thead>
            <tbody>
              {taxonomy.rows.map((r) => (
                <tr key={r.cls}>
                  <Td className="whitespace-nowrap font-semibold text-slate-800">
                    {r.cls} <Mini>{r.mechs.length} 条</Mini>
                  </Td>
                  <Td className="min-w-[340px]">
                    {r.mechs.map((m, i) => (
                      <React.Fragment key={m}>
                        {i > 0 ? ' · ' : null}
                        <span className="whitespace-nowrap">
                          {m} <Mini>{r.counts[m]}</Mini>
                        </span>
                      </React.Fragment>
                    ))}
                  </Td>
                  <Td className="min-w-[200px] text-[12px] text-slate-500">
                    {TAX_OWNER[r.cls] ?? '—'}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollX>
      </div>
    </Detail>

    <Detail summary="附录 C · 数据来源（指针）">
      <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600">
        数据底座 = <Code>Cogito/ci_experience_agent/observation</Code>
        ：采集（GitCode v8 runs/jobs/steps + 日志 ZIP + v5 PR
        评论/commits/标签事件）→ 失败分类 → 日聚合 → 评分 → 本页。
        <B>逐项口径与已知局限不在此复述</B>，唯一事实源见：架构设计文档{' '}
        <Code>ci_experience_agent/docs/architecture.md</Code>（§4 管道、§5
        数据契约、§6.2 分类学、§6.4 评分与风险）与指标字典{' '}
        <Code>docs/ci_metrics_dictionary.md</Code>
        （逐指标计算方法、阈值、评分公式，即上方附录 A）。
      </p>
    </Detail>
  </div>
);

export default Appendix;
