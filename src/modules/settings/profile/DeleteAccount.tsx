import React, { useEffect } from 'react';
import client from '@graphql/client';
import { useTranslation } from 'next-i18next';
import { useDeleteUserMutation } from '@graphql/generated';
import { Button } from '@oss-compass/ui';
import { userInfoStore, userEvent } from '@modules/auth/UserInfoStore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grow from '@mui/material/Grow';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
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

const DeleteAccount = () => {
  const { t } = useTranslation();
  const mutation = useDeleteUserMutation(client);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="pb-2 pt-10 text-xl font-bold">
        {t('setting:profile.delete_account')}
      </div>
      <div className="mb-4">{t('setting:profile.delete_account_warning')}</div>
      <Button
        intent="danger"
        onClick={() => {
          setOpen(true);
        }}
      >
        {t('setting:profile.delete_account_btn')}
      </Button>

      <Dialog
        className="py-6"
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('setting:profile.delete_account')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="text-black"
            id="alert-dialog-description"
          >
            {t('setting:profile.delete_account_warning')}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-6">
          <Button
            intent="text"
            size="sm"
            className="mr-2"
            onClick={handleClose}
          >
            {t('common:btn.cancel')}
          </Button>
          <Button
            intent="danger"
            size="sm"
            loading={mutation.isLoading}
            onClick={async () => {
              mutation.mutate(
                {},
                {
                  onSuccess: () => {
                    userInfoStore.event$?.emit(userEvent.REFRESH);
                  },
                }
              );
            }}
          >
            {t('setting:profile.delete_account_btn')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAccount;
