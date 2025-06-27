// 导出所有埋点相关功能
export { default as TrackingManager } from './TrackingManager';
export { default as TrackingWrapper } from './TrackingWrapper';
export * from './types';
export * from './hooks';
export * from './utils';

// 便捷的 trackEvent 函数，调用 TrackingManager 实例的方法
import TrackingManager from './TrackingManager';
import { ModuleActionConfig } from './types';

export function trackEvent(config: ModuleActionConfig): void {
  const manager = TrackingManager.getInstance();
  manager.trackEvent(config);
}

// 示例数据格式（保留作为参考）
export const exampleEvents = {
  // 页面总停留时长事件
  pageStay: {
    event_type: 'page_stay',
    timestamp: 1703123456789,
    user_id: 'user_123',
    page_path: '/system-admin/user-management',
    device_user_agent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device_language: 'zh-CN',
    device_timezone: 'Asia/Shanghai',
    data: {
      stay_duration: 45000, // 总停留时长(ms)
      effective_stay_time: 42000, // 有效停留时长(ms)
      enter_time: 1703123411789,
      leave_time: 1703123456789,
    },
  },

  // 单个模块访问事件
  moduleVisit: {
    event_type: 'module_visit',
    timestamp: 1703123456789,
    user_id: 'user_123',
    page_path: '/os-situation',
    module_id: 'os-situation', //态势洞察
    device_user_agent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device_language: 'zh-CN',
    device_timezone: 'Asia/Shanghai',
    data: {
      module: 'os-situation',
      type: 'push',
    },
  },

  // 模块核心功能点击事件
  moduleClick: {
    event_type: 'module_click',
    timestamp: 1703123456789,
    user_id: 'user_123',
    page_path: '/os-selection',
    module_id: 'os-selection',
    device_user_agent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device_language: 'zh-CN',
    device_timezone: 'Asia/Shanghai',
    data: {
      module: 'os-selection',
      type: 'recommendation_section_search',
      content: '用户输入的搜索内容',
    },
  },
};
