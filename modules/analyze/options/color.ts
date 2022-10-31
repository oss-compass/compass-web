import palettes from './palette';

// default index in palette
export const DefaultIndex = 3;

export const colors = palettes.map((i) => i[DefaultIndex]);

export const getPalette = (index: number) => {
  return palettes[index % palettes.length];
};

export const getPaletteColor = (palette: string[], index: number) => {
  return palette[index % palette.length];
};

/**
 * @deprecated
 */
export const colorGenerator = () => {
  let labelIndex = 0;
  const labelMap: Record<string, { paletteIndex: number; count: number }> = {};

  return (label: string) => {
    if (!labelMap[label]) {
      const palette = getPalette(labelIndex);
      labelMap[label] = { paletteIndex: labelIndex, count: DefaultIndex };
      labelIndex++;
      return palette[DefaultIndex];
    }

    labelMap[label].count++;
    const { paletteIndex, count } = labelMap[label];
    const palette = palettes[paletteIndex];
    return palette[count % palette.length];
  };
};
