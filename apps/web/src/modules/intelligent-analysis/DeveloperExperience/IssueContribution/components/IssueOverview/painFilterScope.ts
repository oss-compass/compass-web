export const ALL_PAIN_FILTER = '__ALL__';

/** 候选项来自入口完整数据；全部恢复入口条件，局部选择只收窄范围。 */
export const resolvePainFilter = (
  selected: string,
  available: string[],
  entry?: string
) => {
  const value = available.includes(selected) ? selected : ALL_PAIN_FILTER;
  return { value, filter: value === ALL_PAIN_FILTER ? entry : value };
};
