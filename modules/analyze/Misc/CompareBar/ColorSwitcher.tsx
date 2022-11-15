import React, { useContext, useMemo, useRef, useState } from 'react';
import {
  ActionThemeColorUpdate,
  ChartThemeContext,
} from '@modules/analyze/context';
import { useClickAway } from 'react-use';
import { CiPickerHalf } from 'react-icons/ci';
import {
  DefaultIndex,
  getPalette,
  colors,
} from '@modules/analyze/options/color';
import CPTooltip from '@common/components/Tooltip';

const ColorSwitcher: React.FC<{
  label: string;
  showPickTooltips?: boolean;
}> = ({ label, showPickTooltips = false }) => {
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
      <CPTooltip
        title="Pick a color you like"
        arrow
        disableHoverListener={!showPickTooltips}
      >
        <div className="group inline-flex cursor-pointer">
          <div
            className="flex h-4 w-4 items-center justify-center rounded-full bg-white drop-shadow"
            onClick={() => {
              setPopoverVisible(true);
            }}
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: `${color}` }}
            />
          </div>
          {showPickTooltips && (
            <CiPickerHalf className="ml-2 text-lg text-white" />
          )}
        </div>
      </CPTooltip>

      {popoverVisible && (
        <div
          className="absolute top-6 flex w-[152px] flex-wrap justify-around overflow-hidden rounded bg-white px-2 pt-2 pb-1 drop-shadow-2xl"
          ref={colorPopoverRef}
        >
          {colors.map((c, index) => (
            <div
              key={c}
              className="mb-1 cursor-pointer rounded"
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
              <div style={{ backgroundColor: `${c}` }} className="h-6 w-6" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSwitcher;
