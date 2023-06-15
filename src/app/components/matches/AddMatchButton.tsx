import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Modal from '../common/modal';
import AddMatchForm from './AddMatchForm';
import Dialog from '../common/dialogs/Dialog';
import MatchForm from './MatchForm';

type Props = { onMatchAdded: () => void };

function AddMatchButton({ onMatchAdded }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Box>
      <Button variant='contained' onClick={handleOpen}>
        Nuevo
      </Button>
      <Dialog title='Datos Partido' isOpen={open} handleCancel={handleClose}>
        <MatchForm onSave={onMatchAdded} />
      </Dialog>
    </Box>
  );
}

export default AddMatchButton;
