import Radio, { RadioProps } from '@mui/material/Radio';

export function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      sx={{
        padding: 0,
        color: '#868690',
        '&.Mui-checked': {
          color: '#3A5BEF',
        },
        '&.Mui-disabled': {
          cursor: 'not-allowed',
          pointerEvents: 'auto',
          color: '#868690',
        },
      }}
      {...props}
    />
  );
}
