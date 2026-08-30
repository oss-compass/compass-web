// 解析 URL query 等外部传入的 JSON 字符串。
// 内容不可信（畸形 JSON、重复参数变成数组等都会抛 SyntaxError），
// 失败时回退到 fallback，避免渲染期崩溃。
export function safeJsonParse<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== 'string' || raw === '') {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
