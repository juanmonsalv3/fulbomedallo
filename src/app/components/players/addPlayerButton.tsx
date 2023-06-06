import { Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Modal from '../common/modal';
import AddPlayerForm from './addPlayerForm';

function AddPlayerButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Agregar Jugador
      </Button>
      <Modal open={open} onClose={handleClose}>
        <>
          <Typography variant='h6' gutterBottom>
            Datos Jugador
          </Typography>
          <AddPlayerForm />
        </>
      </Modal>
    </div>
  );
}

export default AddPlayerButton;
