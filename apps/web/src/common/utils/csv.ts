export const escapeCsvCell = (value: unknown): string => {
  const text = String(value ?? '');
  const formulaLike =
    typeof value !== 'number' && /^[\s]*[=+\-@＝＋－＠]/u.test(text);
  const safeText = formulaLike ? `\t${text}` : text;
  return formulaLike || /[",\r\n]/.test(safeText)
    ? `"${safeText.replace(/"/g, '""')}"`
    : safeText;
};
