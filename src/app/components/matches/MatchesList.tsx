import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import dayjs from 'dayjs';
import { Match } from '@/types/matches';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ObjectId } from 'mongodb';
interface PlayersListProps {
  items: Match[];
}
const getPrimaryText = (item: Match) =>
  item.name || `${item.field?.name || ''} ${dayjs(item.date).format('DD MMM')}`;

const getSecondaryText = (item: Match) =>
  `Campo: ${item.field?.name || ''} - Fecha: ${dayjs(item.date).format(
    'DD MMM'
  )}`;

function MatchesList({ items }: PropsWithChildren<PlayersListProps>) {
  const onDelete = useCallback((id: ObjectId) => {
    console.log('delete', id);
  }, []);

  const onEdit = useCallback(async (id: ObjectId) => {
    console.log('edit', id);
  }, []);

  return (
    <List>
      {(!items || items.length === 0) && (
        <ListItem>
          <ListItemText primary='No hay cotejos registrados' />
        </ListItem>
      )}
      {items.map((item) => (
        <ListItem
          key={item._id.toString()}
          secondaryAction={
            <>
              <IconButton onClick={onEdit.bind(null, item._id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDelete.bind(null, item._id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={getPrimaryText(item)}
            secondary={getSecondaryText(item)}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default MatchesList;
