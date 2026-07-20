import React, { type ReactNode } from 'react';
import SectionCard from './SectionCard';
import { ScrollX, Table, Td, Th } from './Table';

const Code: React.FC<{ children: ReactNode }> = ({ children }) => (
  <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-slate-700">
    {children}
  </code>
);

const B: React.FC<{ children: ReactNode }> = ({ children }) => (
  <b className="font-semibold text-slate-900">{children}</b>
);

const Detail: React.FC<{ summary: string; children: ReactNode }> = ({
  summary,
  children,
}) => (
  <details className="group rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 >md:px-5">
    <summary className="cursor-pointer list-none text-[13.5px] font-semibold text-slate-800 before:mr-1 before:content-['▸'] group-open:before:content-['▾']">
      {summary}
    </summary>
    {children}
  </details>
);

// ── 附录 A · 指标字典（四维度 × 两层） ──
type DictRow = { layer: string; metric: ReactNode; spec: ReactNode };
type DictGroup = { dim: string; rows: DictRow[] };

const DICT: DictGroup[] = [
  {
    dim: '稳定性',
    rows: [
      {
        layer: '结果',
        metric: 'Action 平台失败率',
        spec: (
          <>
            <B>一级判为「Action 平台失败」的 run ÷ 全部失败 run</B>
            ；其二级机理含 资源申请/执行机注册/平台内部错误/镜像编排/外部依赖（OBS）/配置/Flaky-环境
          </>
        ),
      },
      {
        layer: '结果',
        metric: 'Flaky 率',
        spec: '代码未改、重跑转绿的失败 ÷ 全部失败；日志签名分型：Flaky-用例（归代码方）/Flaky-环境（归平台方）/Flaky-待分型（待定）；抽检校准后公布准确率',
      },
      {
        layer: '结果',
        metric: '流水线挂死数',
        spec: '取消前占用 ≥1h 的 run 数（长时间无进展仍占资源、最终被取消）',
      },
      {
        layer: '诊断',
        metric: 'Action 平台失败 job 数 / 故障事件数',
        spec: '平台原因失败 job 计数；按时间聚类为独立事件',
      },
      { layer: '诊断', metric: '总失败率（背景）', spec: '失败 run ÷ 完结 run' },
    ],
  },
  {
    dim: '效率',
    rows: [
      {
        layer: '结果',
        metric: '流水线时长（成功，中位数/90 分位）',
        spec: '单次成功 run 实际耗时（结束−开始）',
      },
      {
        layer: '诊断',
        metric: '排队时长（近似）/ 阶段耗时账单 / 最耗时 job / 效率矩阵',
        spec: '排队=触发→首个 job 开始执行（平台无队列字段，近似口径；实测全窗 ≤25 s）；效率矩阵=阶段×耗时统计对前 7 日基线',
      },
    ],
  },
  {
    dim: '交互体验',
    rows: [
      {
        layer: '结果',
        metric: '首次失败耗时',
        spec: '触发 → 第一个失败 job 结束（多快知道"这次不行"）；按责任方分列',
      },
      {
        layer: '结果',
        metric: 'PR 转绿时长（中位数/90 分位）',
        spec: 'PR 首次触发 CI → 首个全绿（滚动 7 日）',
      },
      {
        layer: '结果',
        metric: '失败修复时长',
        spec: '失败 → 同一 PR 下一个成功（每 PR 记首段，滚动 7 日）',
      },
      {
        layer: '诊断',
        metric: '重试失败率 / CI 阻塞 PR 数 / 失败可归因率 / 失败信息可读性',
        spec: '重试失败率=紧跟失败的重跑仍失败占比（未决不计）',
      },
    ],
  },
  {
    dim: '成本',
    rows: [
      {
        layer: '结果',
        metric: 'CI 资源占用时长（机时，按池）',
        spec: 'Σ job 实际耗时，按资源池细化，NPU 单列',
      },
      {
        layer: '结果',
        metric: '无效机时',
        spec: '取消、挂死、Action 平台故障 run 消耗的机时（代码失败消耗不计入：CI 履职拦截成本）',
      },
      {
        layer: '诊断',
        metric: '成本矩阵（阶段×机时归属）/ 资源池利用率（待容量）/ 缓存命中率 / 冗余作业候选',
        spec: '整 run 归属口径：失败 run 全程机时按其失败责任方计；利用率=占用÷容量',
      },
    ],
  },
];

// ── 附录 B · 失败分类器 v1 ──
const CLS_ROWS: [ReactNode, ReactNode, ReactNode][] = [
  [
    '代码失败',
    '编译/包校验 · 单元测试 · 规范检查 · 代码检查 · Flaky-用例',
    '贡献者（经失败分型回帖告知）',
  ],
  [
    'Action 平台失败',
    '资源申请 · 执行机注册 · 平台内部错误 · 镜像/编排 · 外部依赖（OBS） · 配置 · Flaky-环境',
    'CANN 基础设施团队',
  ],
  [
    '待定',
    '真机冒烟 · get_pr 解析 · Flaky-待分型 · 上游产物缺失 · 未归类',
    '—（待定率被监控，目标 <10%）',
  ],
];

type AppendixProps = { cardIndex?: number };

const Appendix: React.FC<AppendixProps> = ({ cardIndex }) => (
  <SectionCard cardIndex={cardIndex} title="附录 · 口径与数据来源">
    <div className="flex flex-col gap-3">
      <Detail summary="附录 A · 指标字典（四维度 × 两层）">
        <div className="mt-3">
          <ScrollX>
            <Table>
              <thead>
                <tr>
                  <Th>维度</Th>
                  <Th>层</Th>
                  <Th>指标</Th>
                  <Th>口径</Th>
                </tr>
              </thead>
              <tbody>
                {DICT.flatMap((g) =>
                  g.rows.map((r, ri) => (
                    <tr key={`${g.dim}-${ri}`}>
                      {ri === 0 ? (
                        <Td
                          className="font-semibold text-slate-800"
                          {...({ rowSpan: g.rows.length } as { rowSpan: number })}
                        >
                          {g.dim}
                        </Td>
                      ) : null}
                      <Td>{r.layer}</Td>
                      <Td>{r.metric}</Td>
                      <Td>{r.spec}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </ScrollX>
        </div>
      </Detail>

      <Detail summary="附录 B · 失败分类器 v1（两级：责任方 × 机理）">
        <div className="mt-3 flex flex-col gap-2">
          <ScrollX>
            <Table>
              <thead>
                <tr>
                  <Th>一级（责任方，稳定）</Th>
                  <Th>二级（机理，开放集合）</Th>
                  <Th>owner</Th>
                </tr>
              </thead>
              <tbody>
                {CLS_ROWS.map((r, i) => (
                  <tr key={i}>
                    <Td className="font-semibold text-slate-800">{r[0]}</Td>
                    <Td>{r[1]}</Td>
                    <Td>{r[2]}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollX>
          <p className="text-[11.5px] leading-relaxed text-slate-400">
            判定规则（先于归类）：① 大面积同挂（同 run ≥3 个独立 UT
            域/编译变体失败，或同失败步骤当日跨 ≥5 个 PR）→
            标「疑似系统性」，暂缓归责贡献者，转基础设施排查；② 上游产物缺失 →
            归上游原因。Flaky 分型：同 PR 同 commit
            重跑转绿的失败，读失败步骤日志签名——环境类（OOM/网络/进程被杀）→
            Flaky-环境；用例类（断言/用例失败）→ Flaky-用例；判不了 →
            Flaky-待分型。流水线：规则匹配 → 日志正则 → LLM 兜底 → 待定；
            <B>100% 处理，显式待定率</B>。每个失败 run 输出：责任方 × 机理 ×
            位置（stage → job → step）。
          </p>
        </div>
      </Detail>

      <Detail summary="附录 C · 数据来源与验证仓">
        <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600">
          数据底座 = 验证仓 <Code>gitcode-ci-lab</Code>
          （设计中）：collector（runs/jobs/日志 ZIP
          日增量采集，令牌走环境变量）→ parser（失败分类器+四维度日聚合）→
          data/daily（报告唯一读取源）。GitCode API：v8 runs/jobs/steps（免鉴权）、
          <Code>download_log</Code>（个人令牌，ZIP 按步骤分文件）、v5 pulls（PR
          关联，聚合键 pull_request_id）。计时一律实际耗时（结束−开始）；
          execute_cost_time 弃用；CANCELED/INIT 不计失败。样例：
          <a
            href="https://gitcode.com/cann/runtime/actions/runs/a3fa001a798e43afb86ae56c30125c1f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            runtime run #477
          </a>
          。
        </p>
      </Detail>
    </div>
  </SectionCard>
);

export default Appendix;
