import { init, use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import type { i18n } from 'i18next';
import { reportModels } from './catalog';
import { metricSeries, ReportSnapshot } from './snapshot';
import { reportMessages } from './messages';

use([LineChart, GridComponent, SVGRenderer]);

const colors = ['#254bd5', '#9c3a10', '#137650', '#7d36ac'];
export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        character
      ])
  );

const styles = `
@page {
  size: A4 portrait; margin: 14mm;
  @bottom-right { content: counter(page) " / " counter(pages); color: #64748b; font: 9px Arial, sans-serif; }
}
* { box-sizing: border-box; }
html { color-scheme: light; background: #fff; }
body { margin: 0 auto; padding: 24px; max-width: 920px; color: #17202c;
  font: 14px/1.5 Arial, "PingFang SC", "Microsoft YaHei", sans-serif; }
h1 { font-size: 28px; line-height: 1.25; margin: 0 0 24px; }
h2 { font-size: 21px; margin: 0 0 20px; break-after: avoid; }
h3 { font-size: 16px; line-height: 1.4; margin: 0; }
p { margin: 8px 0; }
ul { padding-left: 22px; }
li, td, dd { overflow-wrap: anywhere; }
.cover { break-after: page; padding-bottom: 32px; }
.brand { font-weight: bold; letter-spacing: .08em; color: #254bd5; }
dl { margin: 24px 0; }
dt { font-weight: bold; margin-top: 12px; }
dd { margin: 4px 0; }
.note, .unit { color: #4b5563; font-size: 12px; }
.model { break-before: page; }
figure { margin: 0 0 20px; padding: 12px 0; border-top: 1px solid #cbd5e1;
  break-inside: avoid; page-break-inside: avoid; }
img { display: block; width: 100%; height: auto; }
table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 11px; }
th { text-align: left; color: #4b5563; font-weight: normal; }
th:first-child { width: 60%; }
td, th { padding: 4px 6px; vertical-align: top; border-bottom: 1px solid #e5e7eb; }
.empty { padding: 40px 16px; text-align: center; border: 1px dashed #cbd5e1; }
@media print {
  body { max-width: none; padding: 0; font-size: 12px; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

// Render from the captured data, independently of the page's viewport,
// animations, live query cache and per-card interaction state.
export async function renderReport(
  snapshot: ReportSnapshot,
  i18n: i18n,
  signal?: AbortSignal
): Promise<string> {
  const { selection } = snapshot;
  const t = i18n.getFixedT(selection.language);
  const messages = reportMessages(i18n, selection.language);
  const number = new Intl.NumberFormat(selection.language, {
    maximumSignificantDigits: 6,
  });
  const models = reportModels.filter(
    (model) =>
      model.topic === selection.topic &&
      (selection.model === 'all' || selection.model === model.key)
  );
  const sections: string[] = [];
  for (const model of models) {
    const figures: string[] = [];
    for (const metric of model.metrics) {
      // Yield between charts so closing, changing a model and the deadline can
      // cancel long reports without waiting for every SVG to finish.
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      const qualifier = metric.qualifier ? t(metric.qualifier) : '';
      const title =
        t(metric.title) +
        (qualifier && qualifier !== t(metric.title) ? ` / ${qualifier}` : '');
      const { dates, series } = metricSeries(snapshot, model.key, metric);
      const hasData = series.some((item) =>
        item.values.some((value) => value !== null)
      );
      let visual = `<p class="empty">${escapeHtml(messages.empty)}</p>`;
      if (hasData) {
        const chart = init(null, undefined, {
          renderer: 'svg',
          ssr: true,
          width: 900,
          height: 245,
        });
        try {
          chart.setOption({
            animation: false,
            color: colors,
            grid: {
              left: 12,
              right: 25,
              top: 20,
              bottom: 16,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: dates.map((date) => date.slice(0, 10)),
              axisLabel: { hideOverlap: true, fontSize: 16 },
            },
            yAxis: {
              type: 'value',
              splitNumber: 3,
              axisLabel: { fontSize: 16 },
            },
            series: series.map((item) => ({
              type: 'line',
              name: item.label,
              data: item.values,
              connectNulls: false,
              showSymbol: true,
              symbolSize: 4,
            })),
          });
          visual = `<img alt="${escapeHtml(
            title
          )}" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            chart.renderToSVGString()
          )}">`;
        } finally {
          chart.dispose();
        }
      }
      const rows = series
        .map((item, index) => {
          let latest = item.values.length - 1;
          while (latest >= 0 && item.values[latest] === null) latest--;
          return `<tr><td><span style="color:${
            colors[index % colors.length]
          }">●</span> ${escapeHtml(item.label)}</td><td>${
            latest < 0
              ? escapeHtml(messages.missing)
              : escapeHtml(number.format(item.values[latest]!))
          }</td><td>${
            latest < 0 ? '/' : escapeHtml(dates[latest].slice(0, 10))
          }</td></tr>`;
        })
        .join('');
      const unit = metric.unit ? messages[metric.unit] : messages.value;
      figures.push(
        `<figure><h3>${escapeHtml(title)}</h3><p class="unit">${escapeHtml(
          unit
        )}</p>${visual}<table><thead><tr><th>${escapeHtml(
          messages.projects
        )}</th><th>${escapeHtml(messages.latest)}</th><th>${escapeHtml(
          messages.observed
        )}</th></tr></thead><tbody>${rows}</tbody></table></figure>`
      );
    }
    sections.push(
      `<section class="model"><h2>${escapeHtml(
        t(model.title)
      )}</h2>${figures.join('')}</section>`
    );
  }
  const repoType =
    selection.repoType === 'governance'
      ? t('analyze:repos_type.governance_repository')
      : t('analyze:repos_type.software_artifact_repository');
  return `<!doctype html><html lang="${
    selection.language
  }"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'"><title>OSS Compass - ${escapeHtml(
    messages.title
  )} - ${escapeHtml(
    selection.dateLabel
  )}</title><style>${styles}</style></head><body><header class="cover"><p class="brand">OSS COMPASS</p><h1>${escapeHtml(
    messages.title
  )}</h1><dl><dt>${escapeHtml(messages.dates)}</dt><dd>${escapeHtml(
    selection.dateLabel
  )}</dd><dt>${escapeHtml(messages.projects)}</dt><dd><ul>${selection.projects
    .map(({ label }) => `<li>${escapeHtml(label)}</li>`)
    .join('')}</ul></dd><dt>${escapeHtml(messages.language)}</dt><dd>${
    selection.language === 'zh' ? '中文' : 'English'
  }</dd>${
    selection.projects.some((project) => project.level === 'community')
      ? `<dt>${escapeHtml(messages.repositoryType)}</dt><dd>${escapeHtml(
          repoType
        )}</dd>`
      : ''
  }<dt>${escapeHtml(messages.captured)}</dt><dd>${escapeHtml(
    snapshot.preparedAt
  )}</dd><dt>${escapeHtml(messages.models)}</dt><dd><ul>${models
    .map((model) => `<li>${escapeHtml(t(model.title))}</li>`)
    .join('')}</ul></dd></dl><p class="note">${escapeHtml(
    messages.note
  )}</p></header><main>${sections.join('')}</main></body></html>`;
}

export async function waitForReportAssets(document: Document) {
  await Promise.all([
    document.fonts?.ready,
    ...Array.from(document.images).map((image) => image.decode()),
  ]);
}
