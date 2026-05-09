import React from 'react';

const DashboardStyles: React.FC = () => (
  <style jsx global>{`
    .oj-page {
      background: #f8fafb;
      min-height: 100%;
    }

    .detail-panel-body {
      max-width: 1150px;
      margin: 0 auto;
      padding: 24px 28px 40px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .section-title {
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #1a202c;
    }

    .section-title::before {
      content: '';
      width: 4px;
      height: 20px;
      border-radius: 3px;
      background: linear-gradient(135deg, #4f7dff, #6366f1);
    }

    .section-card {
      background: #fff;
      border-radius: 14px;
      padding: 22px 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      border: 1px solid #eef1f6;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .overview-block {
      background: #f9fafb;
      border-radius: 10px;
      padding: 16px;
    }

    .ov-title {
      font-size: 11px;
      font-weight: 600;
      color: #8899a6;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .ov-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      text-align: center;
    }

    button.ov-item {
      width: 100%;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
    }

    .ov-item.ov-no-click {
      cursor: default;
    }

    .ov-label {
      font-size: 10px;
      color: #8899a6;
    }

    .ov-value {
      font-size: 20px;
      font-weight: 700;
      color: #1a202c;
    }

    .pending-color {
      color: #f97316 !important;
    }

    .in-progress-color {
      color: #f59e0b !important;
    }

    .resolved-color {
      color: #10b981 !important;
    }

    .rate-color {
      color: #0d9488 !important;
    }

    .overview-bottom-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid #eef1f6;
    }

    .bottom-metric {
      text-align: center;
    }

    .bm-label {
      font-size: 12px;
      color: #8899a6;
    }

    .bm-value {
      font-size: 22px;
      font-weight: 700;
    }

    .score-high {
      color: #10b981 !important;
    }

    .score-mid {
      color: #f59e0b !important;
    }

    .rate-high {
      color: #10b981 !important;
    }

    .rate-mid {
      color: #f59e0b !important;
    }

    .tab-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .overview-segmented {
      background: #f5f7fa;
      border: 1px solid #e8ecf1;
      padding: 3px;
      border-radius: 10px;
    }

    .overview-segmented .ant-segmented-item {
      min-height: 30px;
      border-radius: 8px;
      color: #5a6872;
      font-size: 12px;
      font-weight: 600;
    }

    .overview-segmented .ant-segmented-item-selected {
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
      color: #1677ff;
    }

    .team-filter {
      margin-left: auto;
    }

    .overview-select {
      width: 160px;
    }

    .overview-select .ant-select-selector {
      border-radius: 10px !important;
      border-color: #d9e0ea !important;
      box-shadow: none !important;
      min-height: 34px;
      font-size: 12px;
    }

    .overview-select.ant-select-focused .ant-select-selector,
    .overview-select:hover .ant-select-selector {
      border-color: #91caff !important;
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid #eef1f6;
      border-radius: 10px;
      margin-top: 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      background: #fff;
    }

    th {
      background: #f8fafc;
      padding: 10px 8px;
      font-weight: 600;
      color: #5a6872;
      font-size: 11px;
      text-transform: uppercase;
      border-bottom: 2px solid #e8ecf1;
      white-space: nowrap;
      text-align: center;
    }

    th.sortable {
      cursor: pointer;
      user-select: none;
    }

    th.sortable:hover {
      background: #eef1f6;
    }

    th .sort-arrow {
      margin-left: 4px;
      font-size: 10px;
    }

    td {
      padding: 8px 8px;
      text-align: center;
      border-bottom: 1px solid #f2f4f7;
    }

    tr:hover {
      background: #fafbfc;
    }

    tfoot td {
      background: #f8fafc;
      border-bottom: none;
      border-top: 1px solid #e8ecf1;
    }

    .clickable-count {
      cursor: pointer;
      color: #4f7dff;
      font-weight: 600;
      text-decoration: underline;
    }

    .detail-arrow {
      cursor: pointer;
      color: #4f7dff;
    }

    .na-cell {
      color: #b0b7c3;
    }

    .total-deep {
      color: #1a202c;
      font-weight: 700;
    }

    .row-num {
      color: #8899a6;
      font-weight: 500;
    }

    .overview-ant-tag {
      margin-inline-end: 0;
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 11px;
      line-height: 18px;
      font-weight: 600;
    }

    .nowrap-tag {
      white-space: nowrap;
      word-break: keep-all;
    }

    .nowrap-col {
      white-space: nowrap;
    }

    .common-issues-table .severity-col,
    .common-issues-table .status-col {
      width: 112px;
      min-width: 112px;
    }

    @media (max-width: 1024px) {
      .detail-panel-body {
        padding: 20px 18px 32px;
      }

      .overview-grid {
        grid-template-columns: 1fr;
      }

      .team-filter {
        margin-left: 0;
      }
    }
  `}</style>
);

export default DashboardStyles;
