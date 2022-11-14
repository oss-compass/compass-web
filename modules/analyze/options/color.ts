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
