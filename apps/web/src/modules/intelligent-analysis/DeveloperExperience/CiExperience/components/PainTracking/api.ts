import type { TrackingAction, TrackingRecord, TrackingScope } from './model';

const base = process.env.NEXT_PUBLIC_COMPASS_API_URL?.replace(/\/$/, '') || '';
const prefix =
  process.env.NEXT_PUBLIC_USER_JOURNEY_API_PREFIX ||
  '/user-journey-api/user-journey';
const endpoint = `${base}${prefix}/ci-experience/pain-trackings`;
export const TRACKING_LOAD_TIMEOUT_MS = 10000;

export class TrackingApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail = body?.detail;
    throw new TrackingApiError(
      typeof detail === 'string'
        ? detail
        : detail?.message ||
          (response.status === 404
            ? 'CI 痛点接口尚未就绪，请检查后端是否已更新'
            : response.status >= 500
            ? 'CI 痛点服务暂时不可用，请稍后重试'
            : `痛点管理请求失败（${response.status}）`),
      response.status
    );
  }
  return response.json() as Promise<T>;
}

export const fetchTrackings = async (
  scope: TrackingScope,
  signal?: AbortSignal
) => {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let onAbort: () => void = () => {};
  const deadline = new Promise<never>((_, reject) => {
    onAbort = () => {
      reject(new DOMException('报告已切换，取消读取', 'AbortError'));
      controller.abort();
    };
    if (signal?.aborted) {
      onAbort();
      return;
    }
    signal?.addEventListener('abort', onAbort, { once: true });
    timer = setTimeout(() => {
      reject(
        new TrackingApiError(
          '痛点状态加载超时，请检查网络或接口地址后重试',
          504
        )
      );
      controller.abort();
    }, TRACKING_LOAD_TIMEOUT_MS);
  });
  try {
    // 覆盖连接和响应体读取；请求挂起时也必须退出加载态。
    return await Promise.race([
      deadline,
      fetch(`${endpoint}?${new URLSearchParams(scope)}`, {
        signal: controller.signal,
        cache: 'no-store',
      }).then((response) =>
        readResponse<{ items: TrackingRecord[] }>(response)
      ),
    ]);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new TrackingApiError(
        '无法连接 CI 痛点接口，请检查网络、页面协议或接口地址',
        0
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
};

export const saveTracking = async (
  payload: TrackingScope & {
    problemKey: string;
    type: TrackingAction;
    operator: string;
    reason: string;
    revision: number;
  }
) =>
  readResponse<{ data: TrackingRecord }>(
    await fetch(`${endpoint}/actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  );
