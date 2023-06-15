import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CustomDialog from '../common/dialogs/CustomDialog';
import MatchForm from './MatchForm';
import { ObjectId } from 'mongodb';

type Props = { onMatchAdded: (id: ObjectId) => void };

function AddMatchButton({ onMatchAdded }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Box>
      <Button variant='contained' onClick={handleOpen}>
        Nuevo
      </Button>
      <CustomDialog
        title='Datos Partido'
        isOpen={open}
        handleCancel={handleClose}
      >
        <MatchForm
          onSave={(id) => {
            setOpen(false);
            onMatchAdded(id)
          }}
        />
      </CustomDialog>
    </Box>
  );
}

export default AddMatchButton;
