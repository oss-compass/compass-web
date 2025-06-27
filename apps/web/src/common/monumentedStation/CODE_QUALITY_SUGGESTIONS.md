# 代码质量和可维护性改进建议

## 当前代码状态

✅ **已修复的问题**

- 添加了缺失的 `init()` 方法到 `TrackingManager` 类
- 修复了 `TrackingEvent` 类型导入问题
- 移除了重复的导入语句

## 代码质量改进建议

### 1. 类型安全性增强

#### 1.1 添加严格的模块类型定义

```typescript
// 在 types.ts 中添加
export type ModuleName =
  | 'home'
  | 'analyze'
  | 'developer'
  | 'os-selection'
  | 'os-situation'
  | 'dataHub'
  | 'lab';

export type EventType =
  | 'page_stay'
  | 'module_visit'
  | 'module_stay'
  | 'module_click';
```

#### 1.2 为事件数据添加具体类型

```typescript
// 为不同事件类型定义具体的数据结构
export interface PageStayData {
  stay_duration: number;
  effective_stay_time?: number;
  enter_time: number;
  leave_time: number;
}

export interface ModuleStayData {
  module: ModuleName;
  stay_duration: number;
  enter_time: number;
  leave_time: number;
}

export interface ModuleClickData {
  module: ModuleName;
  type: string;
  content?: any;
}
```

### 2. 错误处理和日志改进

#### 2.1 添加结构化日志

```typescript
// 在 utils.ts 中添加
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Tracking] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[Tracking Error] ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[Tracking Warning] ${message}`, data);
  },
};
```

#### 2.2 改进错误重试机制

```typescript
// 在 TrackingManager 中添加
private maxRetries = 3;
private retryDelay = 1000;

private async sendEventsWithRetry(events: TrackingEvent[], retryCount = 0): Promise<void> {
  try {
    await this.sendEvents(events);
  } catch (error) {
    if (retryCount < this.maxRetries) {
      logger.warn(`Retry sending events (${retryCount + 1}/${this.maxRetries})`, { error });
      await new Promise(resolve => setTimeout(resolve, this.retryDelay * (retryCount + 1)));
      return this.sendEventsWithRetry(events, retryCount + 1);
    }
    throw error;
  }
}
```

### 3. 性能优化

#### 3.1 添加事件去重机制

```typescript
// 在 TrackingManager 中添加
private eventCache = new Set<string>();

private generateEventHash(event: TrackingEvent): string {
  return `${event.event_type}_${event.timestamp}_${event.page_path}_${JSON.stringify(event.data)}`;
}

private addToQueue(event: TrackingEvent) {
  const eventHash = this.generateEventHash(event);
  if (this.eventCache.has(eventHash)) {
    logger.warn('Duplicate event detected, skipping', { event });
    return;
  }

  this.eventCache.add(eventHash);
  this.reportQueue.push(event);

  // 清理过期的缓存
  if (this.eventCache.size > 1000) {
    this.eventCache.clear();
  }
}
```

#### 3.2 添加配置管理

```typescript
// 创建 config.ts 文件
export interface TrackingConfig {
  batchSize: number;
  batchInterval: number;
  maxRetries: number;
  retryDelay: number;
  enableDebugLog: boolean;
  apiEndpoint: string;
}

export const defaultConfig: TrackingConfig = {
  batchSize: 10,
  batchInterval: 30000,
  maxRetries: 3,
  retryDelay: 1000,
  enableDebugLog: process.env.NODE_ENV === 'development',
  apiEndpoint: '/api/v2/trackEvent/save',
};
```

### 4. 测试支持

#### 4.1 添加测试工具

```typescript
// 在 TrackingManager 中添加
public getTestingInterface() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Testing interface only available in test environment');
  }

  return {
    getQueueLength: () => this.reportQueue.length,
    clearQueue: () => { this.reportQueue = []; },
    getModuleVisitCounts: () => new Map(this.moduleVisitCounts),
    getCurrentModule: () => this.currentModule,
    getCurrentPagePath: () => this.currentPagePath
  };
}
```

#### 4.2 Mock 支持

```typescript
// 在 utils.ts 中添加
export const createMockTrackingManager = () => {
  return {
    init: jest.fn(),
    setUserId: jest.fn(),
    onRouteChange: jest.fn(),
    reportModuleAction: jest.fn(),
    destroy: jest.fn(),
  };
};
```

### 5. 数据验证

#### 5.1 添加事件数据验证

```typescript
// 在 utils.ts 中添加
export const validateTrackingEvent = (event: TrackingEvent): boolean => {
  const requiredFields = [
    'event_type',
    'timestamp',
    'page_path',
    'device_userAgent',
  ];

  for (const field of requiredFields) {
    if (!event[field as keyof TrackingEvent]) {
      logger.error(`Missing required field: ${field}`, event);
      return false;
    }
  }

  if (event.timestamp <= 0) {
    logger.error('Invalid timestamp', event);
    return false;
  }

  return true;
};
```

### 6. 内存管理

#### 6.1 添加内存清理机制

```typescript
// 在 TrackingManager 中添加
private cleanupTimer?: NodeJS.Timeout;

private startCleanupTimer() {
  this.cleanupTimer = setInterval(() => {
    // 清理过期的模块访问计数
    if (this.moduleVisitCounts.size > 50) {
      this.moduleVisitCounts.clear();
    }

    // 清理事件缓存
    if (this.eventCache.size > 1000) {
      this.eventCache.clear();
    }
  }, 300000); // 每5分钟清理一次
}

public destroy() {
  if (this.reportTimer) {
    clearInterval(this.reportTimer);
  }
  if (this.cleanupTimer) {
    clearInterval(this.cleanupTimer);
  }
  this.flushReports();
}
```

### 7. 用户隐私保护

#### 7.1 添加数据脱敏

```typescript
// 在 utils.ts 中添加
export const sanitizeUserData = (data: any): any => {
  if (typeof data === 'string') {
    // 移除可能的敏感信息
    return data
      .replace(
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        '[EMAIL]'
      )
      .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]');
  }

  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeUserData(value);
    }
    return sanitized;
  }

  return data;
};
```

### 8. 文档和注释改进

#### 8.1 添加 JSDoc 注释

````typescript
/**
 * 埋点管理器 - 负责统一管理所有埋点事件的收集和上报
 *
 * @example
 * ```typescript
 * const tracker = TrackingManager.getInstance();
 * tracker.init();
 * tracker.setUserId('user123');
 * tracker.reportModuleAction('os-selection', 'search', { query: 'react' });
 * ```
 */
class TrackingManager {
  /**
   * 获取埋点管理器单例实例
   * @returns {TrackingManager} 埋点管理器实例
   */
  public static getInstance(): TrackingManager {
    // ...
  }
}
````

## 实施优先级

### 高优先级 (立即实施)

1. ✅ 修复 TypeScript 类型错误
2. 添加结构化日志
3. 改进错误处理
4. 添加数据验证

### 中优先级 (下个迭代)

1. 添加配置管理
2. 实施性能优化
3. 添加内存管理
4. 完善类型定义

### 低优先级 (长期规划)

1. 添加测试支持
2. 实施数据脱敏
3. 完善文档
4. 添加监控和告警

## 代码审查检查清单

- [ ] 所有公共方法都有 JSDoc 注释
- [ ] 错误处理覆盖所有异步操作
- [ ] 类型定义完整且严格
- [ ] 性能敏感的操作有优化
- [ ] 内存泄漏风险已评估
- [ ] 用户隐私保护措施到位
- [ ] 测试覆盖率达到要求
- [ ] 文档更新及时
