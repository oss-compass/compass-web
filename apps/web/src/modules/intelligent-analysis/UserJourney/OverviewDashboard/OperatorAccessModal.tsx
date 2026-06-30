import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Modal, Select, Tag } from 'antd';
import type { CompassOperatorUser } from '../rawData/apiClient';

export type OperatorRegisterValues = {
  username: string;
  password: string;
  repoKeys: string[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OperatorAccessModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  operatorUser: CompassOperatorUser | null;
  authSubmitting: boolean;
  authChecking: boolean;
  loginError: string;
  loginUsername: string;
  loginPassword: string;
  repoOptions?: Array<{ value: string; label: string }>;
  onLoginUsernameChange: (value: string) => void;
  onLoginPasswordChange: (value: string) => void;
  onCancel: () => void;
  onLogin: () => void;
  onRegister?: (values: OperatorRegisterValues) => void;
  onLogout: () => void;
  onConfirm: () => void;
};

const OperatorAccessModal: React.FC<OperatorAccessModalProps> = ({
  open,
  title,
  description = '',
  confirmText = '继续',
  operatorUser,
  authSubmitting,
  authChecking,
  loginError,
  loginUsername,
  loginPassword,
  repoOptions = [],
  onLoginUsernameChange,
  onLoginPasswordChange,
  onCancel,
  onLogin,
  onRegister,
  onLogout,
  onConfirm,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    repoKeys: [] as string[],
  });
  const [registerEmailError, setRegisterEmailError] = useState('');
  const repoLabels = Array.isArray(operatorUser?.repo_names)
    ? operatorUser?.repo_names
    : [];
  const repoKeys = Array.isArray(operatorUser?.repo_keys)
    ? operatorUser?.repo_keys
    : [];
  const isRegisterMode = !operatorUser && mode === 'register';

  useEffect(() => {
    if (!open) {
      setMode('login');
      setRegisterForm({ username: '', password: '', repoKeys: [] });
      setRegisterEmailError('');
    }
  }, [open]);

  const handleRegister = () => {
    const username = registerForm.username.trim();
    if (!emailPattern.test(username)) {
      setRegisterEmailError('请输入有效的邮箱地址');
      return;
    }
    setRegisterEmailError('');
    onRegister?.({ ...registerForm, username });
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      destroyOnHidden
      footer={
        operatorUser
          ? [
              <Button key="logout" onClick={onLogout}>
                切换账号
              </Button>,
              <Button key="cancel" onClick={onCancel}>
                取消
              </Button>,
              <Button key="confirm" type="primary" onClick={onConfirm}>
                {confirmText}
              </Button>,
            ]
          : [
              <Button key="cancel" onClick={onCancel}>
                取消
              </Button>,
              <Button
                key="mode"
                onClick={() => {
                  setMode(isRegisterMode ? 'login' : 'register');
                }}
              >
                {isRegisterMode ? '返回登录' : '注册账号'}
              </Button>,
              <Button
                key={isRegisterMode ? 'register' : 'login'}
                type="primary"
                loading={authSubmitting}
                onClick={isRegisterMode ? handleRegister : onLogin}
              >
                {isRegisterMode ? '注册并继续' : '登录并继续'}
              </Button>,
            ]
      }
    >
      <div className="flex flex-col gap-4">
        {description ? (
          <div className="text-sm leading-6 text-slate-600">{description}</div>
        ) : null}

        {operatorUser ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-medium text-slate-900">
                  当前账号
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-900">
                    {operatorUser.display_name || operatorUser.username}
                  </span>
                  <Tag color={operatorUser.role === 'admin' ? 'red' : 'blue'}>
                    {operatorUser.role === 'admin' ? '管理员' : '仓库负责人'}
                  </Tag>
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  用户名：{operatorUser.username}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-2 text-sm font-medium text-slate-900">
                  权限范围
                </div>
                <div className="text-sm text-slate-600">
                  {repoLabels.length
                    ? repoLabels.join('、')
                    : repoKeys.length
                    ? repoKeys.join('、')
                    : '全部仓库'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Alert
              type="warning"
              showIcon
              message={isRegisterMode ? '注册账号' : '请先登录操作账号'}
            />
            {isRegisterMode ? (
              <>
                <Input
                  type="email"
                  value={registerForm.username}
                  placeholder="请输入邮箱账号，用于登录和接受邮件通知"
                  onChange={(event) => {
                    setRegisterForm((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }));
                    setRegisterEmailError('');
                  }}
                  status={registerEmailError ? 'error' : undefined}
                />
                {registerEmailError ? (
                  <div className="-mt-3 text-xs text-red-500">
                    {registerEmailError}
                  </div>
                ) : null}
                <Input.Password
                  value={registerForm.password}
                  placeholder="请输入密码，至少 6 位"
                  onChange={(event) => {
                    setRegisterForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }));
                  }}
                  onPressEnter={handleRegister}
                />
                <Select
                  mode="multiple"
                  value={registerForm.repoKeys}
                  placeholder="请选择负责仓库"
                  options={repoOptions}
                  showSearch
                  optionFilterProp="label"
                  maxTagCount="responsive"
                  onChange={(values) => {
                    setRegisterForm((prev) => ({
                      ...prev,
                      repoKeys: values,
                    }));
                  }}
                />
              </>
            ) : (
              <>
                <Input
                  value={loginUsername}
                  placeholder="请输入账号"
                  onChange={(event) => {
                    onLoginUsernameChange(event.target.value);
                  }}
                />
                <Input.Password
                  value={loginPassword}
                  placeholder="请输入密码"
                  onChange={(event) => {
                    onLoginPasswordChange(event.target.value);
                  }}
                  onPressEnter={onLogin}
                />
              </>
            )}
          </>
        )}

        {authChecking ? (
          <div className="text-sm text-slate-500">正在校验当前登录状态...</div>
        ) : null}

        {loginError ? (
          <Alert type="error" showIcon message={loginError} />
        ) : null}
      </div>
    </Modal>
  );
};

export default OperatorAccessModal;
