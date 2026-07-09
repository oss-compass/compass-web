import React from 'react';

type DashboardStylesProps = {
  captureMode?: boolean;
};

const DashboardStyles: React.FC<DashboardStylesProps> = ({
  captureMode = false,
}) => (
  <style jsx global>{`
    ${captureMode
      ? `
    .oj-page *,
    .oj-page *::before,
    .oj-page *::after {
      animation: none !important;
      transition: none !important;
    }

    .oj-page {
      background: #ffffff !important;
      zoom: 1.35;
    }

    .detail-panel-body {
      padding: 18px 22px !important;
      gap: 14px !important;
    }

    .overview-summary-actions,
    .team-filter,
    .oj-dashboard-top-actions,
    .oj-trend-range-trigger,
    .overview-select-dropdown,
    .overview-info-icon,
    .oj-qa-expand-icon {
      display: none !important;
    }

    .oj-section-title.ant-typography {
      margin: 0 0 8px 0 !important;
      font-size: 26px !important;
      line-height: 34px !important;
      font-weight: 900 !important;
    }

    .section-card {
      padding: 16px !important;
      border-radius: 22px !important;
      box-shadow: none !important;
      border-color: #dbe4f0 !important;
      background: #ffffff !important;
    }

    .overview-bottom-row {
      min-height: 108px !important;
    }

    .bottom-metric {
      padding: 12px 12px !important;
    }

    .bottom-metric:not(:last-child)::after {
      top: 10px !important;
      bottom: 10px !important;
    }

    .bm-label {
      font-size: 13px !important;
      line-height: 18px !important;
      font-weight: 700 !important;
    }

    .bm-value {
      margin-top: 6px !important;
      font-size: 34px !important;
      line-height: 40px !important;
      font-weight: 800 !important;
    }

    .bm-value-main {
      line-height: 40px !important;
    }

    .bm-value-suffix {
      font-size: 13px !important;
      line-height: 18px !important;
      align-self: flex-end !important;
      padding-bottom: 4px !important;
    }

    .overview-summary-stack {
      gap: 10px !important;
    }

    .overview-grid,
    .overview-insight-grid {
      gap: 14px !important;
    }

    .overview-grid {
      grid-template-columns: 1fr !important;
      height: auto !important;
    }

    .overview-insight-grid {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
      gap: 16px !important;
      height: auto !important;
      align-items: stretch !important;
    }

    .overview-block,
    .ov-panel {
      border-radius: 24px !important;
      padding: 16px !important;
      box-shadow: none !important;
    }

    .ov-title,
    .ov-panel-title {
      font-size: 22px !important;
      line-height: 30px !important;
      font-weight: 800 !important;
    }

    .ov-item {
      min-height: 82px !important;
      padding: 10px 12px 10px !important;
    }

    .ov-label,
    .overview-progress-meta,
    .overview-progress-text,
    .overview-select-label {
      font-size: 15px !important;
      line-height: 22px !important;
      font-weight: 600 !important;
    }

    .ov-value {
      font-size: 34px !important;
      line-height: 40px !important;
      font-weight: 800 !important;
    }

    .tab-bar {
      margin-bottom: 18px !important;
    }

    .overview-segmented {
      transform: scale(1.08);
      transform-origin: left center;
    }

    .overview-insight-grid .ov-priority-bar-box {
      width: 100% !important;
    }

    .overview-insight-grid .ov-priority-bar-box .overview-progress-bar {
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
    }

    .ov-priority-meta-box,
    .ov-priority-stats {
      gap: 6px !important;
    }

    .overview-insight-grid .ov-panel {
      padding: 16px !important;
      border-radius: 20px !important;
      height: 100% !important;
    }

    .overview-insight-grid .ov-panel-head {
      margin-bottom: 10px !important;
    }

    .overview-insight-grid .ov-panel-title {
      font-size: 18px !important;
      line-height: 24px !important;
    }

    .overview-insight-grid .ov-priority-list,
    .overview-insight-grid .ov-ci-list {
      gap: 8px !important;
    }

    .overview-insight-grid .ov-priority-row {
      grid-template-columns: minmax(0, 1fr) 290px !important;
      gap: 14px !important;
      padding: 0 10px !important;
      min-height: 58px !important;
      height: 58px !important;
      max-height: 58px !important;
    }

    .overview-insight-grid .ov-priority-side {
      width: 290px !important;
      flex-basis: 290px !important;
      gap: 6px !important;
    }

    .overview-insight-grid .ov-ci-row {
      min-height: 58px !important;
      height: 58px !important;
      max-height: 58px !important;
      padding: 12px 10px !important;
    }

    .overview-insight-grid .oj-trend-legend {
      margin-top: 8px !important;
    }

    .oj-trend-axis,
    .oj-trend-axis-y,
    .oj-trend-axis-title,
    .oj-trend-axis-title-y,
    .oj-trend-val,
    .oj-trend-legend,
    .oj-trend-tooltip,
    .ov-ci-type,
    .ov-ci-desc,
    .ov-ci-repo,
    .ov-ci-meta,
    .ov-ci-status,
    .ov-ci-sev,
    .ov-priority-header,
    .ov-priority-total,
    .ov-priority-rate {
      font-size: 11px !important;
      line-height: 18px !important;
      font-weight: 500 !important;
    }

    .ov-ci-row,
    .ov-priority-row {
      min-height: 64px !important;
      height: 64px !important;
      max-height: 64px !important;
    }

    .ov-priority-progress {
      height: 10px !important;
    }

    .overview-insight-grid .ov-priority-meta-box {
      flex-wrap: nowrap !important;
    }

    .overview-insight-grid .overview-progress-meta {
      flex-wrap: nowrap !important;
      white-space: nowrap !important;
      gap: 6px !important;
      font-size: 11px !important;
      line-height: 16px !important;
    }

    .overview-insight-grid .overview-progress-link,
    .overview-insight-grid .overview-progress-text {
      white-space: nowrap !important;
    }

    .overview-ant-table .overview-progress-meta {
      gap: 6px !important;
      font-size: 11px !important;
      line-height: 16px !important;
    }

    .overview-ant-table .overview-progress-link,
    .overview-ant-table .overview-progress-text {
      font-size: 11px !important;
      line-height: 16px !important;
      font-weight: 400 !important;
    }

    .oj-trend-axis {
      font-size: 10.5px !important;
    }

    .oj-trend-axis-y {
      font-size: 9.5px !important;
    }

    .oj-trend-axis-title {
      font-size: 10px !important;
    }

    .oj-trend-axis-title-y {
      font-size: 9px !important;
    }

    .oj-trend-val {
      font-size: 9.5px !important;
    }

    .oj-trend-legend {
      font-size: 11.5px !important;
    }

    .oj-trend-tooltip {
      font-size: 12px !important;
    }

    .ov-ci-type {
      font-size: 11px !important;
    }

    .ov-ci-desc {
      font-size: 13.5px !important;
      line-height: 1.4 !important;
    }

    .ov-ci-repo,
    .ov-ci-meta,
    .ov-ci-status,
    .ov-ci-sev {
      font-size: 12px !important;
      line-height: 18px !important;
      font-weight: 600 !important;
    }

    .oj-qa-section,
    .overview-common-issues-section {
      display: none !important;
    }
    `
      : ''}
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
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .oj-dashboard-top-actions {
      position: fixed;
      top: 12px;
      right: 32px;
      z-index: 30;
      display: flex;
      justify-content: flex-end;
      pointer-events: none;
    }

    .oj-dashboard-top-actions > * {
      pointer-events: auto;
    }

    .oj-qa-section {
      padding: 0;
      overflow: hidden;
    }

    .oj-qa-question-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 20px;
      cursor: pointer;
      user-select: none;
      transition: background 0.18s ease;
      border-radius: 24px;
    }

    .oj-qa-question-row:hover {
      background: rgba(248, 250, 252, 0.9);
    }

    .oj-qa-q-label {
      flex: 0 0 auto;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.02em;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
    }

    .oj-qa-question {
      flex: 1 1 0;
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      line-height: 22px;
    }

    .oj-qa-expand-icon {
      flex: 0 0 auto;
      font-size: 12px;
      color: #94a3b8;
      transition: transform 0.22s ease, color 0.18s ease;
    }

    .oj-qa-expand-icon.is-expanded {
      transform: rotate(90deg);
      color: #3b82f6;
    }

    .oj-qa-answer {
      border-top: 1px solid rgba(226, 232, 240, 0.9);
      padding: 16px 20px 20px;
      animation: qaAnswerFadeIn 0.22s ease both;
    }

    .oj-qa-a-label-row {
      display: flex;
      align-items: center;
      margin-left: 22px;
      gap: 10px;
      margin-bottom: 16px;
    }

    .oj-qa-a-label {
      flex: 0 0 auto;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.02em;
      box-shadow: 0 4px 10px rgba(5, 150, 105, 0.22);
    }

    .oj-qa-answer-body {
      padding-left: 36px;
    }

    @keyframes qaAnswerFadeIn {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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

    .overview-summary-title-row {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .oj-summary-mode-toggle.ant-segmented {
      height: 34px;
      padding: 2px;
      border-radius: 16px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
    }

    .oj-summary-mode-toggle .ant-segmented-item {
      padding: 0 12px;
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
    }

    .oj-summary-mode-toggle .ant-segmented-item-selected {
      color: #0f172a;
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
      border-radius: 12px;
      position: relative;
      z-index: 1;
    }

    .oj-summary-mode-toggle .ant-segmented-thumb {
      background: #ffffff !important;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
      border-radius: 12px;
    }

    .overview-summary-switch {
      display: inline-flex;
      align-items: center;
      flex: 0 0 auto;
    }

    .overview-summary-actions {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: flex-end;
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
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(248, 251, 255, 0.96) 100%
      );
      border-radius: 20px;
      padding: 18px;
      border: 1px solid rgba(226, 232, 240, 0.95);
      box-shadow: 0 16px 40px rgba(15, 23, 42, 0.07);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 120px;
      overflow: hidden;
    }

    .ov-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.01em;
    }

    .ov-row {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
      align-items: stretch;
    }

    .overview-insight-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      align-items: stretch;
      height: 350px;
    }

    .ov-panel {
      border-radius: 18px;
      border: 1px solid rgba(226, 232, 240, 0.92);
      background: rgba(255, 255, 255, 0.9);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
      padding: 14px 14px 12px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .ov-priority-panel {
      background: rgba(255, 255, 255, 0.9);
    }

    .ov-trend-panel {
      background: rgba(255, 255, 255, 0.9);
    }

    .oj-trend-skeleton {
      flex: 1 1 auto;
      min-height: 230px;
      display: flex;
      align-items: center;
      padding: 8px 14px 12px;
    }

    .oj-trend-skeleton .ant-skeleton {
      width: 100%;
    }

    .oj-trend-skeleton .ant-skeleton-paragraph {
      margin-block-start: 0 !important;
    }

    .ov-panel-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .ov-panel-title {
      font-size: 15px;
      line-height: 22px;
      font-weight: 700;
      color: #0f172a;
    }

    .oj-trend-range-trigger {
      height: 30px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 10px;
      border-radius: 14px;
      border: 1px solid rgba(226, 232, 240, 0.95);
      background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
      font-size: 12px;
      font-weight: 700;
      color: #334155;
      cursor: pointer;
      user-select: none;
      transition: background 0.18s ease, border-color 0.18s ease,
        box-shadow 0.18s ease;
    }

    .oj-trend-range-trigger:hover {
      border-color: rgba(148, 163, 184, 0.9);
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
    }

    .oj-trend-range-icon {
      color: #3b82f6;
      font-size: 14px;
    }

    .oj-trend-range-label {
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .oj-trend-range-caret {
      font-size: 10px;
      color: #94a3b8;
      margin-left: 2px;
    }

    .oj-trend-range-popover .ant-popover-inner {
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
      background: rgba(255, 255, 255, 0.96);
    }

    .oj-trend-range-panel {
      width: 332px;
      padding: 12px 12px 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .oj-trend-range-presets {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .oj-trend-range-option {
      height: 32px;
      border-radius: 12px;
      border: 1px solid rgba(226, 232, 240, 0.92);
      background: rgba(248, 250, 252, 0.9);
      padding: 0 10px;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
      font-weight: 800;
      color: #475569;
      cursor: pointer;
      transition: border-color 0.18s ease, background 0.18s ease,
        box-shadow 0.18s ease;
    }

    .oj-trend-range-option:hover {
      border-color: rgba(148, 163, 184, 0.9);
      background: rgba(241, 245, 249, 0.96);
    }

    .oj-trend-range-option.is-active {
      border-color: rgba(59, 130, 246, 0.55);
      background: rgba(59, 130, 246, 0.12);
      color: #0f172a;
      box-shadow: 0 10px 18px rgba(59, 130, 246, 0.14);
    }

    .oj-trend-range-check {
      color: #2563eb;
      font-size: 12px;
    }

    .oj-trend-range-custom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-top: 2px;
    }

    .oj-trend-range-picker {
      flex: 1 1 auto;
      min-width: 0;
    }

    .oj-trend-range-confirm {
      flex: 0 0 auto;
      height: 28px;
      padding: 0 10px;
      border-radius: 10px;
      border: 1px solid rgba(59, 130, 246, 0.5);
      background: rgba(59, 130, 246, 0.1);
      color: #1d4ed8;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
      transition: background 0.18s ease, border-color 0.18s ease,
        box-shadow 0.18s ease;
      white-space: nowrap;
    }

    .oj-trend-range-confirm:hover {
      border-color: rgba(37, 99, 235, 0.75);
      background: rgba(37, 99, 235, 0.14);
      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.16);
    }

    .ov-priority-list {
      display: grid;
      gap: 10px;
      flex: 1 1 auto;
      min-height: 0;
      grid-template-rows: repeat(4, minmax(0, 1fr));
    }

    .ov-ci-list {
      display: grid;
      gap: 10px;
      flex: 1 1 auto;
      min-height: 0;
    }

    .ov-ci-row {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px 14px;
      border-radius: 14px;
      border: 1px solid rgba(226, 232, 240, 0.92);
      background: rgba(255, 255, 255, 0.82);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
      min-width: 0;
    }

    .ov-ci-head {
      display: grid;
      grid-template-columns: 96px minmax(0, 1fr) 72px;
      gap: 12px;
      align-items: center;
    }

    .ov-ci-type {
      font-size: 11px;
      font-weight: 900;
      padding: 6px 10px;
      border-radius: 10px;
      text-align: center;
      border: 1px solid transparent;
      line-height: 1.1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ov-ci-desc {
      font-size: 13.5px;
      color: #0f172a;
      font-weight: 600;
      line-height: 1.4;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .ov-ci-repo {
      text-align: right;
      font-size: 12px;
      font-weight: 800;
      color: #475569;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .ov-ci-meta {
      display: flex;
      gap: 10px;
      padding-left: 108px;
      font-size: 12px;
      color: #94a3b8;
      align-items: center;
      flex-wrap: wrap;
    }

    .ov-ci-meta + .ov-ci-meta {
      margin-top: 8px;
    }

    .ov-ci-meta-key {
      color: #94a3b8;
      flex: 0 0 auto;
      font-weight: 700;
    }

    .ov-ci-stage-wrap {
      display: inline-flex;
      gap: 6px;
      flex-wrap: wrap;
      min-width: 0;
    }

    .ov-ci-stage-tag {
      font-size: 10.5px;
      background: rgba(240, 242, 246, 0.9);
      color: #475569;
      padding: 2.5px 8px;
      border-radius: 7px;
      font-weight: 600;
      letter-spacing: 0.2px;
      white-space: nowrap;
    }

    .ov-ci-status {
      height: 22px;
      padding: 0 10px;
      border-radius: 999px;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
    }

    .ov-ci-sev {
      height: 22px;
      padding: 0 10px;
      border-radius: 999px;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .ov-priority-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 340px;
      gap: 24px;
      align-items: center;
      padding: 0 14px;
      border-radius: 14px;
      border: 1px solid rgba(226, 232, 240, 0.92);
      background: rgba(255, 255, 255, 0.82);
      height: 64px;
      min-height: 64px;
      max-height: 64px;
      overflow: hidden;
    }

    .ov-priority-main {
      padding-top: 10px;
      // display: flex;
      // align-items: center;
      min-width: 0;
      height: 100%;
    }

    .ov-priority-header {
      font-size: 11px;
      font-weight: 500;
      color: #94a3b8;
      line-height: 2;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      flex: 1 1 0;
      min-width: 0;
      width: auto;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      // display: flex;
      // flex-direction: row;
      // flex-wrap: wrap;
      // align-items: flex-start;
      // justify-content: flex-start;
      // column-gap: 8px;
      // row-gap: 4px;
      // min-width: 0;
      // height: 100%;
      // flex: 1;
    }

    .ov-priority-tag {
      flex: 0 0 auto;
      min-width: 42px;
      height: 22px;
      padding: 0 8px;
      margin-right: 8px;
      border-radius: 6px;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .ov-priority-side {
      width: 340px;
      flex: 0 0 340px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      height: 100%;
    }

    .ov-priority-bar-box {
      width: 100%;
    }

    .ov-priority-meta-box {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ov-priority-stats {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 12px;
      border-left: 1px solid #e2e8f0;
      flex: 0 0 auto;
    }

    .ov-priority-total {
      font-size: 12px;
      line-height: 18px;
      font-weight: 600;
      color: #64748b;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .ov-priority-rate {
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      color: #64748b;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .ov-priority-clickable {
      cursor: pointer;
      transition: color 0.2s;
    }

    .ov-priority-clickable:hover {
      color: #3b82f6;
      text-decoration: underline;
    }

    .ov-priority-progress {
      position: relative;
      height: 10px;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(226, 232, 240, 0.92);
    }

    .ov-priority-progress-fill {
      display: block;
      height: 100%;
      border-radius: inherit;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.08);
    }

    .oj-trend-chart {
      position: relative;
      overflow: visible;
      flex: 1 1 auto;
      min-height: 0;
    }

    .oj-trend-svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }

    .oj-trend-plot-bg {
      fill: rgba(248, 250, 252, 0.92);
      stroke: rgba(226, 232, 240, 0.9);
      stroke-width: 1;
    }

    .oj-trend-band {
      fill: rgba(255, 255, 255, 0.16);
    }

    .oj-trend-band-strong {
      fill: rgba(255, 255, 255, 0.3);
    }

    .oj-trend-grid {
      stroke: rgba(203, 213, 225, 0.72);
      stroke-width: 1;
      stroke-dasharray: 3 4;
    }

    .oj-trend-axis-line {
      stroke: rgba(203, 213, 225, 0.88);
      stroke-width: 1;
    }

    .oj-trend-axis {
      font-size: 10.5px;
      fill: #8a98ab;
      font-variant-numeric: tabular-nums;
    }

    .oj-trend-axis-y {
      font-size: 9.5px;
    }

    .oj-trend-axis-title {
      font-size: 10px;
      fill: #55657b;
      font-weight: 700;
      letter-spacing: 0.04em;
      font-variant-numeric: tabular-nums;
    }

    .oj-trend-axis-title-y {
      font-size: 9px;
    }

    .oj-trend-val {
      font-size: 9.5px;
      fill: #334155;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .oj-trend-val-green {
      fill: #19a796;
      paint-order: stroke;
      stroke: rgba(255, 255, 255, 0.94);
      stroke-width: 1.2px;
      stroke-linejoin: round;
    }

    .oj-trend-rate-area {
      pointer-events: none;
    }

    .oj-trend-bar {
      stroke: rgba(255, 255, 255, 0.92);
      stroke-width: 1;
      shape-rendering: geometricPrecision;
    }

    .oj-trend-line-path {
      filter: drop-shadow(0 4px 8px rgba(25, 167, 150, 0.16));
    }

    .oj-trend-active-guide {
      stroke: rgba(25, 167, 150, 0.32);
      stroke-width: 1;
      stroke-dasharray: 4 4;
      pointer-events: none;
    }

    .oj-trend-hover-zone {
      fill: transparent;
      cursor: pointer;
    }

    .oj-trend-bar-muted {
      opacity: 0.42;
    }

    .oj-trend-point-core {
      fill: #fff;
      stroke: #19a796;
      stroke-width: 2;
      transition: r 0.16s ease, filter 0.16s ease;
    }

    .oj-trend-point-active-halo {
      fill: rgba(25, 167, 150, 0.14);
      pointer-events: none;
    }

    .oj-trend-tooltip {
      position: absolute;
      z-index: 2;
      min-width: 168px;
      padding: 10px 12px;
      border: 1px solid rgba(226, 232, 240, 0.96);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.14),
        0 2px 10px rgba(15, 23, 42, 0.08);
      transform: translate(-50%, calc(-100% - 10px));
      pointer-events: none;
      backdrop-filter: blur(8px);
    }

    .oj-trend-tooltip-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(226, 232, 240, 0.92);
      color: #0f172a;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
    }

    .oj-trend-tooltip-list {
      display: grid;
      gap: 6px;
    }

    .oj-trend-tooltip-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      color: #475569;
      font-size: 12px;
      line-height: 18px;
    }

    .oj-trend-tooltip-item-total {
      margin-top: 2px;
      padding-top: 6px;
      border-top: 1px dashed rgba(226, 232, 240, 0.92);
      color: #0f172a;
      font-weight: 600;
    }

    .oj-trend-tooltip-key {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    .oj-trend-tooltip-value {
      color: #0f172a;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .oj-trend-tooltip-marker {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      display: inline-block;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.44);
    }

    .oj-trend-tooltip-line-marker {
      width: 14px;
      height: 3px;
      border-radius: 999px;
      display: inline-block;
      background: linear-gradient(90deg, #34d399 0%, #19a796 100%);
    }

    .oj-trend-legend {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      font-size: 11.5px;
      color: #475569;
      margin-top: 10px;
      align-items: center;
    }

    .oj-trend-legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 24px;
      padding: 0 10px;
      border-radius: 999px;
      background: rgba(248, 250, 252, 0.95);
      border: 1px solid rgba(226, 232, 240, 0.95);
    }

    .oj-trend-dot {
      width: 9px;
      height: 9px;
      border-radius: 3px;
      display: inline-block;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45);
    }

    .oj-trend-line {
      width: 18px;
      height: 3px;
      background: linear-gradient(90deg, #34d399 0%, #19a796 100%);
      display: inline-block;
      border-radius: 999px;
    }

    .ov-item {
      width: 100%;
      text-align: left;
      border: 1px solid rgba(226, 232, 240, 0.92);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(248, 250, 252, 0.96) 100%
      );
      padding: 14px 14px 12px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      min-height: 88px;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
    }

    .ov-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      line-height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
    }

    .ov-value {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      line-height: 34px;
      font-variant-numeric: tabular-nums;
    }

    .ov-value-link {
      cursor: pointer;
    }

    .ov-value-link:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .ov-value-blue {
      color: #4791ff;
    }

    .ov-value-pending {
      color: #f4840c;
    }

    .ov-value-green {
      color: #2eb78a;
    }

    .overview-bottom-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
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

    .bm-trend-sparkline {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      height: 24px;
      padding: 1px 3px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: #2563eb;
      box-shadow: none;
      transition: all 0.18s ease;
      cursor: pointer;
    }

    .bm-trend-sparkline:hover {
      background: #f8fafc;
      color: #1d4ed8;
    }

    .bm-trend-sparkline:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .bm-trend-sparkline svg {
      display: block;
    }

    .bm-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
      font-size: 36px;
      font-weight: 700;
      color: #0f172a;
      font-variant-numeric: tabular-nums;
      line-height: 44px;
      flex-wrap: wrap;
    }

    .bm-value-main {
      line-height: 44px;
    }

    .bm-value-suffix {
      font-size: 14px;
      font-weight: 600;
      color: #94a3b8;
      line-height: 20px;
      align-self: flex-end;
      padding-bottom: 5px;
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

    .overview-type-select {
      width: 144px;
    }

    .overview-severity-select {
      width: 180px;
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
      text-align: center;
    }

    .overview-ant-table .ant-table-tbody > tr > td {
      padding: 10px 12px;
      font-size: 13px;
      color: #0f172a;
      text-align: center;
    }

    .overview-ant-table .ant-table-summary td {
      background: rgba(241, 245, 249, 0.7);
      border-top: 1px solid rgba(148, 163, 184, 0.25);
      font-weight: 600;
      text-align: center;
    }

    .overview-ant-table .ant-table-thead > tr > th.ant-table-column-align-left,
    .overview-ant-table .ant-table-tbody > tr > td.ant-table-column-align-left,
    .overview-ant-table .ant-table-summary td.ant-table-column-align-left {
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
      justify-content: center;
      gap: 6px;
    }

    .sortable-col-title-left {
      justify-content: flex-start;
      width: 100%;
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

    .overview-bar-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-width: 0;
    }

    .overview-bar-value {
      min-width: 24px;
      font-weight: 700;
      color: #0f172a;
      font-variant-numeric: tabular-nums;
    }

    .overview-bar-track {
      flex: 1;
      height: 6px;
      border-radius: 999px;
      background: #e2e8f0;
      overflow: hidden;
    }

    .overview-bar-fill {
      display: block;
      height: 100%;
      border-radius: 999px;
    }

    .overview-bar-blue {
      background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
    }

    .overview-bar-green {
      background: linear-gradient(90deg, #5eead4 0%, #16a34a 100%);
    }

    .overview-ring-progress {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 76px;
      flex: 0 0 76px;
      gap: 6px;
    }

    .overview-ring-svg {
      transform: rotate(-90deg);
      flex: 0 0 auto;
    }

    .overview-ring-label {
      font-size: 12px;
      line-height: 1;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex: 1;
      text-align: right;
    }

    .overview-progress-cell {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap: 8px;
    }
    .overview-select-label {
      font-size: 14px;
    }
    .overview-progress-bar {
      display: flex;
      height: 8px;
      min-width: 190px;
      overflow: hidden;
      border-radius: 999px;
      background: #e2e8f0;
    }

    .overview-progress-segment {
      height: 100%;
    }

    .overview-progress-pending {
      background: #e0962b;
    }

    .overview-progress-inProgress {
      background: #4f98ff;
    }

    .overview-progress-resolved {
      background: #33c998;
    }

    .overview-progress-meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      font-size: 12px;
      line-height: 18px;
    }

    .overview-progress-text {
      color: #475569;
      font-weight: 400;
      white-space: nowrap;
    }

    .overview-progress-link {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      font: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
      transition: opacity 0.2s;
    }

    .overview-progress-link:hover {
      opacity: 0.7;
      text-decoration: underline;
    }

    .overview-close-rate-cell {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
    }

    .overview-close-rate-value {
      min-width: 40px;
      text-align: left;
      font-variant-numeric: tabular-nums;
    }

    .overview-ant-table .overview-table-link {
      padding: 0;
      height: auto;
      color: #1677ff;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    .overview-ant-table .overview-table-link:hover {
      color: #0958d9;
      text-decoration: underline;
    }

    .overview-ant-table .overview-table-link:active {
      color: #003eb3;
    }

    .overview-ant-table .overview-table-link-muted {
      color: #94a3b8;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .overview-ant-table .overview-table-link-muted:hover {
      color: #94a3b8;
    }

    .overview-ant-table .overview-table-link-strong {
      font-weight: 700;
    }

    .row-num {
      color: #8899a6;
      font-weight: 500;
    }

    .overview-expand-label {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      font-weight: 600;
    }

    .overview-expand-icon {
      font-size: 12px;
      color: #64748b;
      transition: transform 0.2s ease;
    }

    .overview-expand-icon.is-expanded {
      transform: rotate(90deg);
    }

    .overview-ant-table .ant-table-expanded-row > td {
      background: rgba(248, 250, 252, 0.85);
      padding: 0 !important;
    }

    .overview-expanded-rows {
      width: 100%;
      margin: 0;
      overflow: hidden;
    }

    .overview-expanded-table {
      width: 100%;
      min-width: 1302px;
      table-layout: fixed;
      border-collapse: collapse;
    }

    .overview-expanded-row {
      animation: overviewExpandedFadeIn 220ms ease both;
    }

    .overview-expanded-cell {
      padding: 10px 12px;
      background: #fbfcfe;
      vertical-align: middle;
      color: #5b6168;
      font-size: 13px;
      text-align: center;
      border: none;
    }

    .overview-expanded-table tbody tr:first-child td {
      border-top: 1px solid #eef2f6;
    }

    .overview-expanded-table tbody tr + tr td {
      border-top: 1px solid #eef2f6;
    }

    .overview-expanded-cell-empty {
      background: #fbfcfe;
    }

    .overview-expanded-cell-index {
      box-shadow: inset 3px 0 0 #eaf1fc;
    }

    .overview-expanded-repo-name {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding-left: 12px;
      color: #1e5fbf;
      font-size: 13px;
      font-weight: 400;
      position: relative;
    }

    .overview-expanded-cell-name {
      position: relative;
      text-align: left;
    }

    .overview-expanded-cell-name::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 8px;
      bottom: 8px;
      width: 1px;
      background: #eaf1fc;
    }

    @keyframes overviewExpandedFadeIn {
      from {
        opacity: 0;
        transform: translateY(-2px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .overview-ant-tag {
      margin-inline-end: 0;
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 11px;
      line-height: 18px;
      font-weight: 600;
    }

    .overview-benchmark-tag.ant-tag {
      margin-inline-end: 0;
      cursor: pointer;
      border-radius: 999px;
      padding: 0 8px;
      line-height: 20px;
      border-color: rgba(147, 51, 234, 0.22);
      background: rgba(147, 51, 234, 0.08);
      color: #7e22ce;
      transition: all 0.18s ease;
    }

    .overview-benchmark-tag.ant-tag:hover {
      background: rgba(147, 51, 234, 0.14);
      border-color: rgba(147, 51, 234, 0.32);
      color: #6b21a8;
    }

    .overview-repo-name-cell {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 100%;
      max-width: 100%;
      text-align: center;
    }

    .overview-repo-name-cell .overview-benchmark-tag.ant-tag {
      align-self: center;
      margin-left: auto;
      margin-right: auto;
    }

    .benchmark-repo-cell {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      max-width: 100%;
    }

    .benchmark-inline-tag {
      cursor: default;
      pointer-events: none;
    }

    .benchmark-modal-title {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .benchmark-modal-subtitle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .benchmark-modal-subtitle {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #64748b;
      font-size: 14px;
      line-height: 22px;
    }

    .benchmark-modal-subtitle strong {
      color: #0f172a;
      font-weight: 700;
    }

    .benchmark-modal-subtitle-vs {
      color: #94a3b8;
      font-weight: 500;
    }

    .benchmark-subtitle-link {
      color: #1677ff;
      font-size: 13px;
      line-height: 20px;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 3px;
      white-space: nowrap;
    }

    .benchmark-subtitle-link:hover {
      color: #0958d9;
    }

    .benchmark-modal-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .benchmark-summary-shell {
      border: 1px solid rgba(226, 232, 240, 0.92);
      border-radius: 16px;
      background: #ffffff;
      overflow: hidden;
    }

    .benchmark-summary-table.overview-ant-table {
      margin-top: 0;
    }

    .benchmark-summary-table.overview-ant-table .ant-table-container {
      border: 0;
      border-radius: 0;
      background: transparent;
    }

    .benchmark-chart-card {
      border: 1px solid rgba(226, 232, 240, 0.92);
      border-radius: 16px;
      background: #ffffff;
      padding: 20px 22px 18px;
      overflow: hidden;
    }

    .benchmark-chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .benchmark-chart-title {
      min-width: 0;
      color: #0f172a;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
    }

    .benchmark-chart-title-copy {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .benchmark-chart-title-info-trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: transparent;
      color: #94a3b8;
      cursor: help;
      transition: color 0.2s ease;
    }

    .benchmark-chart-title-info-trigger:hover {
      color: #64748b;
    }

    .benchmark-chart-title-info-trigger .anticon {
      font-size: 15px;
    }

    .benchmark-chart-title-subtle {
      color: #64748b;
      font-size: 13px;
      line-height: 20px;
      font-weight: 500;
    }

    .benchmark-chart-title-popover {
      width: min(720px, calc(100vw - 32px));
      max-height: min(770px, calc(100vh - 120px));
      overflow: auto;
    }

    .benchmark-chart-title-popover-heading {
      color: #0f172a;
      font-size: 13px;
      line-height: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .benchmark-chart-title-popover-summary {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 10px;
    }

    .benchmark-chart-title-popover-summary span {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      min-width: 0;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #f8fafc;
      padding: 8px 10px;
      color: #64748b;
      font-size: 12px;
      line-height: 18px;
      font-weight: 500;
    }

    .benchmark-chart-title-popover-summary strong {
      color: #0f172a;
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      white-space: nowrap;
    }

    .benchmark-chart-title-popover-pairs {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .benchmark-chart-title-popover-pair-table {
      min-width: 640px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
    }

    .benchmark-chart-title-popover-table-head,
    .benchmark-chart-title-popover-row {
      display: grid;
      grid-template-columns: minmax(150px, 1.7fr) 58px repeat(
          5,
          minmax(48px, 1fr)
        );
    }

    .benchmark-chart-title-popover-table-head {
      background: #f8fafc;
      color: #334155;
      font-size: 12px;
      line-height: 18px;
      font-weight: 600;
    }

    .benchmark-chart-title-popover-table-head-common {
      position: sticky;
      top: 0;
      z-index: 1;
      min-width: 640px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 0 rgba(15, 23, 42, 0.04);
    }

    .benchmark-chart-title-popover-row {
      position: relative;
      color: #475569;
      font-size: 12px;
      line-height: 18px;
      background: #ffffff;
    }

    .benchmark-chart-title-popover-row::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
    }

    .benchmark-chart-title-popover-row-cann {
      background: #f3f7ff;
    }

    .benchmark-chart-title-popover-row-cann::before {
      background: #2070f3;
    }

    .benchmark-chart-title-popover-row-benchmark {
      background: #fbf5ff;
      border-top: 1px solid #ead5ff;
    }

    .benchmark-chart-title-popover-row-benchmark::before {
      background: #bf68fa;
    }

    .benchmark-chart-title-popover-cell,
    .benchmark-chart-title-popover-table-head span {
      min-width: 0;
      padding: 7px 8px;
      word-break: break-word;
    }

    .benchmark-chart-title-popover-cell + .benchmark-chart-title-popover-cell,
    .benchmark-chart-title-popover-table-head span + span {
      border-left: 1px solid #f1f5f9;
    }

    .benchmark-chart-title-popover-score {
      font-weight: 600;
      text-align: center;
      white-space: nowrap;
    }

    .benchmark-chart-title-popover-repo {
      display: flex;
      align-items: center;
      font-weight: 500;
    }

    .benchmark-chart-title-popover-repo-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .benchmark-chart-title-popover-step-value,
    .benchmark-chart-title-popover-table-head span:not(:first-child) {
      text-align: center;
      white-space: nowrap;
    }

    .benchmark-chart-title-popover-step-value {
      font-weight: 600;
    }

    .benchmark-chart-score-hint {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      color: #94a3b8;
      font-size: 13px;
      line-height: 20px;
      font-weight: 500;
    }

    .benchmark-chart-score-hint strong {
      color: #64748b;
      font-size: 15px;
      line-height: 22px;
      font-weight: 700;
    }

    .benchmark-chart-empty {
      min-height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
    }

    .benchmark-chart-legend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 12px;
      color: #64748b;
      font-size: 13px;
      line-height: 20px;
      font-weight: 600;
    }

    .benchmark-chart-legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .benchmark-chart-dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      display: inline-block;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.9);
    }

    .benchmark-chart-dot-cann {
      background: #2070f3;
    }

    .benchmark-chart-dot-benchmark {
      background: #bf68fa;
    }

    .benchmark-chart {
      --benchmark-top-offset: 0px;
      --benchmark-bars-height: 236px;
      --benchmark-label-height: 44px;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 14px;
      min-height: calc(
        var(--benchmark-top-offset) + var(--benchmark-bars-height) +
          var(--benchmark-label-height)
      );
    }

    .benchmark-chart-y {
      position: relative;
      padding-top: var(--benchmark-top-offset);
      padding-bottom: var(--benchmark-label-height);
    }

    .benchmark-chart-y-row {
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      position: absolute;
      left: 0;
      right: 0;
    }

    .benchmark-chart-y-label {
      font-size: 13px;
      line-height: 18px;
      color: #64748b;
      font-variant-numeric: tabular-nums;
      transform: translateY(-50%);
    }

    .benchmark-chart-plot {
      position: relative;
      min-height: 0;
      padding-top: var(--benchmark-top-offset);
    }

    .benchmark-chart-plot::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: var(--benchmark-label-height);
      border-top: 2px solid rgba(148, 163, 184, 0.46);
      z-index: 1;
    }

    .benchmark-chart-grid {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: var(--benchmark-label-height);
      z-index: 0;
    }

    .benchmark-chart-grid-line {
      position: absolute;
      left: 0;
      right: 0;
      border-top: 1px solid rgba(226, 232, 240, 0.72);
      transform: translateY(-50%);
    }

    .benchmark-chart-groups {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 18px;
      align-items: start;
    }

    .benchmark-chart-group {
      height: 100%;
      display: grid;
      grid-template-rows: var(--benchmark-bars-height) var(
          --benchmark-label-height
        );
      align-items: start;
      gap: 0;
    }

    .benchmark-chart-slot {
      height: var(--benchmark-bars-height);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0 10px;
    }

    .benchmark-chart-bars {
      position: relative;
      height: var(--benchmark-bars-height);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 14px;
      padding: 0 4px;
      width: 100%;
    }

    .benchmark-chart-bar-placeholder {
      width: 30px;
      flex: 0 0 30px;
    }

    .benchmark-chart-bar {
      position: relative;
      z-index: 2;
      width: 30px;
      min-height: 0;
      border-radius: 12px 12px 0 0;
      box-shadow: none;
      overflow: visible;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .benchmark-chart-bar::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 4px;
      border-radius: 999px;
      box-shadow: none;
      z-index: 3;
    }

    .benchmark-chart-bar-cann {
      background: #d6e4fd;
    }

    .benchmark-chart-bar-cann::before {
      background: #2070f3;
    }

    .benchmark-chart-bar-benchmark {
      background: #efd8ff;
    }

    .benchmark-chart-bar-benchmark::before {
      background: #bf68fa;
    }

    .benchmark-chart-bar-value {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding-top: 8px;
      color: #2070f3;
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .benchmark-chart-bar-benchmark .benchmark-chart-bar-value {
      color: #715afb;
    }

    .benchmark-chart-label {
      text-align: center;
      color: #64748b;
      font-size: 15px;
      line-height: 22px;
      font-weight: 600;
      padding-top: 10px;
    }

    .capability-overview-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 16px;
    }

    .capability-card {
      min-width: 0;
      border: 1px solid rgba(226, 232, 240, 0.95);
      border-radius: 20px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(248, 251, 255, 0.96) 100%
      );
      box-shadow: 0 16px 40px rgba(15, 23, 42, 0.07);
      padding: 18px;
    }

    .capability-card-title,
    .capability-section-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .capability-card-title {
      color: #0f172a;
      font-size: 16px;
      line-height: 24px;
      font-weight: 800;
      margin-bottom: 14px;
    }

    .capability-legend {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: #64748b;
      font-size: 12px;
      line-height: 18px;
      font-weight: 700;
      white-space: nowrap;
    }

    .capability-legend.compact {
      gap: 8px;
      font-size: 11px;
    }

    .capability-legend span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .capability-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      display: inline-block;
      border: 1px solid transparent;
    }

    .capability-dot-lead {
      background: #dff4eb;
      border-color: #b7e2d0;
    }

    .capability-dot-tie {
      background: #e8edf4;
      border-color: #cbd5e1;
    }

    .capability-dot-lag {
      background: #fce4e2;
      border-color: #f3b9b5;
    }

    .capability-stat-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .capability-stat-card {
      min-width: 0;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      background: #ffffff;
      padding: 14px 10px;
      text-align: center;
    }

    .capability-stat-value {
      display: block;
      font-size: 30px;
      line-height: 36px;
      font-weight: 850;
      font-variant-numeric: tabular-nums;
    }

    .capability-stat-label {
      display: block;
      margin-top: 3px;
      color: #64748b;
      font-size: 12px;
      line-height: 18px;
      font-weight: 700;
    }

    .capability-stat-lead .capability-stat-value {
      color: #16835e;
    }

    .capability-stat-lead {
      background: #e8f7f1;
      border-color: #c9eadc;
    }

    .capability-stat-tie .capability-stat-value {
      color: #607086;
    }

    .capability-stat-tie {
      background: #f4f7fb;
      border-color: #d7dee8;
    }

    .capability-stat-lag .capability-stat-value {
      color: #c2413b;
    }

    .capability-stat-lag {
      background: #fff0ee;
      border-color: #f5c7c3;
    }

    .capability-summary-box {
      margin-top: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: rgba(248, 250, 252, 0.92);
      padding: 10px 12px;
      color: #334155;
      font-size: 13px;
      line-height: 22px;
      font-weight: 600;
    }

    .capability-repo-tag {
      display: inline-flex;
      max-width: 180px;
      margin: 0 4px;
      padding: 0 7px;
      border-radius: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: bottom;
      white-space: nowrap;
      font-size: 12px;
      line-height: 20px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        'Liberation Mono', 'Courier New', monospace;
    }

    .capability-repo-tag.lead {
      color: #16835e;
      background: #dff4eb;
    }

    .capability-repo-tag.lag {
      color: #c2413b;
      background: #fce4e2;
    }

    .capability-muted {
      color: #94a3b8;
    }

    .capability-stage-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .capability-stage-row {
      display: grid;
      grid-template-columns: 142px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
    }

    .capability-stage-label {
      min-width: 0;
      display: flex;
      align-items: baseline;
      gap: 6px;
      color: #334155;
      font-size: 13px;
      line-height: 20px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .capability-stage-label span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    .capability-stage-label strong {
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    .capability-stage-track {
      min-width: 0;
      height: 26px;
      display: flex;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      border-radius: 9px;
      background: #f8fafc;
    }

    .capability-stage-segment {
      min-width: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #334155;
      font-size: 12px;
      line-height: 24px;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      transition: width 0.2s ease;
    }

    .capability-stage-segment.lead {
      color: #16835e;
      background: #cdebdd;
    }

    .capability-stage-segment.tie {
      color: #607086;
      background: #e8edf4;
    }

    .capability-stage-segment.lag {
      color: #c2413b;
      background: #f6d4d0;
    }

    .capability-empty {
      min-height: 136px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      font-size: 14px;
      line-height: 22px;
      font-weight: 600;
      text-align: center;
    }

    .capability-loading {
      min-height: 136px;
      display: flex;
      align-items: center;
      padding: 8px 2px;
    }

    .capability-detail-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .capability-detail-card-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 8px;
    }

    .capability-detail-table .ant-table-cell {
      text-align: center;
    }

    .capability-detail-table .ant-table-thead {
      position: relative;
      z-index: 5;
    }

    .capability-detail-table .ant-table-thead > tr > th {
      overflow: visible;
    }

    .capability-stage-head {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      line-height: 17px;
    }

    .capability-stage-head span {
      color: #64748b;
      font-size: 11px;
      font-weight: 600;
      white-space: normal;
    }

    .capability-stage-result-title {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      line-height: 17px;
    }

    .capability-stage-result-title span:last-child {
      color: #64748b;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }

    .capability-repo-pair {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .capability-repo-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #0f172a;
      font-size: 12px;
      line-height: 18px;
      font-weight: 700;
    }

    .capability-repo-name.muted {
      color: #64748b;
      font-weight: 600;
    }

    .capability-vs {
      flex: 0 0 auto;
      border-radius: 6px;
      background: #f1f5f9;
      padding: 0 6px;
      color: #64748b;
      font-size: 11px;
      line-height: 18px;
      font-weight: 800;
    }

    .capability-team-text {
      display: inline-block;
      max-width: 100%;
      color: #475569;
      font-size: 12px;
      line-height: 20px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .capability-status-lead,
    .capability-status-tie,
    .capability-status-lag,
    .capability-status-unknown {
      display: inline-flex;
      justify-content: center;
      min-width: 64px;
      border-radius: 7px;
      padding: 2px 7px;
      font-size: 12px;
      line-height: 18px;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .capability-status-lead {
      color: #16835e;
      background: #dff4eb;
    }

    .capability-status-tie {
      color: #607086;
      background: #eef2f7;
    }

    .capability-status-lag {
      color: #c2413b;
      background: #fce4e2;
    }

    .capability-status-unknown {
      color: #94a3b8;
      background: #f8fafc;
    }

    .capability-record {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #475569;
      font-size: 13px;
      line-height: 20px;
      font-weight: 850;
      white-space: nowrap;
    }

    .capability-record .lead {
      color: #16835e;
    }

    .capability-record .tie {
      color: #607086;
    }

    .capability-record .lag {
      color: #c2413b;
    }

    .capability-record .slash {
      color: #94a3b8;
      font-size: 12px;
      font-weight: 850;
    }

    .nowrap-tag {
      white-space: nowrap;
      word-break: keep-all;
    }

    .nowrap-col {
      white-space: nowrap;
    }

    @media (max-width: 1199px) {
      .overview-ant-table .ant-table-thead > tr > th {
        padding: 8px 8px;
        font-size: 11px;
      }

      .overview-ant-table .ant-table-tbody > tr > td,
      .overview-ant-table .ant-table-summary td,
      .overview-expanded-cell {
        padding: 8px 8px;
        font-size: 12px;
      }

      .sortable-col-title {
        gap: 4px;
      }

      .sort-arrow {
        font-size: 10px;
      }

      .overview-progress-cell {
        gap: 6px;
      }

      .overview-progress-bar {
        min-width: 148px;
        height: 7px;
      }

      .overview-progress-meta {
        gap: 6px;
        font-size: 11px;
        line-height: 16px;
      }

      .overview-close-rate-cell {
        gap: 6px;
      }

      .overview-close-rate-value {
        min-width: 34px;
        font-size: 12px;
      }

      .overview-ant-table .overview-table-link,
      .overview-ant-table .overview-table-link-muted,
      .overview-ant-table .ant-btn-link {
        font-size: 12px;
      }

      .overview-expanded-repo-name {
        padding-left: 10px;
        font-size: 12px;
      }
    }

    @media (max-width: 1024px) {
      .detail-panel-body {
        padding: 16px;
      }

      .overview-grid {
        grid-template-columns: 1fr;
      }

      .overview-dashboard-toolbar {
        justify-content: flex-start;
      }

      .overview-source-switch {
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .overview-summary-actions {
        margin-left: 0;
        width: 100%;
        justify-content: flex-start;
      }

      .capability-overview-grid {
        grid-template-columns: 1fr;
      }

      .capability-stage-row {
        grid-template-columns: 1fr;
        gap: 6px;
      }

      .capability-stat-value {
        font-size: 26px;
        line-height: 32px;
      }

      .ov-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .overview-insight-grid {
        grid-template-columns: 1fr;
        height: auto;
      }

      .ov-priority-row {
        grid-template-columns: 1fr;
      }

      .team-filter {
        margin-left: 0;
      }
    }
  `}</style>
);

export default DashboardStyles;
