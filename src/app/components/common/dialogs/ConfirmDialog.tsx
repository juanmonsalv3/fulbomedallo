import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  contentText: string;
  handleCancel: () => void;
  handleConfirm: () => void;
  mainButtonText?: string;
  cancelButtonText?: string;
};

const StyledDialog = styled(DialogContent)`
  min-width: 400px;
`;

function ConfirmDialog({
  isOpen,
  handleCancel,
  handleConfirm,
  title,
  contentText,
  mainButtonText = 'Acceptar',
  cancelButtonText = 'Cancelar ',
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <StyledDialog>
        <DialogContentText>{contentText}</DialogContentText>
      </StyledDialog>
      <DialogActions>
        <Button onClick={handleCancel}>{cancelButtonText}</Button>
        <Button onClick={handleConfirm} autoFocus>
          {mainButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
