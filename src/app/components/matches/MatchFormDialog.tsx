import React, { useCallback, useState } from 'react'
import CustomDialog from '../common/dialogs/CustomDialog'
import MatchForm from './MatchForm'
import { Match } from '@/types/matches'

type Props = {
  match?: Match | null
  isOpen: boolean
  handleClose: () => void
  handleSave: () => void
}

function MatchFormDialog({ isOpen, handleClose, handleSave, match }: Props) {
  return (
    <CustomDialog
      title="Datos Cotejo"
      isOpen={isOpen}
      handleCancel={handleClose}
    >
      <MatchForm match={match} onSave={handleSave} />
    </CustomDialog>
  )
}

export default MatchFormDialog
