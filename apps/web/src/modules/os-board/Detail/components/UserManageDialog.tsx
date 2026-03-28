import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Input } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import classNames from 'classnames';
import type { OsBoardRole } from '../../types';

interface UserManageDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
}

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
}) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [addRole, setAddRole] = useState<OsBoardRole>('viewer');

  // 成员列表暂无后端接口，保持空
  const permissions: Array<{ userId: string; role: OsBoardRole }> = [];

  const handleSendInvite = () => {
    if (!email.trim()) return;
    // TODO: 接入后端邀请接口
    setEmail('');
  };

  const handleRemoveMember = (_userId: string) => {
    // TODO: 接入后端删除接口
  };

  const handleRoleChange = (_userId: string, _role: OsBoardRole) => {
    // TODO: 接入后端角色修改接口
  };

  const roleOptions = [
    { label: t('os_board:manage.permissions.roles.viewer'), value: 'viewer' },
    { label: t('os_board:manage.permissions.roles.editor'), value: 'editor' },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-[480px] border-2 border-black bg-white shadow outline-0">
        <div
          className="absolute right-6 top-6 cursor-pointer p-2 hover:bg-gray-100"
          onClick={onClose}
        >
          <GrClose />
        </div>
        <div className="px-8 pb-8 pt-8">
          <h2 className="mb-6 text-xl font-semibold">
            {t('os_board:manage.permissions.title')}
          </h2>

          {/* 邀请区域 */}
          <div className="mb-6">
            <div className="mb-1 text-sm font-medium text-gray-700">
              {t('os_board:manage.permissions.invite_label')}
            </div>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t(
                  'os_board:manage.permissions.invite_placeholder'
                )}
              />
              <SimpleSelect
                value={addRole}
                options={roleOptions}
                onChange={(v) => setAddRole(v as OsBoardRole)}
              />
              <Button size="sm" onClick={handleSendInvite}>
                {t('os_board:manage.permissions.invite_btn')}
              </Button>
            </div>
          </div>

          {/* 成员列表 */}
          <div className="max-h-64 overflow-y-auto">
            {permissions.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-400">
                {t('common:no_data')}
              </div>
            ) : (
              permissions.map((p) => (
                <div
                  key={p.userId}
                  className="mb-3 grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-lg font-bold text-gray-500">
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
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserManageDialog;
