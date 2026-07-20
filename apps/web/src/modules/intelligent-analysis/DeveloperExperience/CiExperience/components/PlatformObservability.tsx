import React from 'react';
import { ScrollX, Table, Td, Th } from './Table';

type CapKind = 'ok' | 'no';

type CapRow = {
  cap: React.ReactNode;
  status: React.ReactNode;
  statusKind: CapKind;
  impact: React.ReactNode;
  need: React.ReactNode;
  needWip?: boolean;
};

const statusClass: Record<CapKind, string> = {
  ok: 'text-emerald-600',
  no: 'text-rose-600',
};

const ROWS: CapRow[] = [
  {
    cap: 'run/job/step 遥测',
    status: '具备',
    statusKind: 'ok',
    impact: '全部',
    need: '—',
  },
  {
    cap: '日志按步骤下载（download_log，ZIP 分文件）',
    status: '具备',
    statusKind: 'ok',
    impact: '行级根因、Flaky 用例级、缓存命中率、冒烟分型',
    need: '—（需个人令牌）',
  },
  {
    cap: 'PR 关联（v5 pulls）',
    status: '具备',
    statusKind: 'ok',
    impact: 'PR 转绿时长、失败修复时长、CI 阻塞 PR',
    need: '—',
  },
  {
    cap: 'run 保留期',
    status: '≥7 天（07-11 首 run 仍在）',
    statusKind: 'ok',
    impact: '趋势连续性',
    need: '持续核查；验证仓自建落库兜底',
  },
  {
    cap: '执行机 API 权限',
    status: '已到位（仓库管理员令牌，07-18）',
    statusKind: 'ok',
    impact: 'org runner-groups 可查（1 组 modelarts_runner）',
    need: '—',
  },
  {
    cap: '资源池容量数据',
    status: (
      <>
        托管池容量不经 API 暴露；
        <b className="font-semibold">NPU 执行机为 ModelArts 动态注册</b>
        （常态列表空——正是「执行机未注册」失败的成因）
      </>
    ),
    statusKind: 'no',
    impact: '利用率分母缺；已上线 NPU 执行机在线轮询监测（fetch_runners.py）',
    need: '配额数据需团队提供',
    needWip: true,
  },
  {
    cap: '排队时长字段（pause_time 恒 0）',
    status: '缺失',
    statusKind: 'no',
    impact: '排队时长（现用近似口径）、挂死 vs 排队判别',
    need: '待提交需求',
  },
  {
    cap: '取消原因字段',
    status: '缺失',
    statusKind: 'no',
    impact: '无效机时构成（抢占/人工/超时不可分）',
    need: '待提交需求',
  },
  {
    cap: '执行耗时字段数据质量（execute_cost_time 有负值）',
    status: '脏数据',
    statusKind: 'no',
    impact: '已弃用，统一实际耗时（结束−开始）',
    need: '待提交数据质量单',
  },
  {
    cap: '失败信息含 UT 域/编译变体名；父节点透传子失败',
    status: '缺失（通用文案，须看 job 名）',
    statusKind: 'no',
    impact: '失败信息可读性、机器人回帖精度',
    need: '待提交需求',
  },
  {
    cap: '重跑标志 / 计费口径',
    status: '缺失',
    statusKind: 'no',
    impact: 'Flaky 精判（现用同代码重跑近似）、成本货币化（现用机时）',
    need: '待提交需求',
  },
  {
    cap: 'stage/job 名不被内容审查误遮蔽',
    status:
      '少量 run 的 stage/job 名显示为「内容违规已隐藏」（实测 runtime 5 起/ops-nn 6 起）',
    statusKind: 'no',
    impact: '阶段归因（矩阵中单列呈现，不并入其他阶段）',
    need: '待提交需求',
  },
];

/** 平台可观测性面板（GitCode Action 平台能力清单，兼作需求台账） */
const PlatformObservability: React.FC = () => (
  <div className="flex flex-col gap-2">
    <p className="text-[13.5px] text-slate-600">
      可观测性完备度：
      <b className="text-[20px] font-semibold tabular-nums text-slate-900">
        5 / 12
      </b>
      <span className="ml-1 text-[11.5px] text-slate-400">
        （2026-07-18 实测）
      </span>
    </p>
    <ScrollX>
      <Table>
        <thead>
          <tr>
            <Th>平台能力</Th>
            <Th>现状</Th>
            <Th>影响的指标</Th>
            <Th>需求状态</Th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr key={i}>
              <Td>{r.cap}</Td>
              <Td className={`font-medium ${statusClass[r.statusKind]}`}>
                {r.status}
              </Td>
              <Td>{r.impact}</Td>
              <Td className={r.needWip ? 'font-medium text-amber-600' : undefined}>
                {r.need}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollX>
  </div>
);

export default PlatformObservability;
