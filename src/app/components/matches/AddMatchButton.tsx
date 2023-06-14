import { Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Modal from '../common/modal';
import AddMatchForm from './AddMatchForm';

type Props = { onPlayerAdded: () => void };

function AddMatchButton({ onPlayerAdded }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Nuevo
      </Button>
      <Modal open={open} onClose={handleClose}>
        <>
          <Typography variant='h6' gutterBottom>
            Datos Partido
          </Typography>
          <AddMatchForm onAddMatch={console.log}/>
        </>
      </Modal>
    </div>
  );
}

export default AddMatchButton;
