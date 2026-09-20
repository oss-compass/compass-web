# 社区总览配色约定

社区入门和社区贡献总览（包括图表、标签、表格、弹窗）统一从 `theme.ts` 取色。

- `OVERVIEW_COLORS`：基础色、背景、文字、边框及浅色阶。
- `OVERVIEW_TONES`：主色、成功、警告、危险、中性色的文字／浅底／边框／实心色组合。
- `OVERVIEW_STATUS_COLORS`：待处理用橙色，进行中用蓝色，已闭环用绿色，无需修复用灰色。
- `OVERVIEW_BENCHMARK_COLORS`：本仓用蓝色、对标仓用灰蓝色；领先／持平／落后用绿／灰／红。
- `OVERVIEW_CATEGORY_COLORS`：多系列图表仅使用蓝灰色阶，配合名称、数值、tooltip 区分类别。
- `OVERVIEW_ANT_THEME`：Ant Design 控件和 portal 弹窗的主题。

`constants.ts` 将优先级及细分处理状态映射到上述语义色。优先级文字沿用社区入门原色：P0 红、P1 橙、P2 蓝、P3 灰、P4 绿；闭环进展柱沿用原有橙／蓝／绿，由 `OVERVIEW_STATUS_COLORS` 统一提供。阶段内的处理状态通过文字区分，不再为每个状态引入一个新色相。问题分类标签统一使用浅灰底。

`scoreVisuals.ts` 只定义评分区间，颜色引用 `theme.ts`。评分分档的图例和柱体应始终对应同一分档，不修改区间或业务统计口径。

`DashboardStyles` 发布 `--overview-*` CSS 变量，CSS、SVG 和 Tailwind 任意值类共享同一色板。需要透明度时使用 `rgba(var(--overview-blue-rgb),0.1)`；当前 Tailwind 版本不支持 `bg-[var(--overview-blue)]/10`。

新增模块请使用共享语义配置或 CSS 变量，不在组件中添加独立 HEX/RGB 色值。成功／危险色只表示结果和风险；普通交互使用蓝色。
