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

    .overview-bar-cell {
      display: flex;
      align-items: center;
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
      gap: 8px;
    }
    .overview-select-label {
      font-size: 14px;
    }
    .overview-progress-bar {
      display: flex;
      height: 8px;
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
      padding-left: 12px;
      color: #1e5fbf;
      font-size: 13px;
      font-weight: 400;
      position: relative;
    }

    .overview-expanded-cell-name {
      position: relative;
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
