import createCtx from './createCtx';

const initialState = {};
// type AppState = typeof initialState;
type AppState = Record<string, number>;
type Action = {
  type: 'update';
  payload: { label: string; paletteIndex: number };
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'update':
      return { ...state, [action.payload.label]: action.payload.paletteIndex };
    default:
      throw new Error();
  }
}

const [ColorContext, ColorProvider] = createCtx(reducer, initialState);
export { ColorContext, ColorProvider };
