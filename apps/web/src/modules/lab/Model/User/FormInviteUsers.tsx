import React, { forwardRef, useState, useImperativeHandle } from 'react';
import FormUsersItem from './FormUsersItem';
import { useInvitationOverviewQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import Pagination from '@common/components/Pagination';
import useEventEmitter from 'ahooks/lib/useEventEmitter';
import { ReFetch } from '@common/constant';
import { useTranslation } from 'react-i18next';
import { myPermisssion } from './type';

const per = 6;
const FormInviteUsers = forwardRef(
  (props: { modelId: number; permission: myPermisssion }, ref) => {
    const { modelId, permission } = props;
    const { t } = useTranslation();

    const [page, setPage] = useState(1);
    const { data, refetch } = useInvitationOverviewQuery(gqlClient, {
      page: page,
      modelId,
      per,
    });
    const pageTotal = data?.invitationOverview?.totalPage || 0;
    const count = data?.invitationOverview?.count || 0;
    const items = data?.invitationOverview?.items || [];
    const event$ = useEventEmitter<string>();
    event$.useSubscription((flag) => {
      if (flag === ReFetch) {
        refetch();
      }
    });
    useImperativeHandle(ref, () => ({ refetch }));
    return (
      <div>
        <div className="flex items-center justify-between py-6">
          <div className="text-sm font-medium">
            {t('lab:user.member_to_be_added')} ({count})
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-4">
          {items.map((user) => {
            return (
              <FormUsersItem
                key={user.email}
                user={user}
                modelId={modelId}
                event$={event$}
                permission={permission}
              />
            );
          })}
        </div>
        {pageTotal > 1 ? (
          <div className="py-6">
            <Pagination
              page={page}
              pageTotal={pageTotal}
              onChange={(p) => {
                setPage(p);
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
FormInviteUsers.displayName = 'FormInviteUsers';
export default FormInviteUsers;
