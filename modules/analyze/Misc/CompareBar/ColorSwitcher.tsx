import React, { useContext, useMemo, useRef, useState } from 'react';
import {
  ActionThemeColorUpdate,
  ChartThemeContext,
} from '@modules/analyze/context';
import { useClickAway } from 'react-use';
import {
  DefaultIndex,
  getPalette,
  colors,
} from '@modules/analyze/options/color';

const ColorSwitcher: React.FC<{
  label: string;
}> = ({ label }) => {
  const colorPopoverRef = useRef<HTMLDivElement>(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const chartTheme = useContext(ChartThemeContext);

  useClickAway(colorPopoverRef, () => {
    setPopoverVisible(false);
  });

  const color = useMemo(() => {
    const color = chartTheme.state.color;
    const current = color.find((i) => i.label === label);
    if (!current) return { palette: [] };

    const { paletteIndex } = current;
    const palette = getPalette(paletteIndex);
    return palette[DefaultIndex];
  }, [chartTheme.state.color, label]);

  return (
    <div className="relative">
      <div
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow"
        onClick={() => {
          setPopoverVisible(true);
        }}
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: `${color}` }}
        ></div>
      </div>

      {popoverVisible && (
        <div
          className="absolute top-6 w-20 overflow-hidden rounded bg-white px-0.5 pt-0.5 drop-shadow-xl"
          ref={colorPopoverRef}
        >
          {colors.map((c, index) => (
            <div
              key={c}
              className="mb-0.5 cursor-pointer rounded"
              onClick={() => {
                chartTheme.dispatch({
                  type: ActionThemeColorUpdate,
                  payload: {
                    label,
                    paletteIndex: index,
                  },
                });
                setPopoverVisible(false);
              }}
            >
              <div
                style={{ backgroundColor: `${c}` }}
                className="h-10 w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSwitcher;
