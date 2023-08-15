import React, { useState } from 'react';
import { UserItem } from './type';
import Image from 'next/image';
import classNames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  useDeleteLabMemberMutation,
  useUpdateMemberPermissionMutation,
  useCancelMemberInviteMutation,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import Dialog from '@common/components/Dialog';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ReFetch } from '@common/constant';
import { Button } from '@oss-compass/ui';
import SelectDrowBox from './SelectDrowBox';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { myPermisssion } from './type';

const FormUsersItem = (props: {
  user: UserItem;
  modelId: number;
  permission: myPermisssion;
  event$: EventEmitter<string>;
}) => {
  const { t } = useTranslation();
  const { user, modelId, permission, event$ } = props;

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const deleteMutation = useDeleteLabMemberMutation(client, {
    onSuccess: () => {
      event$.emit(ReFetch);
      setOpenDeleteConfirm(false);
    },
  });

  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const cancelMutation = useCancelMemberInviteMutation(client, {
    onSuccess: () => {
      event$.emit(ReFetch);
      setOpenCancelConfirm(false);
    },
  });

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
  const [showDrowBox, setShowDrowBox] = useState(false);
  const [roles, setRoles] = useState({
    canExecute: user.canExecute,
    canUpdate: user.canUpdate,
  });
  const changeRoles = (id: string) => {
    setRoles({
      ...roles,
      [id]: !roles[id],
    });
  };
  const updateMemberMutation = useUpdateMemberPermissionMutation(client, {
    onSuccess: (res) => {
      event$.emit(ReFetch);
      toast.success(
        res.updateMemberPermission?.message ||
          t('common:toast.modification_successful')
      );
    },
  });
  const updataMember = () => {
    if (
      roles.canExecute !== user.canExecute ||
      roles.canUpdate !== user.canUpdate
    ) {
      updateMemberMutation.mutate({ memberId: user.id, modelId, ...roles });
    }
  };
  return (
    <div
      className={classNames('flex h-32 flex-col border border-[#CCCCCC] p-4', [
        user.joinedAt
          ? 'bg-[#FFFFFF] text-[#000000]'
          : 'bg-[#FAFAFA] text-[#868690]',
      ])}
    >
      <div className="flex">
        <div className="relative mr-4 flex h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={user.avatarUrl || '/images/default-avatar.png'}
            unoptimized
            fill
            sizes="64px"
            style={{
              objectFit: 'cover',
            }}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{user.name || user.email}</div>
          <div className="mt-1  h-5 truncate text-xs text-[#868690]">
            {user.joinedAt
              ? t('lab:user.join_at') + ' : ' + user.joinedAt.slice(0, 10)
              : t('lab:user.waiting_for_confirmation_to_join')}
          </div>
        </div>
      </div>
      <div className="ml-16 mt-1 flex h-5 shrink-0">
        {user.canExecute && (
          <div
            className={classNames(
              'mr-2 h-5 max-w-[130px] cursor-pointer truncate rounded py-0.5 px-1.5 text-xs',
              [
                user.joinedAt
                  ? 'bg-[#00B400]/10 text-[#00B400]'
                  : 'bg-[#F0F0F0] text-[#868690]',
              ]
            )}
          >
            {t('lab:user.trigger_analysis')}
          </div>
        )}
        {user.canUpdate && (
          <div
            className={classNames(
              'mr-2 h-5 max-w-[130px] cursor-pointer truncate rounded py-0.5 px-1.5 text-xs ',
              [
                user.joinedAt
                  ? 'bg-[#C16423]/10 text-[#C16423]'
                  : 'bg-[#F0F0F0] text-[#868690]',
              ]
            )}
          >
            {t('lab:user.modifiable_model')}
          </div>
        )}
      </div>
      <div className="mt-1 flex h-5 justify-end">
        {user.joinedAt ? (
          user.isOwner ? (
            <div className="rounded-full bg-[#3A5BEF] px-2 pt-0.5 text-xs text-[#ffffff]">
              {t('lab:user.owner')}
            </div>
          ) : (
            permission?.canDestroy && (
              <div className="flex text-[#585858]">
                <div
                  onClick={() => {
                    setOpenDeleteConfirm(true);
                  }}
                  className="mr-1 cursor-pointer p-1"
                >
                  <RiDeleteBinLine />
                </div>
                <div className="cursor-pointer p-1">
                  <SelectDrowBox
                    options={optionList}
                    roles={roles}
                    onChange={(item) => {
                      changeRoles(item);
                    }}
                    onShowDrowBox={(e) => {
                      setShowDrowBox(e);
                      if (e === false) {
                        updataMember();
                      }
                    }}
                  >
                    <FiEdit />
                  </SelectDrowBox>
                </div>
              </div>
            )
          )
        ) : (
          <div
            className="flex cursor-pointer text-[#868690]"
            onClick={() => {
              setOpenCancelConfirm(true);
            }}
          >
            <div className="pt-1 pr-1">
              <AiOutlineCloseCircle />
            </div>
            <div>{t('lab:user.uninvite')}</div>
          </div>
        )}
      </div>
      <Dialog
        open={openDeleteConfirm}
        dialogTitle={t('common:btn.confirm')}
        dialogContent={
          <div className="w-96">{t('lab:user.confirm_delete')}?</div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenDeleteConfirm(false);
              }}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              loading={deleteMutation.isLoading}
              onClick={() => {
                deleteMutation.mutate({ modelId, memberId: user.id });
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => {}}
      />
      <Dialog
        open={openCancelConfirm}
        dialogTitle={t('common:btn.confirm')}
        dialogContent={
          <div className="w-96">{t('lab:user.confirm_cancel_invitation')}?</div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenCancelConfirm(false);
              }}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              loading={cancelMutation.isLoading}
              onClick={() => {
                cancelMutation.mutate({ modelId, invitationId: user.id });
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => {}}
      />
    </div>
  );
};
export default FormUsersItem;
