import React, { PropsWithChildren } from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type DialogProps = {
  title: string;
  isOpen: boolean;
  showActions?: boolean;
  handleCancel?: () => void;
  handleSubmit?: () => void;
};

const DialogTitleWrapper = styled(Grid)`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

function Dialog({
  title,
  isOpen,
  showActions = false,
  handleCancel,
  handleSubmit,
  children,
}: PropsWithChildren<DialogProps>) {
  return (
    <MuiDialog open={isOpen} onClose={handleCancel}>
      <DialogTitleWrapper>
        <DialogTitle>
          {title}
          <StyledCloseButton onClick={handleCancel}>
            <CloseRoundedIcon />
          </StyledCloseButton>
        </DialogTitle>
      </DialogTitleWrapper>
      <DialogContent>{children}</DialogContent>
      {showActions && (
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
}

export default Dialog;
