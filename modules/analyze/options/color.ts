import ColorLib from 'color';

const colors = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];

const getColor = (index: number) => {
  return colors[index % colors.length];
};

export const colorGenerator = () => {
  let colorIndex = 0;
  const labelMap: Record<string, { color: string; count: number }> = {};

  return (label: string) => {
    if (!labelMap[label]) {
      const mainColor = getColor(colorIndex);
      labelMap[label] = { color: mainColor, count: 0 };
      colorIndex++;
      return mainColor;
    }

    labelMap[label].count++;
    const { color, count } = labelMap[label];

    return ColorLib(color)
      .darken(count * 0.2)
      .hex();
  };
};
