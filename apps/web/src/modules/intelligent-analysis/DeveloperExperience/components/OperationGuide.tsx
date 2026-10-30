import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  buildIssueRepoManagementHref,
  buildLegacyCommunityRepoManagementHref,
} from '../routes';

type GuideModule = 'community-onboarding' | 'issue';
type GuideSection = 'account' | 'repository' | 'pain';

type Chapter = {
  id: GuideSection;
  title: string;
  description: string;
  steps: Array<{ title: string; detail: string }>;
  notes: string[];
};

const renderGuideText = (text: string) =>
  text.split(/(“[^”]+”)/g).map((part, index) =>
    part.startsWith('“') && part.endsWith('”') ? (
      <React.Fragment key={index}>
        “
        <strong className="font-semibold text-slate-800">
          {part.slice(1, -1)}
        </strong>
        ”
      </React.Fragment>
    ) : (
      part
    )
  );

const getChapters = (module: GuideModule): Chapter[] => {
  const issue = module === 'issue';
  return [
    {
      id: 'account',
      title: '注册与登录',
      description: '使用操作账号登录后，可管理负责的仓库。',
      steps: [
        {
          title: '进入仓库管理',
          detail:
            '在总览页仓库区域点击“仓库管理”，或使用下方“前往仓库管理”链接。未登录时按页面提示登录。',
        },
        {
          title: '注册操作账号',
          detail:
            '部分仓库负责人的账号已由系统自动创建，可直接使用邮箱和初始密码登录。尚无账号时，在登录弹窗点击“注册账号”，填写展示名称、邮箱、至少 6 位密码，并选择负责仓库，再点击“注册并继续”。邮箱用于登录和接收通知。',
        },
        {
          title: '核对当前账号和权限',
          detail:
            '已有账号可使用邮箱和密码登录。仓库负责人管理授权仓库，管理员可管理全部仓库；权限范围以页面校验结果为准。需要更换身份时使用“切换账号”。',
        },
      ],
      notes: [
        '报告页的账号校验弹窗只支持已有账号登录；需要注册时请先前往仓库管理。',
        '系统自动创建的账号会通过邮件发送账号信息。如忘记初始密码，可在账号对应的邮箱中搜索“报告重跑功能账号信息”，查看邮件中的登录信息；若仍无法登录，请联系管理员协助。',
      ],
    },
    {
      id: 'repository',
      title: '仓库上下线与备注',
      description: `请在${
        issue ? '社区贡献' : '社区入门'
      }对应的仓库管理页操作。两类总览的上下线状态和备注分别维护。`,
      steps: [
        {
          title: '找到目标仓库',
          detail:
            '进入仓库管理，按仓库名称、负责人或备注搜索，确认当前模块和目标仓库。',
        },
        {
          title: '填写或修改备注',
          detail:
            '点击仓库行的“编辑”，在“备注”中填写说明并保存。未上线仓库填写暂不上线的原因并保存，即完成备案，可在“已备案”中查看。没有编辑入口时请核对账号的仓库权限。',
        },
        {
          title: '申请上线',
          detail: issue
            ? '在“Issue 总览”列点击上下线开关并确认。有可用报告时纳入总览；无报告时先检查上线标准，达标后生成报告并入库，再完成上线。'
            : '在“总览看板”列点击上下线开关并确认。有可上线报告时纳入总览；否则先生成报告或等待已有报告审核。审核通过并入库后，会通过邮件提醒上线。',
        },
        {
          title: '查看进度或下线',
          detail:
            '上线流程尚未完成时，仓库行会显示待处理提示，可按提示取消申请。已上线仓库可点击开关并确认下线，下线后不再纳入对应总览统计。',
        },
      ],
      notes: [
        '备注用于暂缓上线备案时，请说明具体原因；恢复上线前请核对并处理备案备注，再操作上线开关。已上线仓库填写备注不会自动下线。',
        ...(issue
          ? ['报告生成中不代表已经上线，请等待流程完成并刷新查看。']
          : [
              '社区入门报告入库提醒后 7 天会再次提醒，再过 7 天仍未上线或备案将自动上线；具体时间以邮件提醒和系统检查为准。',
            ]),
        '上线成功后会邮件通知仓库负责人和管理员；遇到权限或通知异常可联系管理员。',
      ],
    },
    issue
      ? {
          id: 'pain',
          title: '社区贡献痛点处理',
          description: '先区分质量类和效率类痛点，再处理涉及的 Issue。',
          steps: [
            {
              title: '查看痛点与涉及的 Issue',
              detail:
                '从总览进入仓库报告，在阶段详情中展开痛点，核对指标、证据及涉及的 Issue。效率类痛点标记为“无需跟踪修复”，持续关注后续同类问题即可。',
            },
            {
              title: '逐条判定有效性',
              detail:
                '质量类痛点处于“待确认”时，使用痛点操作入口逐项或批量判断 Issue 是否为有效问题。判定为非有效问题需补充原因并提交审核；审核期间留意待审核提示，驳回后重新判定。',
            },
            {
              title: '修复有效 Issue',
              detail:
                '对已确认有效的 Issue 完成修复后，标记“已修复”；误操作可撤销修复标记。单个 Issue 标记修复后即可发起复测，不必等待其他 Issue 全部修复。全部有效 Issue 修复后，痛点自动进入“已修复待复测”。',
            },
            {
              title: '发起单个或批量复测',
              detail:
                '在 Issue 行的操作区域点击“发起复测”，验证该条 Issue 的修复结果；也可勾选多条已修复的 Issue，点击“批量发起复测”。按提示填写提交人并确认，即可提交复测任务。批量操作会自动跳过复测中的 Issue，已复测通过的 Issue 无需重复复测。',
            },
            {
              title: '查看复测结果并继续处理',
              detail:
                '在弹窗右上角点击“重跑记录”查看任务进度和结果。复测报告应用后，系统自动更新 Issue 的复测结果和痛点状态；未通过的 Issue 需继续修复并再次复测，也可等待后续报告自动复测。待审核 Issue 的判定进度与有效 Issue 的修复进度分别展示，请同时留意。',
            },
          ],
          notes: [
            '全部 Issue 判定为非有效问题时，需等待相应审核通过后才会生效。',
            '后续新增 Issue 可能需要重新确认；可在痛点操作面板查看历史记录和当前期涉及范围。',
          ],
        }
      : {
          id: 'pain',
          title: '社区入门痛点处理',
          description:
            '结合执行证据确认问题，记录修复过程，再根据复测报告提交结论。',
          steps: [
            {
              title: '定位并核对痛点',
              detail:
                '从总览的仓库或待办痛点进入报告，在“任务与关键动作”的痛点区域查看描述和关联执行步骤，点击痛点状态入口打开处理面板。',
            },
            {
              title: '确认问题和严重程度',
              detail:
                '在“待确认”阶段核对痛点等级，按表单要求填写 Issue 链接、预计闭环时间等信息后提交。判定为非项目本身问题时需要补充原因，并等待管理员审核。',
            },
            {
              title: '完成修复并提交',
              detail:
                '确认问题后进入“已确认待修复”。完成实际修复后，在处理面板按要求补充 PR 链接等信息并提交，进入“已修复待复测”。',
            },
            {
              title: '核对复测报告并提交结论',
              detail:
                '生成新报告后核对执行结果；页面检测到可用报告时，可提交复测结论。通过时选择对应报告，未通过时继续修复。可在面板中查看历史记录，必要时按页面提供的回退操作修正状态。',
            },
          ],
          notes: [
            '常用流程：待确认 → 已确认待修复 → 已修复待复测 → 已复测通过；复测不通过后继续修复。历史记录中也可能出现“已复测待确认”，具体可提交的操作以当前状态为准。',
            '历史报告用于回看；处理时请核对当前仓库、任务和报告版本。',
          ],
        },
  ];
};

type OperationGuideProps = {
  module: GuideModule;
  section?: GuideSection;
  compact?: boolean;
};

const OperationGuide: React.FC<OperationGuideProps> = ({
  module,
  section = 'account',
  compact = false,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(section);
  const rawCaptureMode = router.query.captureMode;
  const captureMode = Array.isArray(rawCaptureMode)
    ? rawCaptureMode[0]
    : rawCaptureMode;
  if (!compact && (captureMode === '1' || captureMode === 'true')) return null;

  const chapters = getChapters(module);
  const active = chapters.find((chapter) => chapter.id === activeSection)!;
  const label = module === 'issue' ? '社区贡献' : '社区入门';
  const org =
    typeof router.query.org === 'string' ? router.query.org : undefined;
  const repoHref =
    module === 'issue'
      ? buildIssueRepoManagementHref({ org })
      : buildLegacyCommunityRepoManagementHref({ org });

  return (
    <>
      <Button
        type="link"
        size="small"
        icon={compact ? undefined : <QuestionCircleOutlined />}
        className={`!h-auto !border-0 !bg-transparent !px-0 !py-0 !shadow-none ${
          compact ? '!text-xs !font-normal' : '!text-sm !font-semibold'
        }`}
        onClick={(event) => {
          event.stopPropagation();
          setActiveSection(section);
          setOpen(true);
        }}
      >
        {compact ? '查看处理指引' : '操作指引'}
      </Button>
      <Drawer
        title={`${label} · 操作指引`}
        open={open}
        onClose={() => setOpen(false)}
        width="min(640px, 100vw)"
        zIndex={1200}
        destroyOnHidden
      >
        <nav aria-label="操作指引章节" className="mb-6 overflow-x-auto pb-1">
          <div className="inline-flex min-w-max items-center gap-1 rounded-[30px] bg-slate-200 px-1.5 py-[3px] shadow-[inset_0_1px_3px_rgba(15,23,42,0.06)]">
            {chapters.map((chapter) => {
              const selected = activeSection === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  aria-current={selected ? 'page' : undefined}
                  onClick={() => setActiveSection(chapter.id)}
                  className={`inline-flex items-center whitespace-nowrap rounded-3xl px-4 py-1.5 text-sm font-semibold text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 ${
                    selected
                      ? 'bg-white shadow-[0_1px_4px_rgba(15,23,42,0.08)]'
                      : 'hover:bg-white/50'
                  }`}
                >
                  {chapter.title}
                </button>
              );
            })}
          </div>
        </nav>
        <section key={active.id} aria-label={active.title}>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            {active.title}
          </h2>
          <p className="mb-6 text-sm leading-6 text-slate-500">
            {renderGuideText(active.description)}
          </p>
          <ol className="space-y-5">
            {active.steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-slate-800">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {renderGuideText(step.detail)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="mt-6 rounded-xl bg-slate-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              操作提示
            </h3>
            <ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-slate-600">
              {active.notes.map((note) => (
                <li key={note}>{renderGuideText(note)}</li>
              ))}
            </ul>
          </aside>
          {active.id !== 'pain' ? (
            <Link
              href={repoHref}
              onClick={() => setOpen(false)}
              className="mt-5 inline-block text-sm text-blue-600 hover:underline"
            >
              前往{label}仓库管理 →
            </Link>
          ) : null}
        </section>
      </Drawer>
    </>
  );
};

export default OperationGuide;
