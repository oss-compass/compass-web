import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Modal, Switch } from '@oss-compass/ui';
import classnames from 'classnames';
import { toast } from 'react-hot-toast';
import type { OsBoardAlertLevel } from '../../types';
import AlertRuleDialog from './AlertRuleDialog';
import {
  useAlertRuleList,
  useAlertRecordList,
  useToggleAlertRule,
  useDeleteAlertRule,
  type AlertRuleItem,
} from '../../api/alert';

interface AlertManageDialogProps {
  open: boolean;
  onClose: () => void;
  /** 看板的 identifier（唯一编码，用于接口调用） */
  dashboardId: string;
  /** 监控类型，从看板类型传入 */
  monitorType?: 'community' | 'repo';
  /** 指定指标key，仅显示该指标的预警 */
  metricId?: string;
}

type TabType = 'rules' | 'events';

const AlertManageDialog: React.FC<AlertManageDialogProps> = ({
  open,
  onClose,
  dashboardId,
  monitorType = 'community',
  metricId,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('rules');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editRuleId, setEditRuleId] = useState<string | undefined>();
  const [deletingId, setDeletingId] = useState<number | undefined>();
  const [togglingId, setTogglingId] = useState<number | undefined>();

  // 获取规则列表
  const {
    data: rulesData,
    isLoading: rulesLoading,
    refetch: refetchRules,
  } = useAlertRuleList(
    { identifier: dashboardId, page: 1, perPage: 50 },
    { enabled: open && activeTab === 'rules' }
  );
  const dashboardRules: AlertRuleItem[] = rulesData?.items ?? [];

  // 获取预警记录列表
  const { data: recordsData, isLoading: recordsLoading } = useAlertRecordList(
    { identifier: dashboardId, page: 1, perPage: 50 },
    { enabled: open && activeTab === 'events' }
  );
  const dashboardEvents = recordsData?.items ?? [];

  const toggleAlertRule = useToggleAlertRule();
  const deleteAlertRule = useDeleteAlertRule();

  // 获取级别样式
  const getLevelStyle = (level: OsBoardAlertLevel) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // 切换启用状态
  const handleToggleEnabled = async (rule: AlertRuleItem) => {
    setTogglingId(rule.id);
    try {
      await toggleAlertRule.mutateAsync({
        id: rule.id,
        enabled: !rule.enabled,
      });
      toast.success(
        t('common:toast.update_successful', { defaultValue: '修改成功' })
      );
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          t('common:toast.failed', { defaultValue: '操作失败' })
      );
    } finally {
      setTogglingId(undefined);
    }
  };

  // 删除规则
  const handleDelete = async (ruleId: number) => {
    setDeletingId(ruleId);
    try {
      await deleteAlertRule.mutateAsync({ id: ruleId });
      toast.success(
        t('common:toast.delete_successful', { defaultValue: '删除成功' })
      );
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          t('common:toast.failed', { defaultValue: '操作失败' })
      );
    } finally {
      setDeletingId(undefined);
    }
  };

  // 编辑规则
  const handleEdit = (ruleId: number) => {
    setEditRuleId(String(ruleId));
    setAddDialogOpen(true);
  };

  // 关闭新增/编辑弹窗，并刷新列表
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setEditRuleId(undefined);
    refetchRules();
  };

  // 弹窗标题
  const dialogTitle = metricId
    ? `${metricId} - ${t('os_board:alert_manage.title')}`
    : t('os_board:alert_manage.title');

  const tabs: { key: TabType; label: string }[] = [
    { key: 'rules', label: t('os_board:alert_manage.tabs.rules') },
    { key: 'events', label: t('os_board:alert_manage.tabs.events') },
  ];

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="relative h-[80vh] w-[80vw] border-2 border-black bg-white shadow outline-0">
          {/* 关闭按钮 */}
          <div
            className="absolute right-6 top-6 cursor-pointer p-2 hover:bg-gray-100"
            onClick={onClose}
          >
            <GrClose />
          </div>

          {/* 标题和新增按钮 */}
          <div className="flex items-center justify-between border-b px-8 pb-4 pt-8">
            <h2 className="text-2xl font-medium">{dialogTitle}</h2>
            <Button
              className="mr-10"
              onClick={() => {
                setEditRuleId(undefined);
                setAddDialogOpen(true);
              }}
            >
              {t('os_board:alert_manage.add_rule')}
            </Button>
          </div>

          {/* Tabs */}
          <div className=" px-8">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={classnames(
                    'border-b-2 py-3 text-sm font-medium transition-colors',
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  )}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 内容区 */}
          <div className="thin-scrollbar h-[calc(100%-130px)] overflow-y-auto px-8 py-4">
            {activeTab === 'rules' && (
              <div>
                {rulesLoading ? (
                  <div className="py-20 text-center text-gray-400">
                    {t('common:loading', { defaultValue: '加载中...' })}
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.metric')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.condition')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.level')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.status')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.creator', {
                            defaultValue: '创建人',
                          })}
                        </th>
                        <th className="px-3 py-3 text-center font-medium">
                          {t('os_board:alert_manage.table.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardRules.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-20 text-center text-gray-400"
                          >
                            {t('common:no_data')}
                          </td>
                        </tr>
                      ) : (
                        dashboardRules.map((rule) => (
                          <tr
                            key={rule.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="px-3 py-3">
                              <div>{rule.metric_name}</div>
                              {rule.description && (
                                <div className="mt-0.5 text-xs text-gray-400">
                                  {rule.description}
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-3">
                              {rule.operator} {rule.threshold}
                              {rule.unit
                                ? rule.unit
                                : rule.operator_type === 'percentage'
                                ? '%'
                                : ''}
                            </td>
                            <td className="px-3 py-3">
                              <span
                                className={classnames(
                                  'px-2 py-1 text-xs font-medium',
                                  getLevelStyle(rule.level)
                                )}
                              >
                                {t(
                                  `os_board:alert_dialog.levels.${rule.level}`
                                )}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="relative inline-flex items-center">
                                <Switch
                                  size="small"
                                  checked={rule.enabled}
                                  disabled={togglingId === rule.id}
                                  onChange={() => handleToggleEnabled(rule)}
                                  sx={
                                    togglingId === rule.id
                                      ? { opacity: 0.5 }
                                      : undefined
                                  }
                                />
                                {togglingId === rule.id && (
                                  <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              {rule.creator ? (
                                <>
                                  <div className="text-sm">
                                    {rule.creator.user_name}
                                  </div>
                                  <div className="mt-0.5 text-xs text-gray-400">
                                    {rule.creator.user_email}
                                  </div>
                                </>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-3 py-3 text-center">
                              <button
                                type="button"
                                className="px-2 py-1 text-xs text-blue-600 hover:underline"
                                onClick={() => handleEdit(rule.id)}
                              >
                                {t('common:btn.edit')}
                              </button>
                              <button
                                type="button"
                                className="ml-2 px-2 py-1 text-xs text-red-600 hover:underline disabled:opacity-50"
                                disabled={deletingId === rule.id}
                                onClick={() => handleDelete(rule.id)}
                              >
                                {deletingId === rule.id
                                  ? t('common:deleting', {
                                      defaultValue: '删除中...',
                                    })
                                  : t('common:btn.delete')}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                {recordsLoading ? (
                  <div className="py-20 text-center text-gray-400">
                    {t('common:loading', { defaultValue: '加载中...' })}
                  </div>
                ) : dashboardEvents.length === 0 ? (
                  <div className="py-20 text-center text-gray-400">
                    {t('common:no_data')}
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left">
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.metric')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.level')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.metric_value', {
                            defaultValue: '指标值',
                          })}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.threshold', {
                            defaultValue: '阈值',
                          })}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.message', {
                            defaultValue: '消息',
                          })}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.triggered_at', {
                            defaultValue: '触发时间',
                          })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-3 py-3">
                            {event.dashboard_alert_rule?.metric_name ??
                              String(event.dashboard_alert_rule_id)}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={classnames(
                                'px-2 py-1 text-xs font-medium',
                                getLevelStyle(
                                  (event.dashboard_alert_rule
                                    ?.level as OsBoardAlertLevel) ?? 'info'
                                )
                              )}
                            >
                              {t(
                                `os_board:alert_dialog.levels.${
                                  event.dashboard_alert_rule?.level ?? 'info'
                                }`
                              )}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            {event.metric_value.toFixed(2)}
                          </td>
                          <td className="px-3 py-3">{event.threshold}</td>
                          <td className="px-3 py-3 text-gray-500">
                            {event.message}
                          </td>
                          <td className="px-3 py-3">
                            {new Date(
                              event.triggered_at || event.created_at
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* 新增/编辑预警规则弹窗 */}
      <AlertRuleDialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        dashboardId={dashboardId}
        monitorType={monitorType}
        editRuleId={editRuleId}
        presetMetricId={metricId}
      />
    </>
  );
};

export default AlertManageDialog;
