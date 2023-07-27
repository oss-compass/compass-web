export function numberFormatK(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

export function toFixed(n: number, d: number): number {
  if (String(n).indexOf('.') === -1) {
    return n;
  }
  return Number(n.toFixed(d));
}
