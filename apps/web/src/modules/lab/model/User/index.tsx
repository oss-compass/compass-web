import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Center } from '@common/components/Layout';
import FormInvite from './FormInvite';
import FormUsers from './FormUsers';
import FormInviteUsers from './FormInviteUsers';
import Pagination from '@common/components/Antd/Pagination';
import {
  useMemberOverviewQuery,
  useMyMemberPermissionQuery,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import useEventEmitter from 'ahooks/lib/useEventEmitter';
import { useTranslation } from 'react-i18next';

const per = 6;

const UserManage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const modelId = Number(router.query.model);

  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useMemberOverviewQuery(gqlClient, {
    page: page,
    modelId,
    per,
  });
  const pageTotal = data?.memberOverview?.totalPage || 0;
  const count = data?.memberOverview?.count || 0;
  const items = data?.memberOverview?.items || [];
  const name = data?.memberOverview.model.name;

  const myPermisssion = useMyMemberPermissionQuery(gqlClient, {
    modelId,
  });
  const permission = myPermisssion.data?.myMemberPermission;

  const inviteUsers = useRef(null);
  const event$ = useEventEmitter<string>();
  // 成员列表里包含“等待确认加入”的被邀请人，两个列表相互依赖：
  // 发出/取消邀请、删除成员、修改权限后都需要同时刷新两边，
  // 否则其中一边会停留在旧状态（如已取消的邀请仍显示在待确认列表）
  event$.useSubscription(() => {
    refetch();
    inviteUsers.current?.refetch();
  });

  if (isLoading) {
    return (
      <Center>
        <div className="animate-pulse p-4 pt-10">
          <div className="flex-1 space-y-4 ">
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </Center>
    );
  }
  return (
    <div className="flex-1 bg-[#FFFFFF] pb-10 md:px-4">
      <Center>
        <div className="flex items-center justify-between pt-10 pb-4">
          <div className="text-xl font-semibold">
            <Link href={'/lab/model/my'}>{t('lab:my_models')}</Link> / {name} /{' '}
            {t('lab:user_management')}
          </div>
        </div>
        <FormInvite modelId={modelId} event$={event$} />
        <FormUsers
          items={items}
          count={count}
          modelId={modelId}
          permission={permission}
          event$={event$}
        />
        {pageTotal > 1 ? (
          <div className="flex justify-center py-6">
            <Pagination
              current={page}
              total={count}
              onChange={(p) => {
                setPage(p);
              }}
            />
          </div>
        ) : null}

        <FormInviteUsers
          ref={inviteUsers}
          modelId={modelId}
          permission={permission}
        />
      </Center>
    </div>
  );
};

export default UserManage;
