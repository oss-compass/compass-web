import React, { useCallback, useEffect, useState } from 'react';
import { Card, Descriptions, Tooltip, Typography, message } from 'antd';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import ExperienceScoreRulePopoverTrigger from './ExperienceScoreRulePopoverTrigger';
import JourneyPanoramaSection from './JourneyPanoramaSection';
import OperatorAccessModal from '../OverviewDashboard/OperatorAccessModal';
import {
  getExperienceGradeFromScore,
  getExperienceGradeGuideItem,
} from '../helpers';
import { JourneyStep, OverviewMetric, ReportMetadataItem } from '../types';
import {
  clearCompassOperatorToken,
  ContainerChannelAuthError,
  fetchCompassOperatorMe,
  getCompassOperatorToken,
  loginCompassOperator,
  openContainerChannel,
  setCompassOperatorToken,
  type CompassOperatorUser,
} from '../rawData/apiClient';

const { Text } = Typography;

const isOverallScoreMetric = (metric: OverviewMetric) =>
  metric.key === 'overall-score' || metric.key === 'overall-composite-score';

const renderMetricRecentValue = (metric: OverviewMetric) => {
  if (!metric.recentValues) {
    return null;
  }

  if (!isOverallScoreMetric(metric)) {
    return (
      <span className="shrink-0 text-right text-[11px] leading-5 text-slate-400">
        {metric.recentValues}
      </span>
    );
  }

  const score = Number(metric.value);

  if (!Number.isFinite(score)) {
    return (
      <span className="shrink-0 text-right text-[11px] leading-5 text-slate-400">
        {metric.recentValues}
      </span>
    );
  }

  const currentGrade = getExperienceGradeFromScore(score);
  const currentGradeItem = getExperienceGradeGuideItem(currentGrade);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium leading-4 ${currentGradeItem.badgeClassName}`}
    >
      {metric.recentValues}
    </span>
  );
};

type ReportSummaryCardProps = {
  projectName: string;
  reportMetadata: ReportMetadataItem[];
  overviewMetrics: OverviewMetric[];
  journeySteps: JourneyStep[];
  reportUpdatedAt: string;
  detailReportUrl?: string;
  projectVersion?: string;
  projectFileKey?: string;
  isLatestReport?: boolean;
  activeStepKey?: string;
  onStepChange?: (stepKey: string) => void;
  previewMode?: boolean;
};

const ReportSummaryCard: React.FC<ReportSummaryCardProps> = ({
  projectName,
  reportMetadata,
  overviewMetrics,
  journeySteps,
  reportUpdatedAt,
  detailReportUrl,
  projectVersion,
  projectFileKey,
  isLatestReport = false,
  activeStepKey,
  onStepChange,
  previewMode = false,
}) => {
  const [enteringContainer, setEnteringContainer] = useState(false);
  // 进入容器复测的登录校验（复用总览页 OperatorAccessModal 登录弹窗）。
  const [containerAccessOpen, setContainerAccessOpen] = useState(false);
  const [operatorUser, setOperatorUser] = useState<CompassOperatorUser | null>(
    null
  );
  const [authChecking, setAuthChecking] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // 挂载时若本地已有 token，静默校验登录态。
  useEffect(() => {
    let alive = true;
    const token = getCompassOperatorToken();
    if (!token) return;
    setAuthChecking(true);
    fetchCompassOperatorMe(token)
      .then((user) => {
        if (alive) setOperatorUser(user);
      })
      .catch(() => {
        if (alive) {
          clearCompassOperatorToken();
          setOperatorUser(null);
        }
      })
      .finally(() => {
        if (alive) setAuthChecking(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const loadOperatorUser = useCallback(async () => {
    const token = getCompassOperatorToken();
    if (!token) {
      setOperatorUser(null);
      return null;
    }
    setAuthChecking(true);
    try {
      const user = await fetchCompassOperatorMe(token);
      setOperatorUser(user);
      return user;
    } catch {
      clearCompassOperatorToken();
      setOperatorUser(null);
      return null;
    } finally {
      setAuthChecking(false);
    }
  }, []);

  const handleOperatorLogin = useCallback(async () => {
    const username = loginForm.username.trim();
    const password = loginForm.password;
    if (!username || !password) {
      setLoginError('请输入账号和密码');
      return null;
    }
    setAuthSubmitting(true);
    setLoginError('');
    try {
      const result = await loginCompassOperator({ username, password });
      setCompassOperatorToken(result.access_token);
      setOperatorUser(result.user);
      setLoginForm((prev) => ({ ...prev, password: '' }));
      return result.user;
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : '登录失败，请稍后重试'
      );
      return null;
    } finally {
      setAuthSubmitting(false);
    }
  }, [loginForm.password, loginForm.username]);

  const handleOperatorLogout = useCallback(() => {
    clearCompassOperatorToken();
    setOperatorUser(null);
    setLoginError('');
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  const closeContainerAccess = useCallback(() => {
    setContainerAccessOpen(false);
    setLoginError('');
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  /** 实际调通道接口：按钮进入加载态，拿到 enter_url 后再打开新页签（被拦截时降级当前页跳转）。 */
  const doEnterContainer = useCallback(async () => {
    if (!projectFileKey) {
      message.warning('缺少报告标识，无法进入容器');
      return;
    }
    setEnteringContainer(true);
    try {
      const data = await openContainerChannel(projectFileKey);
      // 接口异步返回后已脱离用户手势上下文，window.open 可能被浏览器拦截：降级为当前页跳转。
      const win = window.open(data.enter_url, '_blank');
      if (!win) {
        message.warning('浏览器拦截了新窗口，已在当前页打开容器链接');
        window.location.href = data.enter_url;
      }
    } catch (error) {
      if (error instanceof ContainerChannelAuthError) {
        // 登录态过期：重置本地登录态并重新弹登录窗。
        setOperatorUser(null);
        setLoginError('');
        setContainerAccessOpen(true);
        return;
      }
      const detail = error instanceof Error ? error.message : '';
      message.error(detail || '进入容器失败，请稍后重试');
    } finally {
      setEnteringContainer(false);
    }
  }, [projectFileKey]);

  const handleEnterContainer = useCallback(async () => {
    if (enteringContainer) return;
    if (previewMode) {
      message.info('预览模式下暂不能进入容器');
      return;
    }
    // 仅最新报告保留复现容器：历史报告直接前端提示，不调接口也不开新页签。
    if (!isLatestReport) {
      message.warning('仅最新报告有复现容器，请切换到最新版本后再进入');
      return;
    }
    // 登录校验：未登录先弹出与总览页同款的登录弹窗，登录后才能调通道接口。
    let user = operatorUser;
    if (getCompassOperatorToken() && !user) {
      user = await loadOperatorUser();
    }
    if (!user) {
      setLoginError('');
      setContainerAccessOpen(true);
      return;
    }
    await doEnterContainer();
  }, [
    doEnterContainer,
    enteringContainer,
    isLatestReport,
    loadOperatorUser,
    operatorUser,
    previewMode,
  ]);

  /** 弹窗内「登录并继续」：登录成功后关闭弹窗，进入加载态等待通道 URL。 */
  const handleContainerAccessLogin = useCallback(async () => {
    const user = await handleOperatorLogin();
    if (!user) {
      return;
    }
    closeContainerAccess();
    await doEnterContainer();
  }, [closeContainerAccess, doEnterContainer, handleOperatorLogin]);

  /** 弹窗内已登录点「进入容器」：关闭弹窗后直接进入加载流程。 */
  const handleContainerAccessConfirm = useCallback(async () => {
    closeContainerAccess();
    await doEnterContainer();
  }, [closeContainerAccess, doEnterContainer]);

  const metadataItems = projectVersion
    ? [
        ...reportMetadata,
        {
          key: 'enter-container',
          label: '进入容器复测',
          value: '点击进入',
          tone: 'default' as const,
        },
      ]
    : reportMetadata;

  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className=">lg:flex-row >lg:items-stretch flex flex-col gap-5">
        {/* ── 左侧：指标概览（50%）── */}
        <div className=">lg:w-1/2 flex w-full flex-col">
          <div className="mb-2 text-base font-semibold text-slate-800">
            报告概览
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {overviewMetrics.map((metric) => (
              <div
                key={metric.key}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
                    <span className="truncate">{metric.title}</span>
                    {isOverallScoreMetric(metric) ? (
                      <ExperienceScoreRulePopoverTrigger className="shrink-0 text-slate-400 transition-colors hover:text-slate-600" />
                    ) : (
                      <Tooltip title={metric.description}>
                        <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
                      </Tooltip>
                    )}
                  </div>
                  {renderMetricRecentValue(metric)}
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {metric.value}
                  </div>
                  {metric.suffix ? (
                    <div className="text-sm font-medium text-slate-500">
                      {metric.suffix}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 右侧：报告元数据（50%）── */}
        <div className=">lg:w-1/2 flex w-full flex-col">
          {/* 标题行 */}
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-semibold text-slate-800">
              报告元数据
            </div>
            <Text className="whitespace-nowrap text-xs text-slate-400">
              更新于：{reportUpdatedAt}
            </Text>
          </div>
          {/* 内容区 */}
          <div className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            <Descriptions
              size="small"
              column={2}
              colon
              labelStyle={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              className="[&_.ant-descriptions-item-content]:!overflow-hidden [&_.ant-descriptions-item-content]:!whitespace-nowrap [&_.ant-descriptions-item-content]:!align-middle [&_.ant-descriptions-item-content]:!text-[15px] [&_.ant-descriptions-item-content]:!leading-10 [&_.ant-descriptions-item-content]:!text-slate-700 [&_.ant-descriptions-item-label]:!align-middle [&_.ant-descriptions-item-label]:!text-sm [&_.ant-descriptions-item-label]:!font-medium [&_.ant-descriptions-item-label]:!leading-10 [&_.ant-descriptions-item-label]:!text-slate-400 [&_.ant-descriptions-item]:!pb-1"
              items={metadataItems.map((item) => ({
                key: item.key,
                label: item.label,
                children:
                  item.key === 'enter-container' ? (
                    isLatestReport ? (
                      <Tooltip title="首次开通需部署环境，最长约 90 秒，请耐心等待">
                        <button
                          type="button"
                          onClick={handleEnterContainer}
                          disabled={enteringContainer}
                          className="block cursor-pointer truncate border-0 bg-transparent p-0 text-left text-[15px] font-medium leading-10 text-[#1677ff] hover:underline disabled:cursor-wait disabled:text-slate-400 disabled:hover:no-underline"
                        >
                          {enteringContainer ? (
                            <>
                              <LoadingOutlined className="mr-1" spin />
                              开通中，首次需部署环境，最长约 90 秒…
                            </>
                          ) : (
                            '点击进入'
                          )}
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="仅最新报告保留复现容器，请切换到最新版本后再进入">
                        <span className="block cursor-not-allowed truncate text-[15px] font-medium leading-10 text-slate-400">
                          仅最新报告可进入
                        </span>
                      </Tooltip>
                    )
                  ) : item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block truncate text-[15px] leading-10 text-[#1677ff] hover:underline ${
                        item.tone === 'mono' ? 'font-mono' : 'font-medium'
                      }`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <Tooltip title={item.value}>
                      <span
                        className={`block truncate text-[15px] leading-10 ${
                          item.tone === 'mono' ? 'font-mono' : 'font-medium'
                        }`}
                      >
                        {item.value}
                      </span>
                    </Tooltip>
                  ),
              }))}
            />
          </div>
        </div>
      </div>

      <JourneyPanoramaSection
        projectName={projectName}
        steps={journeySteps}
        projectFileKey={projectFileKey}
        isLatestReport={isLatestReport}
        activeStepKey={activeStepKey}
        onStepChange={onStepChange}
        previewMode={previewMode}
      />

      <OperatorAccessModal
        open={containerAccessOpen}
        title="进入容器复测登录校验"
        description="进入容器复测需要先登录操作账号，登录成功后将自动进入容器。"
        confirmText="进入容器"
        enableRegister={false}
        operatorUser={operatorUser}
        authSubmitting={authSubmitting}
        authChecking={authChecking}
        loginError={loginError}
        loginUsername={loginForm.username}
        loginPassword={loginForm.password}
        onCancel={closeContainerAccess}
        onLogout={handleOperatorLogout}
        onLoginUsernameChange={(value) =>
          setLoginForm((prev) => ({ ...prev, username: value }))
        }
        onLoginPasswordChange={(value) =>
          setLoginForm((prev) => ({ ...prev, password: value }))
        }
        onLogin={() => {
          void handleContainerAccessLogin();
        }}
        onConfirm={() => {
          void handleContainerAccessConfirm();
        }}
      />
    </Card>
  );
};

export default ReportSummaryCard;
