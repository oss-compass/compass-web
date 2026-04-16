import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { OsBoardAlertLevel } from '../types';

// ========== 请求参数类型 ==========

export interface AlertListMetricsRequest {
  monitorType: 'community' | 'repo';
}

export interface AlertListRulesRequest {
  identifier: string;
  monitorType?: 'community' | 'repo';
  level?: OsBoardAlertLevel;
  enabled?: boolean;
  page?: number;
  perPage?: number;
}

export interface AlertListRecordsRequest {
  identifier: string;
  ruleId?: number;
  level?: OsBoardAlertLevel;
  page?: number;
  perPage?: number;
}

export interface AlertGetRuleRequest {
  id: number;
}

export interface AlertCreateRuleRequest {
  identifier: string;
  monitorType: 'community' | 'repo';
  targetRepo?: string;
  metricKey: string;
  metricName: string;
  timeRange: number;
  operator: '>' | '>=' | '<' | '<=' | '=' | '!=';
  operatorType: 'value' | 'percentage';
  threshold: number;
  level: OsBoardAlertLevel;
  description?: string;
  enabled?: boolean;
}

export interface AlertUpdateRuleRequest {
  id: number;
  monitorType?: 'community' | 'repo';
  targetRepo?: string;
  metricKey?: string;
  metricName?: string;
  timeRange?: number;
  operatorType?: 'value' | 'percentage';
  operator?: '>' | '>=' | '<' | '<=' | '=' | '!=';
  threshold?: number;
  level?: OsBoardAlertLevel;
  description?: string;
  enabled?: boolean;
}

export interface AlertDeleteRuleRequest {
  id: number;
}

export interface AlertToggleRuleRequest {
  id: number;
  enabled: boolean;
}

// ========== 响应类型 ==========

export interface AlertMetricItem {
  key: string;
  name: string;
  operatorType: 'value' | 'percentage';
  unit?: string;
}

export interface AlertMetricListResponse {
  metrics: AlertMetricItem[];
}

export interface AlertRuleCreator {
  user_id: number;
  user_name: string;
  user_email: string;
}

export interface AlertRuleItem {
  id: number;
  dashboard_id: number;
  monitor_type: 'community' | 'repo';
  target_repo?: string;
  metric_key: string;
  metric_name: string;
  operator: string;
  operator_type: 'value' | 'percentage';
  threshold: number | string;
  time_range: number;
  level: OsBoardAlertLevel;
  enabled: boolean;
  description?: string;
  unit?: string;
  creator?: AlertRuleCreator;
  created_at: string;
  updated_at: string;
}

export interface AlertRuleDetailResponse extends AlertRuleItem {
  last_triggered_at?: string;
}

export interface AlertRuleListResponse {
  items: AlertRuleItem[];
  totalCount: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface AlertRuleInfo {
  id: number;
  metric_name: string;
  level: OsBoardAlertLevel;
}

export interface AlertRecordItem {
  id: number;
  dashboard_id: number;
  dashboard_alert_rule_id: number;
  triggered_at: string;
  metric_value: number;
  threshold: number;
  message: string;
  created_at: string;
  dashboard_alert_rule?: AlertRuleInfo;
}

export interface AlertRecordListResponse {
  items: AlertRecordItem[];
  totalCount: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface AlertRuleOperationResponse {
  success: boolean;
}

// ========== API 查询 Hooks ==========

/**
 * 获取监控指标列表
 */
export const useAlertMetricList = (
  params: AlertListMetricsRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['alertMetricList', params],
    queryFn: async (): Promise<AlertMetricListResponse> => {
      const formData = new FormData();
      formData.append('monitorType', params.monitorType);
      const response = await axios.post(
        '/services/dashboard_alert/list_metrics',
        formData
      );
      return response.data;
    },
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * 获取预警规则列表
 */
export const useAlertRuleList = (
  params: AlertListRulesRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['alertRuleList', params],
    queryFn: async (): Promise<AlertRuleListResponse> => {
      const formData = new FormData();
      formData.append('identifier', params.identifier);
      if (params.monitorType)
        formData.append('monitorType', params.monitorType);
      if (params.level) formData.append('level', params.level);
      if (params.enabled !== undefined)
        formData.append('enabled', String(params.enabled));
      if (params.page !== undefined)
        formData.append('page', String(params.page));
      if (params.perPage !== undefined)
        formData.append('perPage', String(params.perPage));
      const response = await axios.post(
        '/services/dashboard_alert/list_rules',
        formData
      );
      return response.data;
    },
    enabled: options?.enabled !== false && !!params.identifier,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * 获取预警记录列表
 */
export const useAlertRecordList = (
  params: AlertListRecordsRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['alertRecordList', params],
    queryFn: async (): Promise<AlertRecordListResponse> => {
      const formData = new FormData();
      formData.append('identifier', params.identifier);
      if (params.ruleId !== undefined)
        formData.append('ruleId', String(params.ruleId));
      if (params.level) formData.append('level', params.level);
      if (params.page !== undefined)
        formData.append('page', String(params.page));
      if (params.perPage !== undefined)
        formData.append('perPage', String(params.perPage));
      const response = await axios.post(
        '/services/dashboard_alert/list_records',
        formData
      );
      return response.data;
    },
    enabled: options?.enabled !== false && !!params.identifier,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * 获取预警规则详情
 */
export const useAlertRuleDetail = (
  id: number | undefined,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['alertRuleDetail', id],
    queryFn: async (): Promise<AlertRuleDetailResponse> => {
      const formData = new FormData();
      formData.append('id', String(id));
      const response = await axios.post(
        '/services/dashboard_alert/get_rule',
        formData
      );
      return response.data;
    },
    enabled: options?.enabled !== false && id !== undefined,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
};

// ========== API 变更 Hooks ==========

/**
 * 创建预警规则
 */
export const useCreateAlertRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      params: AlertCreateRuleRequest
    ): Promise<AlertRuleOperationResponse> => {
      const formData = new FormData();
      formData.append('identifier', params.identifier);
      formData.append('monitorType', params.monitorType);
      formData.append('metricKey', params.metricKey);
      formData.append('metricName', params.metricName);
      formData.append('timeRange', String(params.timeRange));
      formData.append('operator', params.operator);
      formData.append('operatorType', params.operatorType);
      formData.append('threshold', String(params.threshold));
      formData.append('level', params.level);
      if (params.targetRepo) formData.append('targetRepo', params.targetRepo);
      if (params.description)
        formData.append('description', params.description);
      if (params.enabled !== undefined)
        formData.append('enabled', String(params.enabled));
      const response = await axios.post(
        '/services/dashboard_alert/create_rule',
        formData
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['alertRuleList', { identifier: variables.identifier }],
        exact: false,
      });
    },
  });
};

/**
 * 更新预警规则
 */
export const useUpdateAlertRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      params: AlertUpdateRuleRequest
    ): Promise<AlertRuleOperationResponse> => {
      const formData = new FormData();
      formData.append('id', String(params.id));
      if (params.monitorType)
        formData.append('monitorType', params.monitorType);
      if (params.targetRepo) formData.append('targetRepo', params.targetRepo);
      if (params.metricKey) formData.append('metricKey', params.metricKey);
      if (params.metricName) formData.append('metricName', params.metricName);
      if (params.timeRange !== undefined)
        formData.append('timeRange', String(params.timeRange));
      if (params.operatorType)
        formData.append('operatorType', params.operatorType);
      if (params.operator) formData.append('operator', params.operator);
      if (params.threshold !== undefined)
        formData.append('threshold', String(params.threshold));
      if (params.level) formData.append('level', params.level);
      if (params.description !== undefined)
        formData.append('description', params.description);
      if (params.enabled !== undefined)
        formData.append('enabled', String(params.enabled));
      const response = await axios.post(
        '/services/dashboard_alert/update_rule',
        formData
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['alertRuleDetail', variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['alertRuleList'],
        exact: false,
      });
    },
  });
};

/**
 * 删除预警规则
 */
export const useDeleteAlertRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      params: AlertDeleteRuleRequest
    ): Promise<AlertRuleOperationResponse> => {
      const formData = new FormData();
      formData.append('id', String(params.id));
      const response = await axios.post(
        '/services/dashboard_alert/delete_rule',
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alertRuleList'],
        exact: false,
      });
    },
  });
};

/**
 * 启用/禁用预警规则
 */
export const useToggleAlertRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      params: AlertToggleRuleRequest
    ): Promise<AlertRuleOperationResponse> => {
      const formData = new FormData();
      formData.append('id', String(params.id));
      formData.append('enabled', String(params.enabled));
      const response = await axios.post(
        '/services/dashboard_alert/toggle_rule',
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alertRuleList'],
        exact: false,
      });
    },
  });
};
