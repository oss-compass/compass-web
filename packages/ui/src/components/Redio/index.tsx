import Radio, { RadioProps } from '@mui/material/Radio';

export function CustomRadio(
  props: RadioProps & {
    checkedColor?: string;
  }
) {
  const { checkedColor = '#3A5BEF', ...restProps } = props;
  return (
    <Radio
      disableRipple
      sx={{
        padding: 0,
        color: '#868690',
        '&.Mui-checked': {
          color: checkedColor,
        },
        '&.Mui-disabled': {
          cursor: 'not-allowed',
          pointerEvents: 'auto',
          color: '#868690',
        },
      }}
      {...restProps}
    />
  );
}
