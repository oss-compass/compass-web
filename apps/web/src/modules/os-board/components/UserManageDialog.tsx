import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Input } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import { osBoardState, actions, saveToStorage } from '../state';
import type { OsBoardRole } from '../types';
import classNames from 'classnames';

interface UserManageDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
}

// 模拟 SelectDrowBox 简单的下拉选择组件
const SimpleSelect = ({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  return (
    <div className="relative">
      <div
        className={classNames(
          'flex h-10 w-32 cursor-pointer items-center justify-between border border-solid border-[#ccc] bg-white px-3 text-sm transition-all hover:bg-slate-50',
          isOpen ? 'border-blue-500' : ''
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedLabel}</span>
        <span className="text-xs text-gray-400">{isOpen ? '▴' : '▾'}</span>
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute left-0 top-full z-20 mt-1 w-full border bg-white shadow-lg">
            {options.map((opt) => (
              <div
                key={opt.value}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const UserManageDialog: React.FC<UserManageDialogProps> = ({
  open,
  onClose,
  dashboardId,
}) => {
  const { t } = useTranslation();
  const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);

  const [email, setEmail] = useState('');
  const [addRole, setAddRole] = useState<OsBoardRole>('viewer');

  if (!dashboard) return null;

  const handleSendInvite = () => {
    if (!email.trim()) return;
    // 模拟发送邀请
    actions.addDashboardMember({
      dashboardId,
      userId: email.trim(), // 暂时用 email 作为 userId
      role: addRole,
    });
    saveToStorage();
    setEmail('');
  };

  const handleRemoveMember = (userId: string) => {
    actions.removeDashboardMember({ dashboardId, userId });
    saveToStorage();
  };

  const handleRoleChange = (userId: string, role: OsBoardRole) => {
    actions.setDashboardMemberRole({ dashboardId, userId, role });
    saveToStorage();
  };

  const roleOptions = [
    { value: 'viewer', label: t('os_board:manage.permissions.roles.viewer') },
    { value: 'editor', label: t('os_board:manage.permissions.roles.editor') },
    { value: 'owner', label: t('os_board:manage.permissions.roles.owner') },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative h-[80vh] w-[80vw] max-w-[1000px] border-2 border-black bg-white shadow outline-0">
        {/* Close Button */}
        <div
          className="absolute right-6 top-6 cursor-pointer p-2 hover:bg-gray-100"
          onClick={onClose}
        >
          <GrClose />
        </div>

        <div className="flex h-full flex-col p-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              {t('os_board:manage.permissions.title')}
            </h2>
          </div>

          {/* Invite Section (FormInvite style) */}
          <div className="mb-10">
            <div className="mb-2 text-sm font-medium">
              {t('lab:user.invite_users')}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex-1">
                <Input
                  value={email}
                  intent={'secondary'}
                  placeholder={t('lab:user.input_email')}
                  onChange={(e) => setEmail(e)}
                />
              </div>
              <SimpleSelect
                value={addRole}
                options={roleOptions}
                onChange={(val) => setAddRole(val as OsBoardRole)}
              />
              <Button
                disabled={!email}
                onClick={handleSendInvite}
                className="h-10 min-w-[100px] border border-black bg-white text-black"
              >
                {t('lab:user.send_email')}
              </Button>
            </div>
          </div>

          {/* Members List (FormUsers style) */}
          <div className="flex-1 overflow-y-auto">
            <div className="mb-4 text-sm font-medium">
              {t('lab:user.member')} ({dashboard.permissions.length})
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {dashboard.permissions.map((p) => (
                <div
                  key={p.userId}
                  className={classNames(
                    'flex h-32 flex-col justify-between border border-[#CCCCCC] p-4',
                    'bg-white text-black'
                  )}
                >
                  <div className="flex">
                    <div className="relative mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-lg font-bold text-gray-500">
                      {p.userId.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium">{p.userId}</div>
                      <div className="mt-1 h-5 truncate text-xs text-[#868690]">
                        {t('lab:user.join_at')} :{' '}
                        {new Date().toISOString().slice(0, 10)}
                      </div>
                    </div>
                  </div>

                  <div className="ml-16 mt-1 flex h-5 shrink-0">
                    <div className="mr-2 h-5 max-w-[130px] truncate rounded bg-[#00B400]/10 px-1.5 py-0.5 text-xs text-[#00B400]">
                      {t(`os_board:manage.permissions.roles.${p.role}`)}
                    </div>
                  </div>

                  <div className="mt-1 flex h-5 justify-end">
                    {p.role === 'owner' ? (
                      <div className="rounded-full bg-[#3A5BEF] px-2 pt-0.5 text-xs text-[#ffffff]">
                        {t('lab:user.owner')}
                      </div>
                    ) : (
                      <div className="flex items-center text-[#585858]">
                        <button
                          className="mr-2 text-xs hover:text-red-600 hover:underline"
                          onClick={() => handleRemoveMember(p.userId)}
                        >
                          {t('common:btn.delete')}
                        </button>
                        {/* 简单的角色切换下拉 */}
                        <select
                          className="text-xs outline-none"
                          value={p.role}
                          onChange={(e) =>
                            handleRoleChange(
                              p.userId,
                              e.target.value as OsBoardRole
                            )
                          }
                        >
                          <option value="viewer">
                            {t('os_board:manage.permissions.roles.viewer')}
                          </option>
                          <option value="editor">
                            {t('os_board:manage.permissions.roles.editor')}
                          </option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserManageDialog;
