import React, { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Dialog from '@mui/material/Dialog';
import { reportModels } from './catalog';
import { reportMessages } from './messages';
import {
  AnalysisNotReadyError,
  loadReportSnapshot,
  ReportSelection,
} from './snapshot';

const TIMEOUT_MS = 30000;
const buttonClass =
  'rounded border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50';

type Preview =
  | { state: 'idle' | 'loading' | 'error'; message?: string }
  | { state: 'ready'; html: string };

export default function ReportDialog({
  selection,
  onClose,
}: {
  selection: ReportSelection;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const titleId = useId();
  const language = selection.language;
  const [model, setModel] = useState('all');
  const [preview, setPreview] = useState<Preview>({ state: 'idle' });
  const [printReady, setPrintReady] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const job = useRef<AbortController | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const messages = reportMessages(i18n, language);
  const reportT = i18n.getFixedT(language);

  const cancel = () => {
    job.current?.abort();
    job.current = null;
    clearTimeout(timer.current);
  };
  useEffect(() => cancel, []);

  const prepare = async () => {
    cancel();
    const controller = new AbortController();
    job.current = controller;
    setPrintReady(false);
    setPreview({ state: 'loading' });
    timer.current = setTimeout(() => {
      controller.abort();
      if (job.current === controller) {
        job.current = null;
        setPreview({ state: 'error', message: messages.failed });
      }
    }, TIMEOUT_MS);
    try {
      const [snapshot, renderer] = await Promise.all([
        loadReportSnapshot(
          { ...selection, language, model },
          controller.signal
        ),
        import('./renderReport'),
      ]);
      if (job.current !== controller || controller.signal.aborted) return;
      const html = await renderer.renderReport(
        snapshot,
        i18n,
        controller.signal
      );
      if (job.current !== controller || controller.signal.aborted) return;
      setPreview({ state: 'ready', html });
      // The deadline also covers font/image decoding in the iframe.
    } catch (error) {
      if (job.current !== controller || controller.signal.aborted) return;
      cancel();
      setPreview({
        state: 'error',
        message:
          error instanceof AnalysisNotReadyError
            ? messages.notReady
            : messages.failed,
      });
    }
  };
  const reset = () => {
    cancel();
    setPrintReady(false);
    setPreview({ state: 'idle' });
  };

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby={titleId}
      maxWidth="lg"
      fullWidth
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold">
            {messages.title}
          </h2>
          <button type="button" className={buttonClass} onClick={onClose}>
            {t('common:btn.close')}
          </button>
        </div>
        <p className="text-sm text-gray-600">{messages.scope}</p>
        <p className="break-all text-sm">
          {selection.projects.map((project) => project.label).join(' / ')}
          <br />
          {selection.dateLabel}
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex min-w-0 flex-col gap-1 text-sm">
            {messages.models}
            <select
              autoFocus
              className="max-w-full rounded border p-2"
              value={model}
              onChange={(event) => {
                reset();
                setModel(event.target.value);
              }}
            >
              <option value="all">{messages.all}</option>
              {reportModels
                .filter((item) => item.topic === selection.topic)
                .map((item) => (
                  <option key={item.key} value={item.key}>
                    {reportT(item.title)}
                  </option>
                ))}
            </select>
          </label>
          <p className="text-sm">
            {messages.language}: {language === 'zh' ? '中文' : 'English'}
          </p>
          <button
            type="button"
            className={buttonClass}
            disabled={preview.state === 'loading'}
            onClick={prepare}
          >
            {messages.generate}
          </button>
          <button
            type="button"
            className={buttonClass}
            disabled={!printReady}
            onClick={() => {
              try {
                frame.current?.contentWindow?.focus();
                frame.current?.contentWindow?.print();
              } catch {
                cancel();
                setPrintReady(false);
                setPreview({ state: 'error', message: messages.failed });
              }
            }}
          >
            {messages.print}
          </button>
        </div>
        {(preview.state === 'loading' ||
          (preview.state === 'ready' && !printReady)) && (
          <p role="status">{messages.preparing}</p>
        )}
        {preview.state === 'error' && <p role="alert">{preview.message}</p>}
        {preview.state === 'ready' && (
          <iframe
            ref={frame}
            title={messages.title}
            sandbox="allow-same-origin allow-modals"
            srcDoc={preview.html}
            className="h-[60vh] w-full border"
            onLoad={async () => {
              const controller = job.current;
              const document = frame.current?.contentDocument;
              if (!controller || !document) return;
              document.addEventListener(
                'keydown',
                (event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    onClose();
                  }
                },
                { signal: controller.signal }
              );
              try {
                const { waitForReportAssets } = await import('./renderReport');
                await waitForReportAssets(document);
                if (job.current === controller && !controller.signal.aborted) {
                  clearTimeout(timer.current);
                  setPrintReady(true);
                }
              } catch {
                if (job.current !== controller) return;
                cancel();
                setPreview({ state: 'error', message: messages.failed });
              }
            }}
          />
        )}
      </div>
    </Dialog>
  );
}
