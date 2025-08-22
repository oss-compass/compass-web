# DataView 目录结构

本目录包含智能分析模块的主要数据展示组件。

## 📁 目录结构

```
DataView/
├── Overview/                    # 总览相关组件
│   ├── index.tsx               # 总览页面 (原 Overview.tsx)
│   ├── Main.tsx                # 项目列表页面
│   ├── DetailPage/             # 详情页面组件
│   │   ├── index.tsx           # 详情页面主组件
│   │   ├── EcoCharts.tsx       # 生态图表组件
│   │   └── ParticipantDetails.tsx # 参与者详情组件
│   ├── DeveloperRegionChart.tsx # 开发者地区图表
│   ├── types.ts                # 类型定义
│   └── utils.ts                # 数据获取工具函数
├── SubmitProject.tsx           # 提交项目页面
├── MySubmissions.tsx           # 我的提交页面
└── README.md                   # 本文档
```

## 🔄 路由映射

| 路由                                       | 组件                 | 说明         |
| ------------------------------------------ | -------------------- | ------------ |
| `/intelligent-analysis/overview`           | `Overview/index.tsx` | 总览页面     |
| `/intelligent-analysis/overview/[project]` | `Overview/Main.tsx`  | 项目详情页面 |
| `/intelligent-analysis/submit-project`     | `SubmitProject.tsx`  | 提交项目页面 |
| `/intelligent-analysis/my-submissions`     | `MySubmissions.tsx`  | 我的提交页面 |

## 📦 组件说明

### Overview 模块

- **index.tsx**: 智能分析总览页面，展示所有可分析的项目
- **Main.tsx**: 项目列表页面，显示项目的贡献者和组织
- **DetailPage/**: 详情页面相关组件
  - **index.tsx**: 开发者/组织详情页面
  - **EcoCharts.tsx**: 生态得分图表组件
  - **ParticipantDetails.tsx**: 参与者详情表格组件
- **DeveloperRegionChart.tsx**: 开发者地区分布图表
- **types.ts**: TypeScript 类型定义
- **utils.ts**: 数据获取和处理工具函数

## 🗂️ 支持的项目

目前支持以下项目的智能分析：

| 项目名称     | Slug           | 数据来源                                              |
| ------------ | -------------- | ----------------------------------------------------- |
| Flutter      | `flutter`      | `/test/intelligent-analysis-new/Flutter_backup.json`  |
| Ionic        | `ionic`        | `/test/intelligent-analysis-new/Ionic_backup.json`    |
| React Native | `react-native` | `/test/intelligent-analysis-new/RN_backup.json`       |
| CEF          | `cef`          | `/test/intelligent-analysis-new/CEF_backup.json`      |
| Electron     | `electron`     | `/test/intelligent-analysis-new/Electron_backup.json` |
| Chromium     | `chromium`     | `/test/intelligent-analysis-new/Chromium_backup.json` |
| KMP OH       | `kmp-oh`       | `/test/intelligent-analysis-new/KMP_OH_backup.json`   |

## 📊 数据获取方式

系统使用动态 fetch 方式获取项目数据：

````tsx
import { fetchProjectData, getProjectDisplayName, processRawData } from './utils';

// 获取项目数据
const rawData = await fetchProjectData('flutter'); // 使用backup数据
const detailData = await fetchProjectData('flutter', true); // 使用detail数据

// 处理数据
const processedData = processRawData(rawData, 'Flutter');

### 独立页面

- **SubmitProject.tsx**: 项目提交表单页面
- **MySubmissions.tsx**: 用户提交历史页面

## 🎯 使用示例

```tsx
// 在页面文件中使用
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import Overview from '@modules/intelligent-analysis/DataView/Overview';
import Main from '@modules/intelligent-analysis/DataView/Overview/Main';
import SubmitProject from '@modules/intelligent-analysis/DataView/SubmitProject';

// 总览页面
<IntelligentAnalysisLayout>
  <Overview />
</IntelligentAnalysisLayout>

// 项目页面
<IntelligentAnalysisLayout>
  <Main projectType="flutter" />
</IntelligentAnalysisLayout>

// 提交项目页面
<IntelligentAnalysisLayout>
  <SubmitProject />
</IntelligentAnalysisLayout>
````

## 🔧 重构说明

此目录结构是从之前的 hash 路由系统重构而来：

1. **分离关注点**: 将 overview 相关的复杂组件封装到独立文件夹
2. **简化导入**: 减少跨文件夹的复杂导入关系
3. **提高可维护性**: 清晰的文件组织结构便于维护和扩展
4. **类型集中管理**: 通过 types.ts 文件统一管理类型定义
