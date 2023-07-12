import styled from '@emotion/styled'
import {
  Avatar,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'

import React from 'react'
import { ObjectId } from 'mongodb'
import Loading from './Loading'

type Item = {
  _id: ObjectId
  primaryText: string
  secondaryText?: string
}

type Props = {
  title: string
  items?: Item[] | null
  noRowsLabel?: string
  onItemClick?: (id: ObjectId) => void
  onEditClick: (id: ObjectId) => void
  onDeleteClick: (id: ObjectId) => void
}

const StyledListItem = styled(ListItem)`
  cursor: pointer;

  :hover {
    background-color: #eee;
  }
`

function EditDeleteList({
  title,
  items,
  noRowsLabel = 'No hay registros',
  onItemClick = () => {},
  onEditClick,
  onDeleteClick,
}: Props) {
  return (
    <>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      {!items && <Loading sx={{ mt: 2 }} />}
      {items && (
        <List>
          {items.length === 0 && (
            <ListItem>
              <ListItemText primary={noRowsLabel} />
            </ListItem>
          )}
          {items.map((item) => (
            <StyledListItem
              key={item._id.toString()}
              secondaryAction={
                <>
                  <Fab
                    color="primary"
                    size="small"
                    onClick={onEditClick.bind(null, item._id)}
                  >
                    <EditIcon fontSize="small" />
                  </Fab>
                  <Fab
                    color="primary"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={onDeleteClick.bind(null, item._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Fab>
                </>
              }
            >
              <ListItemAvatar onClick={onItemClick.bind(null, item._id)}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                onClick={onItemClick.bind(null, item._id)}
                primary={item.primaryText}
                secondary={item.secondaryText}
              />
            </StyledListItem>
          ))}
        </List>
      )}
    </>
  )
}

export default EditDeleteList
