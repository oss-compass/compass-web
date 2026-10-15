import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Card, Space, Tabs, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import DashboardStyles from '../../../UserJourney/OverviewDashboard/DashboardStyles';
import ManagementModuleNav from '../../../UserJourney/OverviewDashboard/ManagementModuleNav';
import OperatorAccessModal from '../../../UserJourney/OverviewDashboard/OperatorAccessModal';
import WeeklyReportManagementSection from '../../../UserJourney/TaskManagementPage/WeeklyReportManagementSection';
import {
  clearCompassOperatorToken,
  fetchCompassOperatorMe,
  getCompassOperatorToken,
  loginCompassOperator,
  setCompassOperatorToken,
} from '../../../UserJourney/rawData/apiClient';
import type { CompassOperatorUser } from '../../../UserJourney/rawData/apiClient';
import {
  buildExperienceOverviewHref,
  buildIssueRepoManagementHref,
} from '../../routes';

const IssueTaskManagementPage: React.FC = () => {
  const router = useRouter();
  const org =
    typeof router.query.org === 'string' ? router.query.org : undefined;
  const [user, setUser] = useState<CompassOperatorUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let disposed = false;
    const check = async () => {
      const token = getCompassOperatorToken();
      try {
        const current = token ? await fetchCompassOperatorMe(token) : null;
        if (!disposed) setUser(current);
      } catch {
        if (!disposed) clearCompassOperatorToken();
      } finally {
        if (!disposed) setChecking(false);
      }
    };
    void check();
    return () => {
      disposed = true;
    };
  }, []);

  const login = async () => {
    if (!username.trim() || !password) {
      setError('请输入账号和密码');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const result = await loginCompassOperator({
        username: username.trim(),
        password,
      });
      setCompassOperatorToken(result.access_token);
      setUser(result.user);
      setPassword('');
      setAccessOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setSubmitting(false);
    }
  };

  const controlClassName =
    'h-8 !rounded-2xl border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-sm shadow-[0_2px_6px_rgba(15,23,42,0.06)]';

  return (
    <div className="oj-page min-h-full bg-[#eef2fa]">
      <DashboardStyles />
      <ManagementModuleNav active="issue" />
      <div className="flex w-full flex-col gap-4 px-7 py-4 md:px-6">
        <Card className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="mb-5 flex flex-col gap-4">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <Button
                    type="text"
                    icon={
                      <ArrowLeftOutlined className="text-xs transition-transform group-hover:-translate-x-0.5" />
                    }
                    className="group inline-flex h-9 flex-shrink-0 items-center gap-2 !rounded-full border border-white/80 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition hover:!-translate-y-0.5 hover:!border-sky-200 hover:!bg-white hover:!text-sky-700 hover:!shadow-[0_16px_36px_rgba(59,130,246,0.18)]"
                    onClick={() =>
                      void router.push(
                        `${buildExperienceOverviewHref({ org })}?module=issue`
                      )
                    }
                  >
                    返回看板
                  </Button>
                  <Typography.Title level={4} className="!mb-0 !mt-0">
                    任务管理
                  </Typography.Title>
                </div>
              </div>
              <Space wrap className="ml-auto justify-end">
                <Button
                  className={`${controlClassName} px-3 font-semibold text-slate-700`}
                  onClick={() =>
                    void router.push(buildIssueRepoManagementHref({ org }))
                  }
                >
                  仓库管理
                </Button>
                <Button
                  className={`${controlClassName} px-3 font-semibold text-slate-700`}
                  onClick={() => setAccessOpen(true)}
                >
                  {user ? '切换操作账号' : '登录操作账号'}
                </Button>
              </Space>
            </div>
          </div>
          {checking ? (
            <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
              <span>正在校验当前登录状态...</span>
            </div>
          ) : user?.role === 'admin' ? (
            <div className="mb-5">
              <Tabs
                activeKey="weekly-report"
                items={[{ key: 'weekly-report', label: '周报管理' }]}
              />
              <WeeklyReportManagementSection
                key={user.username}
                reportType="issue"
              />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 py-6">
              <Alert
                type="info"
                showIcon
                message={
                  user
                    ? '社区贡献周报管理仅限管理员访问，请切换管理员账号'
                    : '请先登录管理员账号'
                }
              />
              <Button
                type="primary"
                className="rounded-full px-4 font-semibold"
                onClick={() => setAccessOpen(true)}
              >
                {user ? '切换管理员账号' : '登录并进入'}
              </Button>
            </div>
          )}
        </Card>
      </div>
      <OperatorAccessModal
        open={accessOpen}
        title="社区贡献任务管理访问校验"
        enableRegister={false}
        operatorUser={user}
        authSubmitting={submitting}
        authChecking={checking}
        loginError={error}
        loginUsername={username}
        loginPassword={password}
        onLoginUsernameChange={setUsername}
        onLoginPasswordChange={setPassword}
        onCancel={() => {
          setAccessOpen(false);
          setError('');
        }}
        onLogin={() => void login()}
        onLogout={() => {
          clearCompassOperatorToken();
          setUser(null);
        }}
        onConfirm={() => setAccessOpen(false)}
      />
    </div>
  );
};

export default IssueTaskManagementPage;
