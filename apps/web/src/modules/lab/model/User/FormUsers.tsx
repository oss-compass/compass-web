import React from 'react';
import FormUsersItem from './FormUsersItem';
import { UserItem, myPermisssion } from './type';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { useTranslation } from 'react-i18next';

const FormUsers = (props: {
  items: UserItem[];
  count: number;
  modelId: number;
  permission: myPermisssion;
  event$: EventEmitter<string>;
}) => {
  const { t } = useTranslation();
  const { items, count, modelId, permission, event$ } = props;

  return (
    <div>
      <div className="flex items-center justify-between py-6">
        <div className="text-sm font-medium">
          {t('lab:user.member')} ({count})
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-4">
        {items.map((user) => {
          return (
            <FormUsersItem
              key={user.name}
              user={user}
              modelId={modelId}
              permission={permission}
              event$={event$}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormUsers;
