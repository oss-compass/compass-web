import React, { ReactNode } from 'react';
import clsx from 'classnames';
import { styled } from '@mui/system';
import BaseModal, { ModalProps } from '@mui/base/Modal';

const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = 'Backdrop';

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const Modal = (
  props: ModalProps<'div'> & { children?: ReactNode | undefined }
) => {
  const { children, slots, ...restProps } = props;
  return (
    <StyledModal slots={{ backdrop: StyledBackdrop, ...slots }} {...restProps}>
      {children}
    </StyledModal>
  );
};
