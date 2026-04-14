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
