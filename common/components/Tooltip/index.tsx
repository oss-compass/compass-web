import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CPTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: alpha(theme.palette.common.black, 0.9),
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: alpha(theme.palette.common.black, 0.9),
  },
}));

export default CPTooltip;
