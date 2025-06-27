/**
 * 埋点事件数据结构
 */
export interface TrackingEvent {
  event_type: string; // 事件类型
  timestamp: number; // 时间戳
  user_id?: string; // 用户ID 可为空
  referrer?: string; // 跳转来源 可为空
  page_path: string; // 页面路径
  module_id?: string; // 模块ID
  device_user_agent: string;
  device_language: string;
  device_timezone: string;
  data: Record<string, any>; // 具体数据
}

/**
 * 设备信息
 */
export interface DeviceInfo {
  userAgent: string;
  language: string;
  timezone: string;
}

/**
 * 模块核心功能点击事件配置
 */
export interface ModuleActionConfig {
  module: string;
  type: string;
  content?: any;
}
