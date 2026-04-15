import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Radio, Space, message } from 'antd';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS } from '../rawData/constants';
import type { PainLevel } from '../types';

// 只展示可手动确认的四个等级（去掉 P4_TRIVIAL）
const CONFIRMABLE_LEVELS = USER_JOURNEY_PAIN_GUIDE_ITEMS.filter((item) =>
  (['P0_BLOCKER', 'P1_CRITICAL', 'P2_MAJOR', 'P3_MINOR'] as string[]).includes(
    item.level
  )
);

/** 根据 level 获取 badge 颜色配置 */
export const getPainLevelStyle = (
  level: string
): { bg: string; text: string; border: string; dot: string } => {
  switch (level) {
    case 'P0_BLOCKER':
      return {
        bg: 'bg-rose-100',
        text: 'text-rose-700',
        border: 'border-rose-300',
        dot: 'bg-rose-500',
      };
    case 'P1_CRITICAL':
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        dot: 'bg-red-500',
      };
    case 'P2_MAJOR':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-300',
        dot: 'bg-amber-500',
      };
    case 'P3_MINOR':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        dot: 'bg-emerald-500',
      };
    default:
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-300',
        dot: 'bg-slate-400',
      };
  }
};

export const getPainLevelLabel = (level: string): string => {
  const item = USER_JOURNEY_PAIN_GUIDE_ITEMS.find((g) => g.level === level);
  return item ? item.label : level;
};

type FormValues = {
  level: PainLevel;
  confirmed_by: string;
};

type Props = {
  open: boolean;
  painText: string;
  /** 已有的确认数据，用于编辑模式初始值 */
  initialValues?: { level: PainLevel; confirmed_by: string } | null;
  onCancel: () => void;
  onSubmit: (values: {
    level: PainLevel;
    confirmed_by: string;
  }) => Promise<void>;
};

const CONFIRMED_BY_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9 \-_]{1,20}$/;

const PainLevelConfirmModal: React.FC<Props> = ({
  open,
  painText,
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);

  // 打开弹窗时重置/填充表单
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      await onSubmit(values);
    } catch (err) {
      if (err && typeof err === 'object' && 'errorFields' in err) {
        // antd 表单校验失败，不做额外处理
        return;
      }
      message.error((err as Error).message || '提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="text-base font-semibold text-slate-800">
          确认痛点等级
        </div>
      }
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={initialValues ? '更新' : '确认'}
      cancelText="取消"
      confirmLoading={submitting}
      width={520}
      destroyOnClose
    >
      {/* 痛点内容预览 */}
      <div className="mb-5 mt-1 rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-2.5 text-sm leading-relaxed text-rose-800">
        {painText}
      </div>

      <Form form={form} layout="vertical" requiredMark={false}>
        {/* 等级选择 */}
        <Form.Item
          name="level"
          label={
            <span className="text-sm font-medium text-slate-700">
              痛点等级
              <span className="ml-0.5 text-red-500">*</span>
            </span>
          }
          rules={[{ required: true, message: '请选择痛点等级' }]}
        >
          <Radio.Group className="w-full">
            <Space direction="vertical" className="w-full">
              {CONFIRMABLE_LEVELS.map((item) => {
                const style = getPainLevelStyle(item.level);
                return (
                  <Radio key={item.level} value={item.level} className="w-full">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text} ${style.border}`}
                      >
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
                        />
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* 确认人 */}
        <Form.Item
          name="confirmed_by"
          label={
            <span className="text-sm font-medium text-slate-700">
              确认人
              <span className="ml-0.5 text-red-500">*</span>
            </span>
          }
          rules={[
            { required: true, message: '请填写确认人' },
            {
              pattern: CONFIRMED_BY_PATTERN,
              message:
                '只允许中文、字母、数字、空格、连字符和下划线，不超过 20 个字符',
            },
          ]}
        >
          <Input
            placeholder="请输入您的姓名"
            maxLength={20}
            showCount
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PainLevelConfirmModal;
