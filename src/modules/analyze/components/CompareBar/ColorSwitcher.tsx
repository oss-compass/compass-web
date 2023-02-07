import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChartThemeState,
  chartThemeState,
  updateThemeColor,
} from '@modules/analyze/store';
import { useClickAway, useHoverDirty, useLocalStorage } from 'react-use';
import { CgColorPicker } from 'react-icons/cg';
import {
  DefaultIndex,
  getPalette,
  colors,
} from '@modules/analyze/options/color';
import CPTooltip from '@common/components/Tooltip';
import { getNameSpace } from '@common/utils';
import { useSnapshot } from 'valtio';
import Popper from '@mui/material/Popper';

const getColor = (label: string, theme: DeepReadonly<ChartThemeState>) => {
  const current = theme.color.find((i) => i.label === label);
  if (!current) return { palette: [] };

  const { paletteIndex } = current;
  const palette = getPalette(paletteIndex);
  return palette[DefaultIndex];
};

const SHOWED_PICKER_TOOLTIPS_KEY = 'showed-picker-tooltips';

const ColorSwitcher: React.FC<{
  label: string;
  className?: string;
  showPickGuideIcon?: boolean;
  showGuideTips?: boolean;
}> = ({ label, showPickGuideIcon = false, showGuideTips = false }) => {
  const colorPopoverRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [hasShowedGuide, setShowedGuideTooltips] = useLocalStorage(
    SHOWED_PICKER_TOOLTIPS_KEY,
    false
  );

  const theme = useSnapshot(chartThemeState);
  const color = getColor(label, theme);

  useClickAway(colorPopoverRef, () => {
    setPopoverVisible(false);
  });

  const isHover = useHoverDirty(iconsRef);

  const isOpen = useMemo(() => {
    if (isHover && !popoverVisible) {
      return true;
    }
    return !hasShowedGuide && showGuideTips;
  }, [hasShowedGuide, showGuideTips, isHover, popoverVisible]);

  useEffect(() => {
    if (isOpen && isHover) {
      setShowedGuideTooltips(true);
    }
  }, [isOpen, isHover, setShowedGuideTooltips]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <CPTooltip title="Pick a color you like" arrow open={isOpen}>
          <div
            className="group inline-flex cursor-pointer"
            ref={iconsRef}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
              setPopoverVisible(true);
            }}
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white drop-shadow">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: `${color}` }}
              />
            </div>
            {showPickGuideIcon && (
              <CgColorPicker className="ml-1 hidden text-lg text-white group-hover:block" />
            )}
          </div>
        </CPTooltip>
        {showPickGuideIcon && (
          <div className="ml-2 truncate text-base text-white/50 opacity-100 transition-all group-hover:opacity-0">
            {getNameSpace(label)}
          </div>
        )}
      </div>
      <Popper
        open={popoverVisible}
        anchorEl={anchorEl}
        placement={'bottom-start'}
        sx={{
          zIndex: 9999,
        }}
      >
        <div
          className="flex w-[152px] flex-wrap justify-around overflow-hidden rounded bg-white px-2 pt-2 pb-1 drop-shadow-2xl"
          ref={colorPopoverRef}
        >
          {colors.map((c, index) => (
            <div
              key={c}
              className="mb-1 cursor-pointer rounded"
              onClick={() => {
                updateThemeColor({ label, paletteIndex: index });
                setPopoverVisible(false);
              }}
            >
              <div style={{ backgroundColor: `${c}` }} className="h-6 w-6" />
            </div>
          ))}
        </div>
      </Popper>
      {/* {popoverVisible && (
        <div
          className="absolute top-8 flex w-[152px] flex-wrap justify-around overflow-hidden rounded bg-white px-2 pt-2 pb-1 drop-shadow-2xl"
          ref={colorPopoverRef}
        >
          {colors.map((c, index) => (
            <div
              key={c}
              className="mb-1 cursor-pointer rounded"
              onClick={() => {
                updateThemeColor({ label, paletteIndex: index });
                setPopoverVisible(false);
              }}
            >
              <div style={{ backgroundColor: `${c}` }} className="h-6 w-6" />
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ColorSwitcher;
