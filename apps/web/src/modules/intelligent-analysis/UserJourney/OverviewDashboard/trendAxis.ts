/** 四等分刻度，保留少量顶部空间，避免 447 因粗粒度取整直接跳到 1000。 */
export const getAdaptiveTrendAxis = (value: number, percent = false) => {
  const padded = Math.max(
    percent ? 1 : 4,
    Number.isFinite(value) ? value * 1.1 : 0
  );
  const magnitude = 10 ** Math.floor(Math.log10(padded));
  const normalized = padded / magnitude;
  const factor =
    [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(
      (candidate) => candidate >= normalized
    ) ?? 10;
  const niceMax = factor * magnitude;
  const max = percent ? Math.min(100, niceMax) : Math.ceil(niceMax / 4) * 4;
  return {
    max,
    ticks: [4, 3, 2, 1, 0].map((step) => Number(((max * step) / 4).toFixed(4))),
  };
};
