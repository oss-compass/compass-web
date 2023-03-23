import palettes from './palette';
import { ChartThemeState } from '@modules/analyze/store';

// default index in palette
export const DefaultIndex = 3;

export const colors = palettes.map((i) => i[DefaultIndex]);

export const getPalette = (index: number) => {
  return palettes[index % palettes.length];
};

export const getPaletteColor = (palette: string[], index: number) => {
  return palette[index % palette.length];
};

export const getPaletteIndex = (
  themeState: DeepReadonly<ChartThemeState> | undefined,
  label: string
) => {
  return themeState?.color?.find((i) => i.label === label)?.paletteIndex || 0;
};

export const getColorWithLabel = (
  themeState: DeepReadonly<ChartThemeState> | undefined,
  label: string
) => {
  const paletteIndex = getPaletteIndex(themeState, label);
  const palette = getPalette(paletteIndex);
  return getPaletteColor(palette, 3);
};
