import React, { PropsWithChildren, useState } from 'react';
import { Input, Button } from '@oss-compass/ui';
import SelectDrowBox from './SelectDrowBox';
import classNames from 'classnames';

const FormInvite = () => {
  let optionList = [
    { name: '可浏览', desc: '可查看和评论报告' },
    { name: '可触发分析', desc: '可触发模型报告扫描' },
    { name: '可修改模型', desc: '可修改模型中的参数配置' },
  ];
  const [roles, setroles] = useState(['可浏览']);
  const [showDrowBox, setShowDrowBox] = useState(false);

  const changeroles = (item: string) => {
    if (roles.includes(item)) {
      setroles((pre) => pre.filter((role) => role !== item));
    } else {
      const newroles = [...roles, item];
      setroles(newroles);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <div className="text-sm font-medium">邀请用户</div>
      </div>
      <div className="flex justify-between">
        <div className="mr-2 flex-1">
          <Input
            intent={'secondary'}
            placeholder="请填入被邀请者的邮箱，多个邮箱以逗号分隔"
          />
        </div>
        <SelectDrowBox
          options={optionList}
          rolesList={roles}
          onChange={(item) => {
            changeroles(item);
          }}
          onShowDrowBox={(e) => {
            setShowDrowBox(e);
          }}
        >
          <div
            className={classNames(
              'flex h-10 w-44 cursor-pointer border border-solid border-[#ccc] bg-white px-3 py-2 text-left text-sm outline-0 transition-all after:float-right  hover:bg-slate-50',
              [showDrowBox ? 'after:content-["▴"]' : 'after:content-["▾"]']
            )}
          >
            <div className="w-36 overflow-hidden">{roles.join(',')}</div>
          </div>
        </SelectDrowBox>
        <Button className="ml-2 h-10 w-28 border border-[black] bg-white text-sm text-black">
          发送邀请邮件
        </Button>
      </div>
    </div>
  );
};

export default FormInvite;
