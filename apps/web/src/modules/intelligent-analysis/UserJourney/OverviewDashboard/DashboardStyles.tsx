import React from 'react';

const DashboardStyles: React.FC = () => (
  <style jsx global>{`
    .oj-page {
      // background: radial-gradient(
      //     circle at top left,
      //     rgba(37, 99, 235, 0.08),
      //     transparent 24%
      //   ),
      //   linear-gradient(180deg, #f6f8fc 0%, #eef3fb 100%);
      background: #eef3fb;
      min-height: 100%;
    }

    .detail-panel-body {
      width: 100%;
      padding: 20px 48px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .oj-section-title.ant-typography {
      margin: 0;
      font-size: 18px;
      line-height: 28px;
      font-weight: 800;
      color: #0f172a;
    }

    .section-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 24px;
      padding: 16px;
      box-shadow: 0 20px 48px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .overview-summary-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .overview-block {
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      padding: 16px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.05);
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-height: 120px;
    }

    .ov-title {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
      letter-spacing: 0.02em;
    }

    .ov-row {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 18px;
      align-items: center;
    }

    .ov-item {
      width: 100%;
      text-align: center;
      border: none;
      background: transparent;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
    }

    .ov-label {
      font-size: 12px;
      font-weight: 500;
      color: #64748b;
      line-height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .ov-value {
      font-size: 26px;
      font-weight: 600;
      color: #0f172a;
      line-height: 30px;
      font-variant-numeric: tabular-nums;
    }

    .ov-value-blue {
      color: #1677ff;
    }

    .ov-value-green {
      color: #00b42a;
    }

    .overview-bottom-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      padding: 0;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.05);
      min-height: 120px;
    }

    .bottom-metric {
      text-align: center;
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .bottom-metric:not(:last-child) {
      position: relative;
    }

    .bottom-metric:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 16px;
      bottom: 16px;
      width: 1px;
      background: rgba(226, 232, 240, 0.9);
    }

    .bm-label {
      font-size: 12px;
      font-weight: 500;
      color: #64748b;
      line-height: 18px;
    }

    .bm-value {
      display: inline-flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
      margin-top: 10px;
      font-size: 36px;
      font-weight: 700;
      color: #0f172a;
      font-variant-numeric: tabular-nums;
      line-height: 44px;
    }

    .bm-value-main {
      line-height: 44px;
    }

    .bm-value-suffix {
      font-size: 14px;
      font-weight: 600;
      color: #94a3b8;
      line-height: 20px;
    }

    .tab-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .overview-segmented {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.35);
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

    .overview-filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
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

    .overview-select-dropdown.ant-select-dropdown {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(148, 163, 184, 0.35);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);
    }

    .overview-common-checkbox {
      margin-left: 10px;
      color: #475569;
      font-size: 12px;
      font-weight: 600;
    }

    .overview-ant-table {
      margin-top: 12px;
    }

    .overview-ant-table .ant-table-container {
      border: 1px solid rgba(148, 163, 184, 0.35);
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.9);
    }

    .overview-ant-table .ant-table {
      background: transparent;
    }

    .overview-ant-table .ant-table-thead > tr > th {
      background: rgba(241, 245, 249, 0.8);
      color: #475569;
      font-size: 12px;
      font-weight: 600;
      padding: 10px 12px;
      white-space: nowrap;
      text-align: left;
    }

    .overview-ant-table .ant-table-tbody > tr > td {
      padding: 10px 12px;
      font-size: 13px;
      color: #0f172a;
      text-align: left;
    }

    .overview-ant-table .ant-table-summary td {
      background: rgba(241, 245, 249, 0.7);
      border-top: 1px solid rgba(148, 163, 184, 0.25);
      font-weight: 600;
      text-align: left;
    }

    .overview-ant-table .sortable-col {
      cursor: pointer;
      user-select: none;
      transition: background-color 140ms ease;
    }

    .overview-ant-table .sortable-col:hover {
      background: #eef1f6;
    }

    .sortable-col-title {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .overview-info-icon {
      color: #94a3b8;
      font-size: 12px;
      cursor: help;
      transition: color 0.2s ease;
    }

    .overview-info-icon:hover {
      color: #64748b;
    }

    .sort-arrow {
      font-size: 11px;
      color: #94a3b8;
    }

    .overview-ant-table .overview-table-link.ant-btn-link {
      padding: 0;
      height: auto;
      color: #1677ff;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .overview-ant-table .overview-table-link.ant-btn-link:hover {
      color: #0958d9;
      text-decoration: underline;
    }

    .overview-ant-table .overview-table-link.ant-btn-link:active {
      color: #003eb3;
    }

    .overview-ant-table .overview-table-link-muted.ant-btn-link {
      color: #94a3b8;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .overview-ant-table .overview-table-link-muted.ant-btn-link:hover {
      color: #94a3b8;
    }

    .overview-ant-table .overview-table-link-strong.ant-btn-link {
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

    @media (max-width: 1024px) {
      .detail-panel-body {
        padding: 16px;
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
