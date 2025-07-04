# 前端埋点系统使用说明

## 概述

本埋点系统用于记录用户在 compass-web 应用中的行为数据，包括页面停留时长、模块访问量、模块停留时长和核心功能点击事件。

## 功能特性

### 1. 页面总停留时长 (`page_stay`)

- 自动记录用户从打开页面到离开页面的总时长
- 支持页面可见性检测，排除非活跃时间
- 在用户离开页面时自动上报数据

### 2. 模块停留时长 (`module_stay`)

- 记录用户在各个模块的停留时长
- 支持子路由时长累加（如 `/os-situation` 到 `/os-situation/metrics/push`）
- 模块包括：首页、analyze、developer、os-selection、os-situation、dataHub、lab

### 3. 模块点击量 (`module_visit`)

- 记录用户进入模块的次数
- 每次路由变化到模块时触发一次记录

### 4. 模块核心功能点击事件 (`module_click`)

- 记录用户点击重要按钮或交互元素的行为
- 通过 `TrackingWrapper` 组件包装实现

## 使用方法

### 自动埋点

系统已在 `_app.tsx` 中自动初始化，无需额外配置：

```typescript
// 在 _app.tsx 中已自动集成
import { TrackingManager, useRouteTracking } from '@common/monumentedStation';

// 自动初始化路由追踪
useRouteTracking();

// 自动初始化埋点管理器
const trackingManager = TrackingManager.getInstance();
trackingManager.init();
```

### 用户 ID 自动获取

系统会自动获取用户 ID 并设置到埋点管理器中：

```typescript
// 在 _app.tsx 中已自动集成
import { useUserTracking, useRouteTracking } from '@common/monumentedStation';

function MyApp() {
  // 必须在路由追踪之前初始化用户信息
  useUserTracking();
  useRouteTracking();

  return <Component />;
}
```

**功能说明：**

- 自动从 `useUserInfo` 获取当前用户信息
- 自动设置用户 ID 到埋点管理器
- 确保首次路由变化时的 `module_visit` 事件包含用户 ID
- 用户登出时自动清除用户 ID
- 所有埋点事件的 `user_id` 字段会自动填充

**重要提示：**

- `useUserTracking()` 必须在 `useRouteTracking()` 之前调用
- 系统会等待用户信息加载完成后再触发首次路由埋点
- 这样确保了首次进入页面的 `module_visit` 事件包含正确的用户 ID

### 手动埋点 - 核心功能点击

使用 `TrackingWrapper` 组件包装需要埋点的元素：

### 1. 基础用法（点击即上报）

```tsx
import { TrackingWrapper } from '@common/monumentedStation';

// 包装按钮 - 点击即上报
<TrackingWrapper
  module="module-name"
  type="button-click"
  content={{ buttonText: 'Submit' }}
  disabled={false}
>
  <button onClick={handleClick}>Submit</button>
</TrackingWrapper>;
```

### 2. 高级用法（表单校验后上报）

```tsx
import { TrackingWrapper } from '@common/monumentedStation';

// 表单校验函数
const validateForm = () => {
  if (!formData.name.trim()) {
    setError('姓名不能为空');
    return false;
  }
  if (!formData.email.trim()) {
    setError('邮箱不能为空');
    return false;
  }
  return true;
};

// 校验失败处理
const handleValidationFailed = () => {
  console.log('表单校验失败，不上报埋点');
};

// 包装按钮 - 表单校验通过后才上报
<TrackingWrapper
  module="form-module"
  type="form-submit"
  content={{ formData }}
  validate={validateForm}
  onValidationFailed={handleValidationFailed}
>
  <button onClick={handleSubmit}>提交表单</button>
</TrackingWrapper>;
```

### 3. 异步校验

```tsx
// 异步校验函数
const validateAsync = async () => {
  try {
    const result = await api.validateData(formData);
    return result.isValid;
  } catch (error) {
    console.error('校验失败:', error);
    return false;
  }
};

<TrackingWrapper
  module="async-module"
  type="async-submit"
  content={{ data }}
  validate={validateAsync}
>
  <button onClick={handleAsyncSubmit}>异步提交</button>
</TrackingWrapper>;
```

### 4. 参数说明

- `validate`: 可选的校验函数，支持同步和异步校验
- `onValidationFailed`: 校验失败时的回调函数
- 其他参数保持不变（module、type、content、disabled 等）

### 使用 Hook

#### 1. 模块行为埋点

```typescript
import { useModuleAction } from '@common/monumentedStation';

const { reportAction } = useModuleAction();

// 手动上报事件
reportAction({
  module: 'os-selection',
  type: 'custom_action',
  content: { key: 'value' },
});
```

#### 2. 页面停留时长

```typescript
import { usePageStayTracking } from '@common/monumentedStation';

const { getStayDuration } = usePageStayTracking();

// 获取当前停留时长
const duration = getStayDuration();
```

## 数据格式

### TrackingEvent 接口

```typescript
interface TrackingEvent {
  event_type: string; // 事件类型：page_stay, module_visit, module_stay, module_click
  timestamp: number; // 时间戳
  user_id?: string; // 用户ID（可选）
  page_path: string; // 页面路径
  module_id?: string; // 模块ID（可选）
  device_userAgent: string; // 用户代理
  device_language: string; // 语言
  device_timezone: string; // 时区
  data: Record<string, any>; // 具体数据
}
```

### 事件类型说明

#### 1. page_stay

```typescript
{
  event_type: 'page_stay',
  data: {
    stay_duration: 45000,        // 总停留时长(ms)
    effective_stay_time: 42000,  // 有效停留时长(ms)
    enter_time: 1703123411789,   // 进入时间
    leave_time: 1703123456789,   // 离开时间
  }
}
```

#### 2. module_visit

```typescript
{
  event_type: 'module_visit',
  module_id: 'os-situation',
  data: {
    module: 'os-situation',
    type: 'enter'
  }
}
```

#### 3. module_stay

```typescript
{
  event_type: 'module_stay',
  module_id: 'os-situation',
  data: {
    module: 'os-situation',
    stay_duration: 30000,        // 停留时长(ms)
    enter_time: 1703123411789,
    leave_time: 1703123441789
  }
}
```

#### 4. module_click

```typescript
{
  event_type: 'module_click',
  module_id: 'os-selection',
  data: {
    module: 'os-selection',
    type: 'recommendation_section_search',
    content: {
      description: '用户输入的搜索内容',
      selectedLanguages: ['javascript', 'python']
    }
  }
}
```

## 配置选项

### TrackingManager 配置

```typescript
const trackingManager = TrackingManager.getInstance();

// 设置批量上报间隔（默认 30 秒）
trackingManager.setBatchInterval(30000);

// 设置最大批量大小（默认 50）
trackingManager.setMaxBatchSize(50);

// 手动触发上报
trackingManager.flushEvents();
```

## 注意事项

1. **性能优化**：系统使用批量上报机制，避免频繁的网络请求
2. **数据隐私**：不会收集敏感用户信息，仅记录行为数据
3. **错误处理**：网络错误时会自动重试，确保数据不丢失
4. **浏览器兼容性**：支持现代浏览器，使用 `sendBeacon` API 确保页面卸载时数据能够发送

## API 接口

数据上报接口：`POST /api/v2/trackEvent/save`

请求体格式：

```typescript
{
  events: TrackingEvent[]  // 事件数组
}
```

## 示例项目集成

查看 `os-selection` 模块的 `RecommendationSection` 组件，了解完整的集成示例。
