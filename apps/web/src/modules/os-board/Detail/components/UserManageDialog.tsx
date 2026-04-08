import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import { toast } from 'react-hot-toast';
import classNames from 'classnames';
import {
  useSearchUser,
  useAssignMembers,
  useAuthorizedUsers,
  useUpdateMemberRoles,
  useRemoveMembers,
  SearchUserItem,
  AuthorizedUserItem,
} from '../../api/dashboard';

interface UserManageDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
  identifier?: string;
  isAdmin?: boolean;
}

type RoleValue = 'viewer' | 'editor';

// 权限下拉选择器
const RoleSelect = ({
  value,
  onChange,
  options,
}: {
  value: RoleValue;
  onChange: (v: RoleValue) => void;
  options: { label: string; value: RoleValue }[];
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        className={classNames(
          'flex h-10 w-28 cursor-pointer items-center justify-between border border-solid border-[#ccc] bg-white px-3 text-sm hover:bg-slate-50',
          open ? 'border-blue-500' : ''
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">{selectedLabel}</span>
        <span className="ml-1 text-xs text-gray-400">{open ? '▴' : '▾'}</span>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-0.5 w-full border border-[#ccc] bg-white shadow-md">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={classNames(
                  'cursor-pointer px-3 py-2 text-sm hover:bg-blue-50',
                  value === opt.value ? 'bg-blue-50 text-blue-600' : ''
                )}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
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

// 用户头像
const UserAvatar = ({
  name,
  avatarUrl,
  size = 'md',
}: {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md';
}) => {
  const cls =
    size === 'sm'
      ? 'h-8 w-8 text-sm'
      : 'h-12 w-12 text-lg';
  return (
    <div
      className={classNames(
        'shrink-0 flex items-center justify-center overflow-hidden rounded-full bg-gray-200 font-bold text-gray-500',
        cls
      )}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        (name || '?').charAt(0).toUpperCase()
      )}
    </div>
  );
};

// 角色标签
const RoleBadge = ({
  role,
  isOwner,
  t,
}: {
  role: 'viewer' | 'editor' | 'admin';
  isOwner?: boolean;
  t: (key: string) => string;
}) => {
  if (isOwner) {
    return (
      <div className="mr-2 h-5 max-w-[130px] truncate rounded bg-[#3A5BEF] px-1.5 py-0.5 text-xs text-white">
        {t('lab:user.owner')}
      </div>
    );
  }
  if (role === 'admin') {
    return (
      <div className="mr-2 h-5 max-w-[130px] truncate rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-600">
        {t('os_board:manage.permissions.roles.admin')}
      </div>
    );
  }
  if (role === 'editor') {
    return (
      <div className="mr-2 h-5 max-w-[130px] truncate rounded bg-[#C16423]/10 px-1.5 py-0.5 text-xs text-[#C16423]">
        {t('os_board:manage.permissions.roles.editor')}
      </div>
    );
  }
  return (
    <div className="mr-2 h-5 max-w-[130px] truncate rounded bg-[#00B400]/10 px-1.5 py-0.5 text-xs text-[#00B400]">
      {t('os_board:manage.permissions.roles.viewer')}
    </div>
  );
};

// 成员卡片（含权限修改和删除）
const MemberCard = ({
  member,
  roleOptions,
  t,
  isAdmin,
  onRoleChange,
  onRemove,
}: {
  member: AuthorizedUserItem;
  roleOptions: { label: string; value: RoleValue }[];
  t: (key: string, opts?: any) => string;
  isAdmin: boolean;
  onRoleChange: (memberId: number, role: RoleValue) => Promise<void>;
  onRemove: (memberId: number) => Promise<void>;
}) => {
  const [roleUpdating, setRoleUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRoleChange = async (v: RoleValue) => {
    setRoleUpdating(true);
    await onRoleChange(member.member_id ?? member.id, v);
    setRoleUpdating(false);
  };

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(member.member_id ?? member.id);
    setRemoving(false);
  };

  // 当前 role 是否可切换（admin/owner 不可通过按钮切换）
  const canSwitchRole = isAdmin && !member.is_owner && member.role !== 'admin';
  // 当前选中的 RoleValue（仅 viewer/editor）
  const currentRoleValue: RoleValue =
    member.role === 'editor' ? 'editor' : 'viewer';

  return (
    <div className="flex flex-col border border-[#CCCCCC] bg-white p-4">
      {/* 头像 + 名称 + 删除按钮 */}
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-1">
          <div className="mr-3 shrink-0">
            <UserAvatar name={member.name} avatarUrl={member.avatar_url} />
          </div>
          <div className="flex min-w-0 flex-col">
            <div className="truncate font-medium">{member.name}</div>
            <div className="mt-1 truncate text-xs text-[#868690]">
              {member.joined_at
                ? t('lab:user.join_at') + ' : ' + member.joined_at.slice(0, 10)
                : t('lab:user.waiting_for_confirmation_to_join')}
            </div>
          </div>
        </div>
        {/* 拥有者 / 删除按钮 */}
        {member.is_owner ? (
          <div className="ml-2 shrink-0 rounded-full bg-[#3A5BEF] px-2 pt-0.5 text-xs text-white">
            {t('lab:user.owner')}
          </div>
        ) : isAdmin ? (
          <button
            className="ml-2 shrink-0 text-gray-400 hover:text-red-500 disabled:opacity-40"
            disabled={removing}
            onClick={handleRemove}
            title={t('common:btn.delete', { defaultValue: '删除' })}
          >
            {removing ? (
              <span className="text-xs">...</span>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            )}
          </button>
        ) : null}
      </div>

      {/* 角色区域 */}
      <div className="mt-3 flex items-center gap-2">
        <RoleBadge role={member.role} isOwner={member.is_owner} t={t} />
        {/* 非 owner、非 admin 角色、且当前用户是 admin 时，显示切换按钮 */}
        {canSwitchRole && (
          <div
            className={classNames(
              'flex overflow-hidden border border-[#ccc] text-xs',
              roleUpdating ? 'pointer-events-none opacity-50' : ''
            )}
          >
            {roleOptions.map((opt) => (
              <button
                key={opt.value}
                className={classNames(
                  'px-2 py-0.5 transition-colors',
                  currentRoleValue === opt.value
                    ? 'bg-[#3A5BEF] text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                )}
                onClick={() => handleRoleChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const UserManageDialog: React.FC<UserManageDialogProps> = ({
  open,
  onClose,
  dashboardId,
  identifier,
  isAdmin = false,
}) => {
  const { t } = useTranslation();
  const ident = identifier || dashboardId;

  // 邀请区状态
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchUserItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchUserItem | null>(null);
  const [role, setRole] = useState<RoleValue>('viewer');

  const searchMutation = useSearchUser();
  const assignMutation = useAssignMembers();
  const updateRolesMutation = useUpdateMemberRoles();
  const removeMembersMutation = useRemoveMembers();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roleOptions: { label: string; value: RoleValue }[] = [
    { label: t('os_board:manage.permissions.roles.viewer'), value: 'viewer' },
    { label: t('os_board:manage.permissions.roles.editor'), value: 'editor' },
  ];

  // 已授权用户列表
  const {
    data: authorizedData,
    isLoading: isLoadingMembers,
    refetch: refetchMembers,
  } = useAuthorizedUsers(
    { identifier: ident },
    { enabled: open && !!ident }
  );
  const memberList: AuthorizedUserItem[] = authorizedData?.data ?? [];

  // 点击外部关闭搜索下拉
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // 弹窗关闭时重置邀请区
  useEffect(() => {
    if (!open) {
      setKeyword('');
      setSearchResults([]);
      setShowDropdown(false);
      setSelectedUser(null);
      setRole('viewer');
    }
  }, [open]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
    setSelectedUser(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!val.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await searchMutation.mutateAsync({ keyword: val.trim() });
        setSearchResults(Array.isArray(res) ? res : []);
        setShowDropdown(true);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleSelectUser = (user: SearchUserItem) => {
    setSelectedUser(user);
    setKeyword(user.name || '');
    setShowDropdown(false);
    setSearchResults([]);
  };

  const handleConfirm = async () => {
    if (!selectedUser) return;
    try {
      await assignMutation.mutateAsync({
        identifier: ident,
        members: [{ user_id: selectedUser.id, role }],
      });
      toast.success(t('common:toast.add_successful'));
      setKeyword('');
      setSelectedUser(null);
      setRole('viewer');
      refetchMembers();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          t('common:toast.add_failed')
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative h-[80vh] w-[80vw] border-2 border-black bg-white shadow outline-0 flex flex-col">
        {/* 关闭按钮 */}
        <div
          className="absolute right-6 top-6 cursor-pointer p-2 hover:bg-gray-100"
          onClick={onClose}
        >
          <GrClose />
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 pt-8">
          <h2 className="mb-6 text-xl font-semibold">
            {t('lab:user_management')}
          </h2>

          {/* 邀请用户 标题 */}
          <div className="mb-2 text-sm font-medium">
            {t('lab:user.invite_users')}
          </div>

          {/* 一行：输入框 + 权限下拉 + 确认按钮 */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <div ref={dropdownRef} className="relative flex-1">
              <div className="flex h-10 items-center border border-solid border-[#ccc] bg-white px-3 transition-all focus-within:border-blue-500">
                <input
                  className="flex-1 text-sm outline-none placeholder:text-gray-400"
                  value={keyword}
                  onChange={handleKeywordChange}
                  placeholder={t(
                    'os_board:manage.permissions.search_user_placeholder',
                    { defaultValue: '请输入被邀请者的用户名' }
                  )}
                  onFocus={() => {
                    if (searchResults.length > 0) setShowDropdown(true);
                  }}
                />
                {isSearching && (
                  <span className="ml-2 shrink-0 text-xs text-gray-400">
                    {t('common:loading', { defaultValue: '搜索中...' })}
                  </span>
                )}
              </div>

              {/* 搜索结果下拉 */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute left-0 top-full z-50 mt-0.5 max-h-48 w-full overflow-y-auto border border-[#ccc] bg-white shadow-lg">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-blue-50"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectUser(user);
                      }}
                    >
                      <UserAvatar name={user.name} size="sm" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        {user.email && (
                          <span className="text-xs text-gray-400">
                            {user.email}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showDropdown &&
                !isSearching &&
                keyword.trim() &&
                searchResults.length === 0 && (
                  <div className="absolute left-0 top-full z-50 mt-0.5 w-full border border-[#ccc] bg-white px-3 py-3 text-sm text-gray-400 shadow-lg">
                    {t('common:no_data')}
                  </div>
                )}
            </div>

            <RoleSelect value={role} onChange={setRole} options={roleOptions} />

            <Button
              size="sm"
              className="h-10 whitespace-nowrap"
              disabled={!selectedUser}
              loading={assignMutation.isLoading}
              onClick={handleConfirm}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>

          {/* 用户列表标题 */}
          <div className="mb-3 text-sm font-medium">
            {t('lab:user.member')} ({authorizedData?.total ?? 0})
          </div>

          {/* 用户列表内容 */}
          {isLoadingMembers ? (
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse border border-[#CCCCCC] bg-gray-100"
                />
              ))}
            </div>
          ) : memberList.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">
              {t('common:no_data')}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {memberList.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  roleOptions={roleOptions}
                  t={t}
                  isAdmin={isAdmin}
                  onRoleChange={async (memberId, role) => {
                    try {
                      await updateRolesMutation.mutateAsync({
                        identifier: ident,
                        members: [{ member_id: memberId, role }],
                      });
                      toast.success(t('common:toast.update_successful', { defaultValue: '修改成功' }));
                      refetchMembers();
                    } catch (error: any) {
                      toast.error(
                        error?.response?.data?.message ||
                          error?.message ||
                          t('common:toast.failed', { defaultValue: '操作失败' })
                      );
                    }
                  }}
                  onRemove={async (memberId) => {
                    try {
                      await removeMembersMutation.mutateAsync({
                        identifier: ident,
                        member_ids: [memberId],
                      });
                      toast.success(t('common:toast.delete_successful', { defaultValue: '删除成功' }));
                      refetchMembers();
                    } catch (error: any) {
                      toast.error(
                        error?.response?.data?.message ||
                          error?.message ||
                          t('common:toast.failed', { defaultValue: '操作失败' })
                      );
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UserManageDialog;
