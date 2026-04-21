import React from 'react';
import { Select } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import getErrorMessage from '@common/utils/getErrorMessage';
import { useAuthorizedUsers, AuthorizedUserItem } from '../../api/dashboard';
import { setResponsiblePerson } from '../../api/tableData';

interface IssueResponsibleCellProps {
  /** 当前责任人登录名（显示用） */
  assigneeLogin?: string | null;
  /** 仓库 URL，作为接口 repo_url */
  repoUrl: string;
  /** 社区看板 identifier，如 DASH-60C20E */
  identifier?: string | null;
  /** 是否有编辑权限 */
  hasEditPermission?: boolean;
  onUpdated?: () => unknown | Promise<unknown>;
}

/** 与 UserManageDialog 的 RoleBadge 保持一致的样式 */
const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const { t } = useTranslation();
  if (role === 'admin') {
    return (
      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600">
        {t('os_board:manage.permissions.roles.admin', 'Admin')}
      </span>
    );
  }
  if (role === 'editor') {
    return (
      <span className="rounded bg-[#C16423]/10 px-1.5 py-0.5 text-[10px] text-[#C16423]">
        {t('os_board:manage.permissions.roles.editor', 'Editor')}
      </span>
    );
  }
  return (
    <span className="rounded bg-[#00B400]/10 px-1.5 py-0.5 text-[10px] text-[#00B400]">
      {t('os_board:manage.permissions.roles.viewer', 'Viewer')}
    </span>
  );
};

const IssueResponsibleCell: React.FC<IssueResponsibleCellProps> = ({
  assigneeLogin,
  repoUrl,
  identifier,
  hasEditPermission = false,
  onUpdated,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const canEdit = hasEditPermission && Boolean(repoUrl && identifier);

  // 拉取已授权用户列表（仅在可编辑且打开时才请求）
  const { data: authorizedData, isLoading: usersLoading } = useAuthorizedUsers(
    { identifier: identifier! },
    { enabled: canEdit && open }
  );
  const userList: AuthorizedUserItem[] = authorizedData?.data ?? [];

  const EMPTY_VALUE = -1;

  const mutation = useMutation({ mutationFn: setResponsiblePerson });

  const handleChange = React.useCallback(
    async (userId: number) => {
      if (!canEdit || !repoUrl || !identifier) return;
      try {
        const isRemove = userId === EMPTY_VALUE;
        const response = await mutation.mutateAsync(
          isRemove
            ? { repo_url: repoUrl, identifier }
            : { repo_url: repoUrl, ResponsiblePerson: userId, identifier }
        );

        const success =
          response.status === true || String(response.status) === 'success';

        if (!success) {
          toast.error(
            response.message || t('common:toast.modification_failed')
          );
          return;
        }

        toast.success(t('common:toast.modification_successful'));
        setTimeout(() => {
          onUpdated?.();
        }, 2000);
      } catch (error) {
        console.log(error);
        const message = getErrorMessage(error);
        if (message) toast.error(message);
      } finally {
        setOpen(false);
      }
    },
    [canEdit, identifier, mutation, onUpdated, repoUrl, t]
  );

  // 无编辑权限：只读
  if (!canEdit) {
    return (
      <span className="text-sm text-gray-700">{assigneeLogin || '-'}</span>
    );
  }

  // 有编辑权限：显示当前责任人 + FiEdit 图标，点击展开 Select
  return (
    <div ref={anchorRef} className="relative flex items-center gap-1.5">
      <span className="truncate text-sm text-gray-700">
        {assigneeLogin || '-'}
      </span>

      {/* 隐藏的 Select，作为下拉弹出锚点 */}
      <Select<number>
        open={open}
        onDropdownVisibleChange={setOpen}
        loading={usersLoading || mutation.isLoading}
        onChange={handleChange}
        variant="borderless"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          width: 0,
          height: 0,
          padding: 0,
          margin: 0,
        }}
        popupMatchSelectWidth={false}
        styles={{ popup: { root: { minWidth: 200 } } }}
        getPopupContainer={() => anchorRef.current ?? document.body}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <div className="border-t border-gray-100 px-3 py-2 text-xs text-gray-400">
              {t(
                'os_board:issue_table.no_user_hint',
                '未找到用户？可在右上角用户管理中新增用户'
              )}
            </div>
          </div>
        )}
        options={[
          {
            value: EMPTY_VALUE,
            label: (
              <span className="text-gray-400">
                {t(
                  'os_board:issue_table.no_responsible_person',
                  '无（清除责任人）'
                )}
              </span>
            ),
          },
          ...userList.map((user) => ({
            value: user.id,
            label: (
              <div className="flex items-center gap-2">
                <span className="flex-1 truncate font-medium">{user.name}</span>
                {user.role && <RoleBadge role={user.role} />}
              </div>
            ),
          })),
        ]}
      />

      <button
        type="button"
        title={t('common:btn.click_to_edit', '点击修改')}
        className="flex-shrink-0 cursor-pointer text-blue-600 hover:text-blue-700"
        onClick={() => setOpen(true)}
      >
        <FiEdit className="text-sm" />
      </button>
    </div>
  );
};

export default IssueResponsibleCell;
