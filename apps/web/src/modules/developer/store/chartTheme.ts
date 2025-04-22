import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

export type ChartThemeState = {
  color: { label: string; paletteIndex: number }[];
};

export const chartThemeState = proxy<ChartThemeState>({
  color: [],
});
devtools(chartThemeState, { name: 'chartThemeState', enabled: true });

export const initThemeColor = (
  payload: { label: string; paletteIndex: number }[]
) => {
  chartThemeState.color = payload;
};

export const updateThemeColor = (payload: {
  label: string;
  paletteIndex: number;
}) => {
  const { color } = chartThemeState;
  const { label, paletteIndex } = payload;
  chartThemeState.color = color.map((c) => {
    if (c.label === label) {
      c.paletteIndex = paletteIndex;
    }
    return c;
  });
};
