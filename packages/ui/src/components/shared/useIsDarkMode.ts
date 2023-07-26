import { useTheme } from '@mui/system';

export default function useIsDarkMode() {
  // todo
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}
