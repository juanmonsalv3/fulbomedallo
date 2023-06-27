import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  Avatar,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import dayjs from 'dayjs'
import { Match } from '@/types/matches'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ObjectId } from 'mongodb'
import MatchForm from './MatchForm'
import CustomDialog from '../common/dialogs/CustomDialog'
import ConfirmDialog from '../common/dialogs/ConfirmDialog'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
interface PlayersListProps {
  items: Match[]
  updateMatchesList: () => void
}
const getPrimaryText = (item: Match) =>
  item.name || `${item.field?.name || ''} ${dayjs(item.date).format('DD MMM')}`

const getSecondaryText = (item: Match) =>
  `Campo: ${item.field?.name || ''} - Fecha: ${dayjs(item.date).format(
    'DD MMM'
  )}`

const StyledListItem = styled(ListItem)`
  cursor: pointer;
`

function MatchesList({
  items,
  updateMatchesList,
}: PropsWithChildren<PlayersListProps>) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [matchEditing, setMatchEditing] = useState<Match>()

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

  const confirmDelete = useCallback(async () => {
    const response = await axios.delete(`/api/matches/${matchEditing?._id}`)
    if (response.status === 200) {
      updateMatchesList()
      setOpenDelete(false)
    }
  }, [matchEditing, updateMatchesList])

  const onDeleteClick = useCallback(
    (id: ObjectId) => {
      const match = items.find((i) => i._id === id)
      if (match) {
        setMatchEditing(match)
        setOpenDelete(true)
      }
    },
    [items]
  )

  const onEditClick = useCallback(
    async (id: ObjectId) => {
      const match = items.find((i) => i._id === id)
      if (match) {
        setMatchEditing(match)
        setOpenEdit(true)
      }
    },
    [items]
  )

  return (
    <>
      <List>
        {(!items || items.length === 0) && (
          <ListItem>
            <ListItemText primary="No hay cotejos registrados" />
          </ListItem>
        )}
        {items.map((item) => (
          <StyledListItem
            key={item._id.toString()}
            secondaryAction={
              <>
                <IconButton onClick={onEditClick.bind(null, item._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={onDeleteClick.bind(null, item._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar onClick={onMatchClick.bind(null, item._id)}>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              onClick={onMatchClick.bind(null, item._id)}
              primary={getPrimaryText(item)}
              secondary={getSecondaryText(item)}
            />
          </StyledListItem>
        ))}
      </List>
      <CustomDialog
        title="Editar Cotejo"
        isOpen={openEdit}
        handleCancel={closeEdit}
      >
        <MatchForm matchData={matchEditing} onSave={closeEdit} />
      </CustomDialog>
      <ConfirmDialog
        title="Eliminar Cotejo"
        contentText="Desea eliminar este cotejo?"
        isOpen={openDelete}
        handleConfirm={confirmDelete}
        handleCancel={closeDelete}
      />
    </>
  )
}

export default MatchesList
