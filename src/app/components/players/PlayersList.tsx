import React, { useCallback, useEffect, useState } from 'react'
import { ObjectId } from 'mongodb'
import { toast } from 'react-hot-toast'

import { Player } from '@/types/players'
import CustomDialog from '../common/dialogs/CustomDialog'
import ConfirmDialog from '../common/dialogs/ConfirmDialog'
import EditDeleteList from '../common/EditDeleteList'
import { playersApi } from '@/api'
import AddPlayerButton from './AddPlayerButton'
import PlayerFormDialog from './PlayerFormDialog'

function PlayersList() {
  const [players, setPlayers] = useState<Player[] | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [playerEditing, setPlayerEditing] = useState<Player | null>(null)

  const fetchPlayers = useCallback(async () => {
    setPlayers(null)
    const players = await playersApi.getPlayers()
    setPlayers(players)
  }, [])

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  const onEditClick = async (id: ObjectId) => {
    try {
      const player = players?.find((p) => p._id === id)
      setPlayerEditing(player!)
      setOpenEdit(true)
    } catch (e) {
      toast.error('Algo explotó.')
    }
  }

  const closeEdit = () => {
    setPlayerEditing(null)
    setOpenEdit(false)
  }

  const onDeleteClick = (id: ObjectId) => {
    const player = players?.find((p) => p._id === id)
    setPlayerEditing(player!)
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const confirmDelete = useCallback(async () => {
    try {
      if (playerEditing) {
        await playersApi.deletePlayer(playerEditing._id)
        fetchPlayers()
        toast.success('Jugador eliminado.')
      }
      setOpenDelete(false)
    } catch (e) {
      toast.error('Algo explotó.')
    }
  }, [playerEditing, fetchPlayers])

  const items = players?.map((player) => ({
    _id: player._id,
    primaryText: player.nickname || player.name,
    secondaryText: player.nickname ? player.name : '',
  }))

  return (
    <>
      <EditDeleteList
        title="Jugadores"
        items={items}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
      <CustomDialog
        title="Editar Jugador"
        isOpen={openEdit}
        handleCancel={closeEdit}
      >
        <PlayerFormDialog
          player={playerEditing}
          isOpen={openEdit}
          handleClose={closeEdit}
          handleSave={() => {
            fetchPlayers()
            closeEdit()
          }}
        />
      </CustomDialog>
      <ConfirmDialog
        title="Eliminar Jugador"
        contentText="Desea eliminar el jugador?"
        isOpen={openDelete}
        handleConfirm={confirmDelete}
        handleCancel={closeDelete}
      />
      <AddPlayerButton onPlayerAdded={fetchPlayers} />
    </>
  )
}

export default PlayersList
