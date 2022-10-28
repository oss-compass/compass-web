import palettes from './palette';

// default index in palette
const DF = 2;

export const colors = palettes.map((i) => i[DF]);

const getPalette = (index: number) => {
  return palettes[index % palettes.length];
};

export const colorGenerator = () => {
  let labelIndex = 0;
  const labelMap: Record<string, { paletteIndex: number; count: number }> = {};

  return (label: string) => {
    if (!labelMap[label]) {
      const palette = getPalette(labelIndex);
      labelMap[label] = { paletteIndex: labelIndex, count: DF };
      labelIndex++;
      return palette[DF];
    }

    labelMap[label].count++;
    const { paletteIndex, count } = labelMap[label];
    const palette = palettes[paletteIndex];
    return palette[count % palette.length];
  };
};
