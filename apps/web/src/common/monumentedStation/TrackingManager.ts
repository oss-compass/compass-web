import { TrackingEvent, ModuleActionConfig } from './types';
import { getDeviceInfo } from './utils';

/**
 * 埋点管理器 - 负责统一管理所有埋点事件的收集和上报
 */
const FLUSH_INTERVAL = 30000;
class TrackingManager {
  private static instance: TrackingManager;
  private userId?: string;
  private sessionStartTime: number;
  private currentPagePath: string = '';
  private currentModule: string = '';
  private moduleStartTime: number = 0;
  private reportQueue: TrackingEvent[] = [];
  private isReporting: boolean = false;
  private reportTimer?: NodeJS.Timeout;
  private lastModuleStayReportTime: number = 0;

  private constructor() {
    this.sessionStartTime = Date.now();
    this.initEventListeners();
  }

  public static getInstance(): TrackingManager {
    if (!TrackingManager.instance) {
      TrackingManager.instance = new TrackingManager();
    }
    return TrackingManager.instance;
  }

  /**
   * 初始化埋点管理器
   */
  public init() {
    // 初始化已在构造函数中完成，这里可以进行额外的初始化逻辑
    console.log('TrackingManager initialized');
  }

  /**
   * 初始化用户ID
   */
  public setUserId(userId: string) {
    this.userId = userId;
  }

  /**
   * 初始化事件监听器
   */
  private initEventListeners() {
    if (typeof window === 'undefined') return;

    // 页面卸载标志，防止重复上报
    let isUnloading = false;

    // 页面卸载时上报模块停留时长
    const handleBeforeUnload = () => {
      if (isUnloading) return;
      isUnloading = true;
      // 页面卸载时只上报模块停留时长
      this.reportModuleStay(this.currentPagePath);
      this.flushReports();
    };

    // 页面可见性变化时的处理
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 页面隐藏时上报模块停留时长（但不是卸载）
        if (!isUnloading) {
          this.reportModuleStay(this.currentPagePath);
        }
      } else {
        // 页面重新可见时重新开始模块计时
        isUnloading = false;
        this.moduleStartTime = Date.now();
        // 重置防重复上报时间戳
        this.lastModuleStayReportTime = 0;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 定期上报数据（每30秒）
    this.reportTimer = setInterval(() => {
      console.log('report');
      this.flushReports();
    }, FLUSH_INTERVAL);
  }

  /**
   * 路由变化时调用
   */
  public onRouteChange(newPath: string) {
    const oldPath = this.currentPagePath;
    const oldModule = this.currentModule;
    const newModule = this.extractModuleFromPath(newPath);

    // 如果路径没有变化，直接返回
    if (oldPath === newPath) {
      return;
    }

    // 如果有旧路径且有模块，上报模块停留时长
    if (oldPath && this.currentModule && this.moduleStartTime > 0) {
      this.reportModuleStay(oldPath);
      // 路由切换后重置防重复上报时间戳，避免后续事件重复上报
      this.lastModuleStayReportTime = Date.now();
    }

    // 更新当前路径和模块
    this.currentPagePath = newPath;
    this.currentModule = newModule;

    // 重新开始模块计时
    this.moduleStartTime = Date.now();

    // 上报模块访问（所有路由切换都要上报）
    if (newModule) {
      const type = this.extractTypeFromPath(newPath);
      this.reportModuleClick(newModule, type);
    } else {
      // 非模块页面（如主页）也要上报
      const type = this.extractTypeFromPath(newPath);
      this.reportModuleClick('home', type);
    }
  }

  /**
   * 从路径中提取模块名
   */
  private extractModuleFromPath(path: string): string {
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length === 0) return 'home';

    const firstSegment = pathSegments[0];
    const moduleMap: Record<string, string> = {
      '': 'home',
      analyze: 'analyze',
      developer: 'developer',
      'os-selection': 'os-selection',
      'os-situation': 'os-situation',
      dataHub: 'dataHub',
      lab: 'lab',
    };

    return moduleMap[firstSegment] || firstSegment;
  }

  /**
   * 上报模块停留时长
   */
  private reportModuleStay(path?: string) {
    if (!this.currentModule || this.moduleStartTime === 0) return;

    const now = Date.now();
    // 防重复上报：如果距离上次上报时间小于500ms，则跳过
    if (now - this.lastModuleStayReportTime < 500) {
      console.log(
        'reportModuleStay: 跳过重复上报，距离上次上报时间:',
        now - this.lastModuleStayReportTime,
        'ms'
      );
      return;
    }

    const targetPath = path || this.currentPagePath;
    const type = this.extractTypeFromPath(targetPath);
    const stayDuration = now - this.moduleStartTime;

    // 只有停留时长大于0才上报
    if (stayDuration > 0) {
      console.log('reportModuleStay: 上报模块停留', {
        module: this.currentModule,
        path: targetPath,
        stayDuration,
        enterTime: this.moduleStartTime,
        leaveTime: now,
      });
      const event = this.createEvent(
        'module_stay',
        {
          module: this.currentModule,
          type: type,
          stay_duration: stayDuration,
          enter_time: this.moduleStartTime,
          leave_time: now,
        },
        this.currentModule
      );
      this.addToQueue(event);
      this.lastModuleStayReportTime = now;
    }
  }

  /**
   * 从路径中提取type参数（子路由和hash）
   */
  private extractTypeFromPath(path: string): string[] {
    const type: string[] = [];

    try {
      // 如果是完整URL，直接解析
      let url: URL;
      if (path.startsWith('http://') || path.startsWith('https://')) {
        url = new URL(path);
      } else {
        // 如果是相对路径，使用当前域名或默认base URL
        const baseUrl =
          typeof window !== 'undefined'
            ? window.location.origin
            : 'https://compass.gitee.com/';
        url = new URL(path, baseUrl);
      }

      const pathSegments = url.pathname.split('/').filter(Boolean);

      // 获取最后一个路径段作为type
      if (pathSegments.length > 1) {
        type.push(pathSegments[pathSegments.length - 1]);
      }

      // 如果有hash，也加入type数组
      if (url.hash) {
        type.push(url.hash.substring(1)); // 去掉#号
      }
    } catch (error) {
      // 如果URL解析失败，降级到简单的字符串处理
      console.warn('Failed to parse URL, using fallback method:', error);
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 1) {
        type.push(segments[segments.length - 1]);
      }

      // 处理hash
      const hashIndex = path.indexOf('#');
      if (hashIndex !== -1) {
        type.push(path.substring(hashIndex + 1));
      }
    }

    return type;
  }

  /**
   * 上报模块访问
   */
  private reportModuleClick(module: string, type: string[]) {
    const event = this.createEvent(
      'module_visit',
      {
        module: module,
        type: type,
      },
      module,
      true // 需要添加 referrer 字段
    );
    this.addToQueue(event);
  }

  /**
   * 上报模块核心功能点击事件
   */
  public reportModuleAction(module: string, type: string, content?: any) {
    const event = this.createEvent(
      'module_click',
      {
        module,
        type,
        content,
      },
      module
    );
    this.addToQueue(event);
  }

  /**
   * 创建事件对象
   */
  private createEvent(
    eventType: string,
    data: Record<string, any>,
    moduleId?: string,
    includeReferrer?: boolean
  ): TrackingEvent {
    const deviceInfo = getDeviceInfo();
    const event: TrackingEvent = {
      event_type: eventType,
      timestamp: Date.now(),
      user_id: this.userId,
      page_path: this.currentPagePath,
      module_id: moduleId,
      device_user_agent: deviceInfo.userAgent,
      device_language: deviceInfo.language,
      device_timezone: deviceInfo.timezone,
      data,
    };

    // 只有 reportModuleClick 需要添加 referrer 字段
    if (includeReferrer && typeof document !== 'undefined') {
      event.referrer = document.referrer || '';
    }

    return event;
  }

  /**
   * 添加事件到队列
   */
  private addToQueue(event: TrackingEvent) {
    this.reportQueue.push(event);
    // 如果队列过长，立即上报
    if (this.reportQueue.length >= 10) {
      this.flushReports();
    }
  }

  /**
   * 批量上报事件
   */
  private async flushReports() {
    if (this.reportQueue.length === 0 || this.isReporting) return;

    this.isReporting = true;
    const eventsToReport = [...this.reportQueue];
    this.reportQueue = [];

    try {
      console.log(eventsToReport);
      await this.sendEvents(eventsToReport);
    } catch (error) {
      console.error('Failed to report tracking events:', error);
      // 失败的事件重新加入队列
      this.reportQueue.unshift(...eventsToReport);
    } finally {
      this.isReporting = false;
    }
  }

  /**
   * 发送事件到服务器
   */
  private async sendEvents(data: TrackingEvent[]) {
    const payload = { events: data };

    // 优先使用 sendBeacon API，确保页面卸载时数据能够发送
    if (navigator.sendBeacon) {
      const jsonData = JSON.stringify(payload);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const success = navigator.sendBeacon('/api/v2/trackEvent/save', blob);

      if (!success) {
        throw new Error('sendBeacon failed');
      }
    } else {
      // 降级到 fetch API
      const response = await fetch('/api/v2/trackEvent/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  }

  /**
   * 埋点事件上报函数
   */
  public trackEvent(config: ModuleActionConfig): void {
    if (typeof window === 'undefined') {
      return;
    }

    const deviceInfo = getDeviceInfo();
    const event: TrackingEvent = {
      event_type: 'module_click',
      timestamp: Date.now(),
      user_id: this.userId,
      page_path: this.currentPagePath || window.location.pathname,
      module_id: config.module,
      device_user_agent: deviceInfo.userAgent,
      device_language: deviceInfo.language,
      device_timezone: deviceInfo.timezone,
      data: config,
    };

    this.addToQueue(event);
  }

  /**
   * 销毁管理器
   */
  public destroy() {
    if (this.reportTimer) {
      clearInterval(this.reportTimer);
    }
    this.flushReports();
  }
}

export default TrackingManager;
