import React, { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Match } from '@/types/matches'
import { ObjectId } from 'mongodb'
import MatchForm from './MatchForm'
import CustomDialog from '../common/dialogs/CustomDialog'
import ConfirmDialog from '../common/dialogs/ConfirmDialog'
import { useRouter } from 'next/router'
import EditDeleteList from '../common/EditDeleteList'
import AddMatchButton from './AddMatchButton'
import { matchesApi } from '@/api'
import { toast } from 'react-hot-toast'
import MatchFormDialog from './MatchFormDialog'

const getPrimaryText = (item: Match) =>
  item.name || `${item.field?.name || ''} ${dayjs(item.date).format('DD MMM')}`

const getSecondaryText = (item: Match) =>
  `Campo: ${item.field?.name || ''} - Fecha: ${dayjs(item.date).format(
    'DD MMM'
  )}`

function MatchesList() {
  const router = useRouter()
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [matchEditing, setMatchEditing] = useState<Match>()

  const fetchMatches = useCallback(async () => {
    setMatches(null)
    const matches = await matchesApi.getMatches()
    setMatches(matches)
  }, [])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  const closeEdit = useCallback(() => {
    setOpenEdit(false)
  }, [])

  const closeDelete = useCallback(() => {
    setOpenDelete(false)
  }, [])

  const onMatchClick = useCallback(
    (id: ObjectId) => {
      router.push('/matches/' + id)
    },
    [router]
  )

  const onConfirmDelete = useCallback(async () => {
    if (matchEditing) {
      const response = await matchesApi.deleteMatch(matchEditing?._id)
      if (response.status === 200) {
        setOpenDelete(false)
        toast.success('Cotejo eliminado')
        fetchMatches()
      }
    }
  }, [matchEditing, fetchMatches])

  const onDeleteClick = useCallback(
    (id: ObjectId) => {
      const match = matches?.find((i) => i._id === id)
      if (match) {
        setMatchEditing(match)
        setOpenDelete(true)
      }
    },
    [matches]
  )

  const onEditClick = useCallback(
    async (id: ObjectId) => {
      const match = matches?.find((i) => i._id === id)
      if (match) {
        setMatchEditing(match)
        setOpenEdit(true)
      }
    },
    [matches]
  )

  const items = matches?.map((match) => ({
    _id: match._id,
    primaryText: getPrimaryText(match),
    secondaryText: getSecondaryText(match),
  }))

  return (
    <>
      <EditDeleteList
        title="Cotejos"
        items={items}
        onItemClick={onMatchClick}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
      <CustomDialog
        title="Editar Cotejo"
        isOpen={openEdit}
        handleCancel={closeEdit}
      >
        <MatchFormDialog
          match={matchEditing}
          isOpen={openEdit}
          handleClose={closeEdit}
          handleSave={() => {
            fetchMatches()
            closeEdit()
          }}
        />
      </CustomDialog>
      <ConfirmDialog
        title="Eliminar Cotejo"
        contentText="Desea eliminar este cotejo?"
        isOpen={openDelete}
        handleConfirm={onConfirmDelete}
        handleCancel={closeDelete}
      />
      <AddMatchButton onMatchAdded={fetchMatches} />
    </>
  )
}

export default MatchesList
