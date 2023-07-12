import { Box, Button, Fab, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CustomDialog from '../common/dialogs/CustomDialog'
import MatchForm from './MatchForm'
import MatchFormDialog from './MatchFormDialog'

type Props = { onMatchAdded: () => void }

function AddMatchButton({ onMatchAdded }: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [setOpen])
  const handleClose = useCallback(() => setOpen(false), [setOpen])

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
      <MatchFormDialog
        isOpen={open}
        handleClose={handleClose}
        handleSave={() => {
          setOpen(false)
          onMatchAdded()
        }}
      />
    </>
  )
}

export default AddMatchButton
