export const formatTrackingTime = (value?: string | null): string => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad2 = (part: number) => String(part).padStart(2, '0');
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate()
  )} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};

export const shortTrackingPeriod = (period: string): string =>
  period.replace('_to_', ' ~ ');

export const validateOperator = (value: string): string | null => {
  const normalized = value.trim();
  if (!normalized) return '请填写操作人';
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9 \-_]{1,20}$/.test(normalized)) {
    return '仅支持中文、字母、数字、空格、- 和 _，最多 20 个字符';
  }
  return null;
};
