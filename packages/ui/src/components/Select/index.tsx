import React, { PropsWithChildren, forwardRef } from 'react';
import classnames from 'classnames';
import {
  Select as SelectBase,
  SelectProps,
  SelectSlots,
} from '@mui/base/Select';
import useIsDarkMode from '../shared/useIsDarkMode';

interface StyleProps {
  rootClassNames?: string;
}

export const Select = forwardRef(function Select<
  OptionValue,
  Multiple extends boolean
>(
  props: SelectProps<OptionValue, Multiple> & StyleProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { rootClassNames, children, disabled, ...restProps } = props;
  const isDarkMode = useIsDarkMode();

  const rootCls =
    'text-sm box-border px-3 py-2  text-left bg-white  border border-solid border-[#ccc] text-slate-900  transition-all hover:bg-slate-50  outline-0   after:float-right';

  return (
    <SelectBase
      ref={ref}
      disabled={disabled}
      slotProps={{
        root: ({ focusVisible, open }) => {
          const focusCls = focusVisible
            ? 'border-[#ccc] shadow-outline-purple'
            : '';
          const openCls = open ? 'after:content-["▴"]' : 'after:content-["▾"]';
          return {
            className: classnames(rootCls, focusCls, openCls, rootClassNames, [
              disabled ? 'bg-smoke !text-secondary cursor-not-allowed' : '',
            ]),
          };
        },
        listbox: {
          className: classnames(
            'text-sm p-1.5 my-1.5  overflow-auto outline-0 bg-white  border border-solid border-slate-200  text-slate-900  shadow shadow-slate-200',
            rootClassNames
          ),
        },
        popper: { className: `${isDarkMode ? 'dark' : ''} z-10` },
      }}
      {...restProps}
    >
      {children}
    </SelectBase>
  );
}) as <OptionValue, Multiple extends boolean>(
  props: SelectProps<OptionValue, Multiple> &
    React.RefAttributes<HTMLUListElement> &
    StyleProps
) => JSX.Element;

export * from './Options';
