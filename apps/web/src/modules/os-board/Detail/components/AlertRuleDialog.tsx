import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Modal, Switch } from '@oss-compass/ui';
import classnames from 'classnames';
import type {
  OsBoardAlertRule,
  OsBoardAlertCondition,
  OsBoardAlertLevel,
} from '../../types';

// 阈值类型
type ThresholdType = 'absolute' | 'percentage' | 'growth_rate';

interface AlertRuleDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
  /** 预设指标 ID，从指标卡片打开时传入 */
  presetMetricId?: string;
  /** 编辑模式下的规则 ID */
  editRuleId?: string;
}

const conditionOptions: { value: OsBoardAlertCondition; label: string }[] = [
  { value: 'gt', label: '>' },
  { value: 'gte', label: '>=' },
  { value: 'lt', label: '<' },
  { value: 'lte', label: '<=' },
  { value: 'eq', label: '=' },
];

const levelOptions: { value: OsBoardAlertLevel; labelKey: string }[] = [
  { value: 'critical', labelKey: 'os_board:alert_dialog.levels.critical' },
  { value: 'warning', labelKey: 'os_board:alert_dialog.levels.warning' },
  { value: 'info', labelKey: 'os_board:alert_dialog.levels.info' },
];

const thresholdTypeOptions: { value: ThresholdType; labelKey: string }[] = [
  {
    value: 'absolute',
    labelKey: 'os_board:alert_dialog.threshold_types.absolute',
  },
  {
    value: 'percentage',
    labelKey: 'os_board:alert_dialog.threshold_types.percentage',
  },
  {
    value: 'growth_rate',
    labelKey: 'os_board:alert_dialog.threshold_types.growth_rate',
  },
];

const AlertRuleDialog: React.FC<AlertRuleDialogProps> = ({
  open,
  onClose,
  presetMetricId,
  editRuleId,
}) => {
  const { t } = useTranslation();

  // 表单状态
  const [metricId, setMetricId] = useState<string>('');
  const [condition, setCondition] = useState<OsBoardAlertCondition>('gt');
  const [threshold, setThreshold] = useState<number>(0);
  const [thresholdType, setThresholdType] = useState<ThresholdType>('absolute');
  const [level, setLevel] = useState<OsBoardAlertLevel>('warning');
  const [enabled, setEnabled] = useState<boolean>(true);
  const [channels, setChannels] = useState<Array<'inbox' | 'email'>>(['inbox']);

  // 暂无后端接口，可选指标列表为空
  const selectableMetrics: Array<{
    id: string;
    name: string;
    category: string;
  }> = [];

  // 暂无后端接口，当前指标已有规则为空
  const currentMetricRules: OsBoardAlertRule[] = [];

  const isFormValid = metricId && threshold !== undefined;

  // 编辑模式下加载规则数据
  useEffect(() => {
    if (editRuleId && open) {
      // TODO: 接入后端获取规则详情
    }
  }, [editRuleId, open]);

  // 预设指标 ID
  useEffect(() => {
    if (presetMetricId && open && !editRuleId) {
      setMetricId(presetMetricId);
    }
  }, [presetMetricId, open, editRuleId]);

  // 重置表单
  const resetForm = () => {
    setMetricId(presetMetricId || '');
    setCondition('gt');
    setThreshold(0);
    setThresholdType('absolute');
    setLevel('warning');
    setEnabled(true);
    setChannels(['inbox']);
  };

  // 关闭弹窗时重置
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // 保存规则
  const handleSave = () => {
    if (!metricId) return;
    // TODO: 接入后端保存接口
    handleClose();
  };

  // 获取条件显示文本
  const getConditionLabel = (cond: OsBoardAlertCondition) => {
    const opt = conditionOptions.find((o) => o.value === cond);
    return opt?.label || cond;
  };

  // 级别对应的按钮样式
  const getLevelButtonStyle = (lvl: OsBoardAlertLevel) => {
    switch (lvl) {
      case 'critical':
        return 'border-red-500 bg-red-50 text-red-700';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'info':
        return 'border-blue-500 bg-blue-50 text-blue-700';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  // 级别对应的标签样式
  const getLevelBadgeStyle = (lvl: OsBoardAlertLevel) => {
    switch (lvl) {
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

  // 获取级别显示文本
  const getLevelLabel = (lvl: OsBoardAlertLevel) => {
    return t(`os_board:alert_dialog.levels.${lvl}`);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="relative w-[680px] border-2 border-black bg-white shadow outline-0 md:w-[90vw]">
        {/* 关闭按钮 */}
        <div
          className="absolute right-6 top-6 cursor-pointer p-2 hover:bg-gray-100"
          onClick={handleClose}
        >
          <GrClose />
        </div>

        {/* 标题 */}
        <div className="border-b px-8 pb-4 pt-8">
          <h2 className="text-2xl font-medium">
            {editRuleId
              ? t('os_board:alert_dialog.edit_title')
              : t('os_board:alert_dialog.create_title')}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t('os_board:alert_dialog.subtitle')}
          </p>
        </div>

        {/* 表单内容 */}
        <div className="thin-scrollbar max-h-[60vh] overflow-y-auto px-8 py-6">
          {/* 指标选择 */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              {t('os_board:alert_dialog.metric')}
            </label>
            <select
              className={classnames(
                'h-10 w-full border bg-white px-3 text-sm outline-none focus:border-black',
                presetMetricId && 'cursor-not-allowed bg-gray-100 text-gray-500'
              )}
              value={metricId}
              onChange={(e) => setMetricId(e.target.value)}
              disabled={!!presetMetricId}
            >
              <option value="">
                {t('os_board:alert_dialog.select_metric')}
              </option>
              {selectableMetrics.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.category})
                </option>
              ))}
            </select>
          </div>

          {/* 预警条件设置 */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              {t('os_board:alert_dialog.alert_condition')}
            </label>
            <div className="grid grid-cols-3 gap-4">
              {/* 比较运算符 */}
              <div>
                <label className="mb-1 block text-xs text-[#585858]">
                  {t('os_board:alert_dialog.condition')}
                </label>
                <select
                  className="h-10 w-full border bg-white px-3 text-sm outline-none focus:border-black"
                  value={condition}
                  onChange={(e) =>
                    setCondition(e.target.value as OsBoardAlertCondition)
                  }
                >
                  {conditionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}{' '}
                      {t(`os_board:alert_dialog.conditions.${opt.value}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* 阈值类型 */}
              <div>
                <label className="mb-1 block text-xs text-[#585858]">
                  {t('os_board:alert_dialog.threshold_type')}
                </label>
                <select
                  className="h-10 w-full border bg-white px-3 text-sm outline-none focus:border-black"
                  value={thresholdType}
                  onChange={(e) =>
                    setThresholdType(e.target.value as ThresholdType)
                  }
                >
                  {thresholdTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* 阈值 */}
              <div>
                <label className="mb-1 block text-xs text-[#585858]">
                  {t('os_board:alert_dialog.threshold')}
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="h-10 w-full border bg-white px-3 text-sm outline-none focus:border-black"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                  />
                  {thresholdType === 'percentage' && (
                    <span className="ml-2 text-[#585858]">%</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 预警级别 */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              {t('os_board:alert_dialog.level')}
            </label>
            <div className="flex gap-3">
              {levelOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={classnames(
                    'flex h-10 flex-1 items-center justify-center border text-sm font-medium transition-colors',
                    level === opt.value
                      ? getLevelButtonStyle(opt.value)
                      : 'border bg-white text-[#585858] hover:border-gray-400'
                  )}
                  onClick={() => setLevel(opt.value)}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* 通知渠道 */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              {t('os_board:alert_dialog.channels')}
            </label>
            <div className="flex gap-6">
              <label
                className={classnames(
                  'flex h-10 cursor-pointer items-center gap-2 border px-4',
                  channels.includes('inbox') ? 'border-blue-600 bg-blue-50' : ''
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={channels.includes('inbox')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChannels([...channels, 'inbox']);
                    } else {
                      setChannels(channels.filter((c) => c !== 'inbox'));
                    }
                  }}
                />
                <span className="text-sm">
                  {t('os_board:alert_dialog.channel_inbox')}
                </span>
              </label>
              <label
                className={classnames(
                  'flex h-10 cursor-pointer items-center gap-2 border px-4',
                  channels.includes('email') ? 'border-blue-600 bg-blue-50' : ''
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={channels.includes('email')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChannels([...channels, 'email']);
                    } else {
                      setChannels(channels.filter((c) => c !== 'email'));
                    }
                  }}
                />
                <span className="text-sm">
                  {t('os_board:alert_dialog.channel_email')}
                </span>
              </label>
            </div>
          </div>

          {/* 启用状态 */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <Switch
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span className="text-sm font-medium">
                {t('os_board:alert_dialog.enabled')}
              </span>
            </div>
          </div>

          {/* 已有规则列表 */}
          {metricId && currentMetricRules.length > 0 && !editRuleId && (
            <div className="border-t pt-4">
              <div className="mb-3 font-semibold">
                {t('os_board:alert_dialog.existing_rules')} (
                {currentMetricRules.length})
              </div>
              <div className="max-h-40 space-y-2 overflow-y-auto">
                {currentMetricRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between border bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={classnames(
                          'px-2 py-1 text-xs font-medium',
                          getLevelBadgeStyle(rule.level)
                        )}
                      >
                        {getLevelLabel(rule.level)}
                      </span>
                      <span className="text-sm">
                        {getConditionLabel(rule.condition)} {rule.threshold}
                      </span>
                      {!rule.enabled && (
                        <span className="text-xs text-gray-400">
                          ({t('os_board:alert_dialog.disabled')})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-end gap-4 border-t bg-white px-8 py-4">
          <Button
            intent="text"
            className="min-w-[100px] border"
            onClick={handleClose}
          >
            {t('common:btn.cancel')}
          </Button>
          <Button
            className="min-w-[100px]"
            disabled={!isFormValid}
            onClick={handleSave}
          >
            {t('common:btn.save')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertRuleDialog;
