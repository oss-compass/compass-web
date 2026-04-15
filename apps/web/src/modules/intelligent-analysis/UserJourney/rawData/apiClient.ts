/**
 * UserJourney 后端 API 客户端
 *
 * 环境变量优先级：
 * NEXT_PUBLIC_COMPASS_API_URL （前端运行时可访问）
 *
 * 本地开发默认值：http://localhost:8000
 */

const getApiBase = (): string => {
  // 本地开发：设置 NEXT_PUBLIC_COMPASS_API_URL=http://localhost:8099
  // 生产部署：留空，使用相对路径，由域名服务器 Nginx 转发到后端
  return process.env.NEXT_PUBLIC_COMPASS_API_URL?.replace(/\/$/, '') || '';
};

const API_PREFIX = '/user-journey-api/user-journey';

export const compassApiUrl = (path: string): string => {
  const base = getApiBase();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${API_PREFIX}${normalizedPath}`;
};

/**
 * 通用 JSON 请求，抛出带状态码的错误
 */
export const compassApiFetch = async <T>(path: string): Promise<T> => {
  const url = compassApiUrl(path);
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`[CompassAPI] ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
};

// ---------- 痛点确认 ----------

export type PainConfirmationRecord = {
  file_key: string;
  step_id: string;
  pain_index: number;
  pain_text: string;
  level: string;
  confirmed_by: string;
  confirmed_at: string;
};

export type PainConfirmationsResponse = {
  file_key: string;
  confirmations: PainConfirmationRecord[];
};

export type UpsertPainConfirmationPayload = {
  step_id: string;
  pain_index: number;
  pain_text: string;
  level: string;
  confirmed_by: string;
};

/**
 * 获取指定报告的所有痛点确认记录
 */
export const fetchPainConfirmations = async (
  fileKey: string
): Promise<PainConfirmationsResponse> => {
  const url = compassApiUrl(`/reports/${fileKey}/pain-confirmations`);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[CompassAPI] ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<PainConfirmationsResponse>;
};

/**
 * 新增或更新一条痛点确认（等级 + 确认人）
 */
export const upsertPainConfirmation = async (
  fileKey: string,
  payload: UpsertPainConfirmationPayload
): Promise<{ message: string; data: PainConfirmationRecord }> => {
  const url = compassApiUrl(`/reports/${fileKey}/pain-confirmations`);
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      (errBody as { detail?: string }).detail ||
        `[CompassAPI] ${res.status} ${res.statusText}`
    );
  }
  return res.json();
};
