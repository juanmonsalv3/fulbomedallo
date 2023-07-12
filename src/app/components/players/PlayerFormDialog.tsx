import React, { useCallback, useState } from 'react'
import CustomDialog from '../common/dialogs/CustomDialog'
import { PlayerForm } from './PlayerForm'
import { Player } from '@/types/players'

type Props = {
  player?: Player | null
  isOpen: boolean
  handleClose: () => void
  handleSave: () => void
}

function PlayerFormDialog({ isOpen, handleClose, handleSave, player }: Props) {
  return (
    <CustomDialog
      title="Datos Jugador"
      isOpen={isOpen}
      handleCancel={handleClose}
    >
      <PlayerForm player={player} onSave={handleSave} />
    </CustomDialog>
  )
}

export default PlayerFormDialog
