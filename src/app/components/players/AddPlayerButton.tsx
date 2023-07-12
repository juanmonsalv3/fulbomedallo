import { Box, Button, Fab, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import PlayerFormDialog from './PlayerFormDialog'

type Props = {
  onPlayerAdded?: () => void
}

function AddPlayerButton({ onPlayerAdded = () => {} }: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [setOpen])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleSave = useCallback(() => {
    onPlayerAdded()
    setOpen(false)
  }, [setOpen, onPlayerAdded])

  return (
    <>
      <Fab
        color="primary"
        size="large"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>
      <PlayerFormDialog
        isOpen={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </>
  )
}

export default AddPlayerButton
