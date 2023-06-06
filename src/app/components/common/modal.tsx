import styled from '@emotion/styled';
import { Box, Modal as MuiModal, ModalProps as MuiModalProps } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const StyledBox = styled(Box)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 400px;
background-color: #fff;
border: 2px solid #000;
padding: 32px;
`;

function Modal({ children, open, onClose }: MuiModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledBox>{children}</StyledBox>
    </MuiModal>
  );
}

export default Modal;
