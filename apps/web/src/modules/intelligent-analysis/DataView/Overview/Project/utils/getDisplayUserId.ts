/**
 * 优先返回中文用户ID，如无则返回原始用户ID，并统一去掉 org: / github: 前缀
 */
export function getDisplayUserId(record: {
  用户ID?: string;
  中文用户ID?: string;
}): string {
  const preferred = record.中文用户ID?.trim() || record.用户ID || '';
  // 先去掉 org:
  let cleaned = preferred.startsWith('org:') ? preferred.slice(4) : preferred;
  // 再去掉 github:
  cleaned = cleaned.startsWith('github:') ? cleaned.slice(7) : cleaned;
  return cleaned;
}
