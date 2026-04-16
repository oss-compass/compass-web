import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Modal, Switch } from '@oss-compass/ui';
import classnames from 'classnames';
import { toast } from 'react-hot-toast';
import type { OsBoardAlertLevel } from '../../types';
import {
  useAlertMetricList,
  useAlertRuleDetail,
  useCreateAlertRule,
  useUpdateAlertRule,
} from '../../api/alert';

// 阈值类型（对应后端 operatorType）
type ThresholdType = 'value' | 'percentage';

// 运算符（对应后端 operator 字段）
type Operator = '>' | '>=' | '<' | '<=' | '=' | '!=';

interface AlertRuleDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
  /** 监控类型，从看板类型传入 */
  monitorType?: 'community' | 'repo';
  /** 预设指标 key，从指标卡片打开时传入 */
  presetMetricId?: string;
  /** 编辑模式下的规则 ID */
  editRuleId?: string;
}

const operatorOptions: { value: Operator; label: string }[] = [
  { value: '>', label: '>' },
  { value: '>=', label: '>=' },
  { value: '<', label: '<' },
  { value: '<=', label: '<=' },
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
];

const levelOptions: { value: OsBoardAlertLevel; labelKey: string }[] = [
  { value: 'critical', labelKey: 'os_board:alert_dialog.levels.critical' },
  { value: 'warning', labelKey: 'os_board:alert_dialog.levels.warning' },
  { value: 'info', labelKey: 'os_board:alert_dialog.levels.info' },
];

// 默认时间范围（最近几个月）
const DEFAULT_TIME_RANGE = 3;

const AlertRuleDialog: React.FC<AlertRuleDialogProps> = ({
  open,
  onClose,
  dashboardId,
  monitorType = 'community',
  presetMetricId,
  editRuleId,
}) => {
  const { t } = useTranslation();

  // 表单状态
  const [metricKey, setMetricKey] = useState<string>('');
  const [metricName, setMetricName] = useState<string>('');
  const [operator, setOperator] = useState<Operator>('>');
  const [threshold, setThreshold] = useState<number>(0);
  const [thresholdType, setThresholdType] = useState<ThresholdType>('value');
  const [level, setLevel] = useState<OsBoardAlertLevel>('warning');
  const [enabled, setEnabled] = useState<boolean>(true);
  const [description, setDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const editRuleIdNum = editRuleId ? Number(editRuleId) : undefined;

  // 获取指标列表
  const { data: metricsData, isLoading: metricsLoading } = useAlertMetricList(
    { monitorType },
    { enabled: open }
  );
  const selectableMetrics = metricsData?.metrics ?? [];

  // 当前选中指标的单位
  const currentMetricUnit = useMemo(
    () => selectableMetrics.find((m) => m.key === metricKey)?.unit ?? '',
    [selectableMetrics, metricKey]
  );

  // 编辑模式：获取规则详情
  const { data: ruleDetail, isLoading: ruleLoading } = useAlertRuleDetail(
    editRuleIdNum,
    { enabled: open && !!editRuleIdNum }
  );

  const createAlertRule = useCreateAlertRule();
  const updateAlertRule = useUpdateAlertRule();

  const isFormValid = !!metricKey && threshold !== undefined;
  const isLoading = metricsLoading || (!!editRuleIdNum && ruleLoading);

  // 编辑模式下回填数据
  useEffect(() => {
    if (ruleDetail && open && editRuleIdNum) {
      setMetricKey(ruleDetail.metric_key);
      setMetricName(ruleDetail.metric_name);
      setOperator((ruleDetail.operator as Operator) || '>');
      setThreshold(Number(ruleDetail.threshold));
      setThresholdType(ruleDetail.operator_type ?? 'value');
      setLevel(ruleDetail.level);
      setEnabled(ruleDetail.enabled);
      setDescription(ruleDetail.description ?? '');
    }
  }, [ruleDetail, open, editRuleIdNum]);

  // 预设指标 key
  useEffect(() => {
    if (presetMetricId && open && !editRuleId) {
      setMetricKey(presetMetricId);
      const found = selectableMetrics.find((m) => m.key === presetMetricId);
      if (found) {
        setMetricName(found.name);
        setThresholdType(found.operatorType);
      }
    }
  }, [presetMetricId, open, editRuleId, selectableMetrics]);

  // 选择指标时同步 metricName 和 thresholdType
  const handleMetricChange = (key: string) => {
    setMetricKey(key);
    const found = selectableMetrics.find((m) => m.key === key);
    setMetricName(found?.name ?? key);
    if (found?.operatorType) setThresholdType(found.operatorType);
  };

  // 重置表单
  const resetForm = () => {
    setMetricKey(presetMetricId || '');
    setMetricName('');
    setOperator('>');
    setThreshold(0);
    setThresholdType('value');
    setLevel('warning');
    setEnabled(true);
    setDescription('');
    setSubmitError('');
  };

  // 关闭弹窗时重置
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // 保存规则
  const handleSave = async () => {
    if (!metricKey) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      if (editRuleIdNum) {
        await updateAlertRule.mutateAsync({
          id: editRuleIdNum,
          metricKey,
          metricName,
          operator,
          operatorType: thresholdType,
          threshold,
          level,
          enabled,
          description: description || undefined,
        });
      } else {
        await createAlertRule.mutateAsync({
          identifier: dashboardId,
          monitorType,
          metricKey,
          metricName,
          timeRange: DEFAULT_TIME_RANGE,
          operator,
          operatorType: thresholdType,
          threshold,
          level,
          enabled,
          description: description || undefined,
        });
      }
      toast.success(
        editRuleIdNum
          ? t('common:toast.update_successful', { defaultValue: '修改成功' })
          : t('common:toast.add_successful', { defaultValue: '创建成功' })
      );
      handleClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        t('os_board:alert_dialog.save_error', {
          defaultValue: '保存失败，请重试',
        });
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-gray-400">
              {t('common:loading', { defaultValue: '加载中...' })}
            </div>
          ) : (
            <>
              {/* 指标选择 */}
              <div className="mb-6">
                <label className="mb-2 block font-semibold">
                  {t('os_board:alert_dialog.metric')}
                </label>
                <select
                  className={classnames(
                    'h-10 w-full border bg-white px-3 text-sm outline-none focus:border-black',
                    presetMetricId &&
                      'cursor-not-allowed bg-gray-100 text-gray-500'
                  )}
                  value={metricKey}
                  onChange={(e) => handleMetricChange(e.target.value)}
                  disabled={!!presetMetricId}
                >
                  <option value="">
                    {t('os_board:alert_dialog.select_metric')}
                  </option>
                  {selectableMetrics.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.name}
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
                      value={operator}
                      onChange={(e) => setOperator(e.target.value as Operator)}
                    >
                      {operatorOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 阈值类型（由指标决定，只读） */}
                  <div>
                    <label className="mb-1 block text-xs text-[#585858]">
                      {t('os_board:alert_dialog.threshold_type')}
                    </label>
                    <div className="flex h-10 items-center border bg-gray-50 px-3 text-sm text-gray-500">
                      {thresholdType === 'percentage'
                        ? t(
                            'os_board:alert_dialog.threshold_types.percentage',
                            {
                              defaultValue: '百分比',
                            }
                          )
                        : t('os_board:alert_dialog.threshold_types.absolute', {
                            defaultValue: '绝对值',
                          })}
                    </div>
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
                      {currentMetricUnit && (
                        <span className="ml-2 shrink-0 text-[#585858]">
                          {currentMetricUnit}
                        </span>
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

              {/* 规则描述 */}
              <div className="mb-6">
                <label className="mb-2 block font-semibold">
                  {t('os_board:alert_dialog.description', {
                    defaultValue: '规则描述',
                  })}
                </label>
                <input
                  type="text"
                  className="h-10 w-full border bg-white px-3 text-sm outline-none focus:border-black"
                  value={description}
                  placeholder={t(
                    'os_board:alert_dialog.description_placeholder',
                    {
                      defaultValue: '选填，规则备注说明',
                    }
                  )}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* 通知渠道 */}
              <div className="mb-6">
                <label className="mb-2 block font-semibold">
                  {t('os_board:alert_dialog.notify_channel', {
                    defaultValue: '通知渠道',
                  })}
                </label>
                <label className="inline-flex cursor-not-allowed items-center gap-2 text-sm text-gray-700">
                  <span className="flex h-4 w-4 items-center justify-center rounded-sm border-2 border-black bg-black">
                    <svg
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </span>
                  {t('os_board:alert_dialog.notify_email', {
                    defaultValue: '邮箱',
                  })}
                </label>
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

              {/* 错误提示 */}
              {submitError && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submitError}
                </div>
              )}
            </>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-end gap-4 border-t bg-white px-8 py-4">
          <Button
            intent="text"
            className="min-w-[100px] border"
            onClick={handleClose}
            disabled={submitting}
          >
            {t('common:btn.cancel')}
          </Button>
          <Button
            className="min-w-[100px]"
            disabled={!isFormValid || submitting || isLoading}
            onClick={handleSave}
          >
            {submitting
              ? t('common:saving', { defaultValue: '保存中...' })
              : t('common:btn.save')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertRuleDialog;
