import React from 'react';
import classnames from 'classnames';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grow from '@mui/material/Grow';
import { TransitionProps } from '@mui/material/transitions';

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Grow ref={ref} {...props}>
      {props.children}
    </Grow>
  );
});

const CSDialog = ({
  className,
  open,
  dialogTitle,
  dialogContent,
  dialogActions,
  handleClose,
  ...props
}: {
  className?: string;
  open: boolean;
  dialogTitle?: React.ReactNode;
  dialogContent: React.ReactNode;
  dialogActions?: React.ReactNode;
  handleClose: () => void;
} & DialogProps) => {
  return (
    <Dialog
      open={open}
      className={classnames('py-6', className)}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      {dialogActions ? (
        <DialogActions className="!p-6">{dialogActions}</DialogActions>
      ) : null}
    </Dialog>
  );
};

export default CSDialog;
