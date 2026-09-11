import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useTranslation } from 'next-i18next';
import NoSsr from '@common/components/NoSsr';
import AuthRequire from '@modules/auth/AuthRequire';

const MINIMUM_ROLE_LEVEL = 2;

const AccessDenied: React.FC = () => {
  const { i18n } = useTranslation();
  const isChinese = i18n.language?.toLowerCase().startsWith('zh');

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-2xl rounded-xl bg-white px-8 py-10 text-center shadow-sm ring-1 ring-gray-200 md:px-5">
        <LockOutlined className="mb-4 text-5xl text-[#3A5BEF]" />
        <h1 className="mb-3 text-2xl font-semibold text-gray-900">
          {isChinese ? '暂无访问权限' : 'Access permission required'}
        </h1>
        <p className="mx-auto mb-8 max-w-lg leading-7 text-gray-600">
          {isChinese
            ? '当前账号权限不足，请联系管理员开通权限。'
            : 'Your account does not have sufficient permission. Level 2 or higher is required. Please contact the administrator to request access.'}
        </p>

        <div className="flex items-stretch justify-center gap-8 md:flex-col md:items-center">
          <div className="flex min-w-[250px] flex-col items-center justify-center rounded-lg border border-gray-200 px-6 py-5">
            <MailOutlined className="mb-3 text-2xl text-[#3A5BEF]" />
            <div className="mb-2 font-medium text-gray-900">
              {isChinese ? '邮箱联系' : 'Email'}
            </div>
            <a
              className="break-all text-[#3A5BEF] hover:underline"
              href="mailto:yehui.wang.mdh@gmail.com"
            >
              yehui.wang.mdh@gmail.com
            </a>
          </div>

          <div className="flex min-w-[250px] flex-col items-center rounded-lg border border-gray-200 px-6 py-5">
            <div className="mb-3 font-medium text-gray-900">
              {isChinese ? '微信联系' : 'WeChat'}
            </div>
            <Image
              src="/images/WeChat.png"
              alt={
                isChinese
                  ? 'OSS-Compass 小助手微信二维码'
                  : 'OSS-Compass assistant WeChat QR code'
              }
              width={208}
              height={285}
              className="h-auto w-[208px]"
            />
            <p className="mt-3 text-sm text-gray-600">
              {isChinese
                ? '扫描二维码添加 OSS-Compass 小助手'
                : 'Scan the QR code to add the OSS-Compass assistant'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntelligentAnalysisAccessGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  return (
    <NoSsr>
      <AuthRequire
        requiredRoleLevel={MINIMUM_ROLE_LEVEL}
        redirectTo={router.asPath}
        redirectToAuth={true}
        redirectOnPermissionDenied={false}
        loadingUi={
          <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
            <Spin size="large" />
          </div>
        }
        permissionDeniedUi={<AccessDenied />}
      >
        {children}
      </AuthRequire>
    </NoSsr>
  );
};

export default IntelligentAnalysisAccessGuard;
