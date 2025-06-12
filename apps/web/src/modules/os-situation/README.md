# OS Situation Module - 国际化处理说明

## 概述

本模块已实现图表数据中国家名称的国际化处理。所有图表中的国家名称都会根据当前语言设置自动翻译。

## 实现方案

### 1. 国家名称映射

在 `utils/countryMapping.ts` 中定义了中文国家名称到国际化键值的映射关系：

```typescript
export const countryNameMapping: Record<string, string> = {
  美国: 'us',
  中国: 'china',
  欧盟: 'eu',
  印度: 'india',
  // ... 更多国家映射
};
```

### 2. 国际化翻译文件

在 `i18n/zh/os-situation.json` 和 `i18n/en/os-situation.json` 中添加了国家名称的翻译：

```json
{
  "countries": {
    "us": "美国", // 中文版本
    "china": "中国",
    "eu": "欧盟",
    "india": "印度"
    // ... 更多国家翻译
  }
}
```

```json
{
  "countries": {
    "us": "United States", // 英文版本
    "china": "China",
    "eu": "European Union",
    "india": "India"
    // ... 更多国家翻译
  }
}
```

### 3. 工具函数

提供了以下工具函数来处理国家名称的国际化：

- `getCountryKey(chineseName: string)`: 获取国家的国际化键值
- `getTranslatedCountryName(chineseName: string, t: Function)`: 获取翻译后的国家名称
- `translateChartCountryNames(data: Array, t: Function)`: 批量翻译图表数据中的国家名称
- `translateEChartsSeriesNames(series: Array, t: Function)`: 翻译 ECharts 系列数据中的国家名称

### 4. 已处理的组件

以下组件已实现国家名称国际化：

#### ChartsImportExport.tsx

- 处理进出口图表中的国家名称
- 包括柱状图、折线图和比例图的系列名称

#### ChartsLine.tsx

- 处理折线图中的国家名称
- 自动过滤和翻译系列数据中的国家名称

#### Dependency.tsx

- 处理依赖关系图中的国家名称
- 支持数组格式 `[from, to, weight]` 和对象格式 `{from, to, weight}` 的数据

## 使用方法

### 在新组件中使用

1. 导入工具函数：

```typescript
import { getTranslatedCountryName } from '../utils/countryMapping';
```

2. 使用国际化翻译：

```typescript
const { t } = useTranslation('os-situation');

// 翻译单个国家名称
const translatedName = getTranslatedCountryName('美国', t);

// 翻译图表系列数据
const translatedSeries = series.map((item) => ({
  ...item,
  name: getTranslatedCountryName(item.name, t),
}));
```

### 添加新的国家

1. 在 `utils/countryMapping.ts` 中添加映射关系
2. 在 `i18n/zh/os-situation.json` 和 `i18n/en/os-situation.json` 中添加翻译

## 注意事项

1. 确保使用 `useTranslation('os-situation')` 指定正确的命名空间
2. 对于特殊格式的国家名称（如 "中国(台湾地区除外)-Gitee"），已在映射中进行了处理
3. 如果找不到对应的映射关系，函数会返回原始名称，确保不会出现显示错误
4. 所有图表数据处理都在组件内部完成，不会影响原始数据源

## 扩展性

该方案具有良好的扩展性：

- 可以轻松添加新的语言支持
- 可以处理各种数据格式的图表
- 工具函数可以在其他模块中复用
