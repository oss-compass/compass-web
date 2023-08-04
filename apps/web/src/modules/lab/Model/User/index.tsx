import React from 'react';
import classNames from 'classnames';
import { Center } from '@common/components/Layout';
import FormInvite from './FormInvite';
import FormUsers from './FormUsers';

const UserManage = () => {
  return (
    <div className="flex-1 bg-[#FAFAFA] pb-10">
      <Center>
        <div className="flex items-center justify-between pt-10 pb-4">
          <div className="text-xl font-semibold">
            我的模型 / 车联网洞察模型 / 用户管理
          </div>
        </div>
        <FormInvite />
        <FormUsers />
      </Center>
    </div>
  );
};

export default UserManage;
