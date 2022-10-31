import createCtx from './createCtx';

const initialState: ChartThemeState = {
  color: [],
};

// type AppState = typeof initialState;
export type ChartThemeState = {
  color: { label: string; paletteIndex: number }[];
};

export const ActionThemeColorInit = 'ThemeColorInit';
export const ActionThemeColorUpdate = 'ThemeColorUpdate';

type Action =
  | {
      type: typeof ActionThemeColorInit;
      payload: { label: string; paletteIndex: number }[];
    }
  | {
      type: typeof ActionThemeColorUpdate;
      payload: { label: string; paletteIndex: number };
    };

function reducer(state: ChartThemeState, action: Action): ChartThemeState {
  switch (action.type) {
    case ActionThemeColorInit:
      return { ...state, color: action.payload };
    case ActionThemeColorUpdate:
      const { color } = state;
      const { label, paletteIndex } = action.payload;
      const newColor = color.map((c) => {
        if (c.label === label) {
          c.paletteIndex = paletteIndex;
        }
        return c;
      });
      return { ...state, color: newColor };
    default:
      throw new Error();
  }
}

const [ChartThemeContext, ChartThemeProvider] = createCtx(
  reducer,
  initialState
);
export { ChartThemeContext, ChartThemeProvider };
