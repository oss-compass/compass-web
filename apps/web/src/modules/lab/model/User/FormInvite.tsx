import React, { useState } from 'react';
import { Input, Button } from '@oss-compass/ui';
import SelectDrowBox from './SelectDrowBox';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { useSendMemberInviteMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'react-i18next';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { getEmail, verifyEmail } from './utils';

const FormInvite = (props: {
  modelId: number;
  event$: EventEmitter<string>;
}) => {
  const { t } = useTranslation();
  const { modelId, event$ } = props;

  const optionList = [
    {
      name: t('lab:user.browsable'),
      desc: t('lab:user.view_and_comment_the_report'),
      id: 'canRead',
      disable: true,
    },
    {
      name: t('lab:user.trigger_analysis'),
      desc: t('lab:user.can_trigger_model_report_scan'),
      id: 'canExecute',
    },
    {
      name: t('lab:user.modifiable_model'),
      desc: t('lab:user.can_modifiable_model_parameter'),
      id: 'canUpdate',
    },
  ];
  const [roles, setRoles] = useState({ canExecute: false, canUpdate: false });
  const [showDrowBox, setShowDrowBox] = useState(false);
  const [email, setEmail] = useState('');

  const changeRoles = (id: string) => {
    setRoles({
      ...roles,
      [id]: !roles[id],
    });
  };
  const mutation = useSendMemberInviteMutation(client, {
    onSuccess(res) {
      if (res.sendMemberInvite?.status === 'true') {
        event$.emit('Invite');
        toast.success(t('lab:user.send_successful'));
      }
      if (res.sendMemberInvite?.status === 'false') {
        toast.error(res.sendMemberInvite?.message || t('lab:user.send_failed'));
      }
    },
  });
  const sendMemberInvite = () => {
    if (verifyEmail(email)) {
      mutation.mutate({
        emails: getEmail(email),
        modelId,
        ...roles,
      });
    } else {
      toast.error(t('lab:user.please_enter_the_correct_email_format'));
    }
  };
  const valueList = [
    optionList[0].name,
    ...optionList.filter((i) => roles[i.id]).map((z) => z.name),
  ];
  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <div className="text-sm font-medium">{t('lab:user.invite_users')}</div>
      </div>
      <div className="flex justify-between">
        <div className="mr-2 flex-1">
          <Input
            value={email}
            intent={'secondary'}
            placeholder={t('lab:user.input_email')}
            onChange={(e) => {
              setEmail(e);
            }}
          />
        </div>
        <SelectDrowBox
          options={optionList}
          roles={roles}
          onChange={(item) => {
            changeRoles(item);
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
            <div className="w-36 overflow-hidden">{valueList.join(',')}</div>
          </div>
        </SelectDrowBox>
        <Button
          loading={mutation.isLoading}
          disabled={!email}
          onClick={() => sendMemberInvite()}
          className="ml-2 h-10 w-28 border border-[black] bg-white text-sm text-black"
        >
          {t('lab:user.send_email')}
        </Button>
      </div>
    </div>
  );
};

export default FormInvite;
