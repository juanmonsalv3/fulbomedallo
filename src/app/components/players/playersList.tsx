import React, { PropsWithChildren, useEffect } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Player } from '@/types/players';
import { toast } from 'react-hot-toast';

interface PlayersListProps {
  items: Player[];
}

function PlayersList({ items }: PropsWithChildren<PlayersListProps>) {
  return (
    <List>
      {(!items || items.length === 0) && (
        <ListItem>
          <ListItemText primary='No hay jugadores registrados' />
        </ListItem>
      )}
      {items.map((item) => (
        <ListItem key={item._id}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.nickname} secondary={item.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default PlayersList;
