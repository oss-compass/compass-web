import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Modal, Switch } from '@oss-compass/ui';
import classnames from 'classnames';
import { osBoardState, actions, saveToStorage } from '../state';
import type {
  OsBoardAlertRule,
  OsBoardAlertCondition,
  OsBoardAlertLevel,
} from '../types';
import AlertRuleDialog from './AlertRuleDialog';

interface AlertManageDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
  /** 指定指标ID，仅显示该指标的预警 */
  metricId?: string;
}

type TabType = 'rules' | 'events';

const conditionLabels: Record<OsBoardAlertCondition, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
};

const AlertManageDialog: React.FC<AlertManageDialogProps> = ({
  open,
  onClose,
  dashboardId,
  metricId,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('rules');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editRuleId, setEditRuleId] = useState<string | undefined>();

  // 获取指标名称
  const getMetricName = (id: string) => {
    const metrics = [...osBoardState.metrics, ...osBoardState.derivedMetrics];
    const metric = metrics.find((m) => m.id === id);
    return metric?.name || id;
  };

  // 当前看板的预警规则（可能按指标过滤）
  const dashboardRules = osBoardState.alertRules.filter(
    (r) =>
      r.dashboardId === dashboardId && (!metricId || r.metricId === metricId)
  );

  // 当前看板的触发记录（可能按指标过滤）
  const dashboardEvents = osBoardState.alertEvents
    .filter(
      (e) =>
        e.dashboardId === dashboardId && (!metricId || e.metricId === metricId)
    )
    .slice(0, 50);

  // 弹窗标题
  const dialogTitle = metricId
    ? `${getMetricName(metricId)} - ${t('os_board:alert_manage.title')}`
    : t('os_board:alert_manage.title');

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
  const handleToggleEnabled = (rule: OsBoardAlertRule) => {
    actions.upsertAlertRule({
      ...rule,
      channels: [...rule.channels] as Array<'inbox' | 'email'>,
      enabled: !rule.enabled,
    });
    saveToStorage();
  };

  // 删除规则
  const handleDelete = (ruleId: string) => {
    actions.removeAlertRule(ruleId);
    saveToStorage();
  };

  // 编辑规则
  const handleEdit = (ruleId: string) => {
    setEditRuleId(ruleId);
    setAddDialogOpen(true);
  };

  // 关闭新增/编辑弹窗
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setEditRuleId(undefined);
  };

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
                {dashboardRules.length === 0 ? (
                  <div className="flex flex-col items-center py-20">
                    <p className="mb-4 text-gray-400">{t('common:no_data')}</p>
                    <Button
                      onClick={() => {
                        setEditRuleId(undefined);
                        setAddDialogOpen(true);
                      }}
                    >
                      {t('os_board:alert_manage.add_rule')}
                    </Button>
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
                        <th className="px-3 py-3 text-center font-medium">
                          {t('os_board:alert_manage.table.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardRules.map((rule) => (
                        <tr key={rule.id} className="border-b hover:bg-gray-50">
                          <td className="px-3 py-3">
                            {getMetricName(rule.metricId)}
                          </td>
                          <td className="px-3 py-3">
                            {conditionLabels[rule.condition]} {rule.threshold}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={classnames(
                                'px-2 py-1 text-xs font-medium',
                                getLevelStyle(rule.level)
                              )}
                            >
                              {t(`os_board:alert_dialog.levels.${rule.level}`)}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <Switch
                              size="small"
                              checked={rule.enabled}
                              onChange={() => handleToggleEnabled(rule)}
                            />
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
                              className="ml-2 px-2 py-1 text-xs text-red-600 hover:underline"
                              onClick={() => handleDelete(rule.id)}
                            >
                              {t('common:btn.delete')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                {dashboardEvents.length === 0 ? (
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
                          {t('os_board:alert_manage.table.value')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.threshold')}
                        </th>
                        <th className="px-3 py-3 font-medium">
                          {t('os_board:alert_manage.table.trigger_time')}
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
                            {getMetricName(event.metricId)}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={classnames(
                                'px-2 py-1 text-xs font-medium',
                                getLevelStyle(event.level)
                              )}
                            >
                              {t(`os_board:alert_dialog.levels.${event.level}`)}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            {event.value.toFixed(2)}
                          </td>
                          <td className="px-3 py-3">{event.threshold}</td>
                          <td className="px-3 py-3">
                            {new Date(event.createdAt).toLocaleString()}
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
        editRuleId={editRuleId}
        presetMetricId={metricId}
      />
    </>
  );
};

export default AlertManageDialog;
