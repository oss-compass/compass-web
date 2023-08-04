import React, { PropsWithChildren, useState } from 'react';
import FormUsersItem from './FormUsersItem';
import { User } from './type';

const FormUsers = () => {
  const userList: User[] = [
    {
      name: '王晔晖',
      image: '/images/about/王晔晖2@2x.png',
      joinTime: '2023年07月13日',
      roles: ['可浏览', '可触发分析'],
      isOwner: true,
      confirmed: true,
    },
    {
      name: '李升保',
      image: '',
      joinTime: '2023年07月23日',
      roles: ['可浏览'],
      isOwner: false,
      confirmed: true,
    },
    {
      name: '李升保1',
      image: '',
      joinTime: '2023年07月23日',
      roles: ['可浏览'],
      isOwner: false,
      confirmed: true,
    },
    {
      name: '李升保2',
      image: '',
      joinTime: '2023年07月23日',
      roles: ['可浏览'],
      isOwner: false,
      confirmed: true,
    },
    {
      name: 'izezakat@sehati.edu',
      image: '',
      joinTime: '',
      roles: ['可浏览'],
      isOwner: false,
      confirmed: false,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between py-6">
        <div className="text-sm font-medium">用户 ({userList.length})</div>
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-2">
        {userList.map((user) => {
          return <FormUsersItem key={user.name} user={user} />;
        })}
      </div>
    </div>
  );
};

export default FormUsers;
