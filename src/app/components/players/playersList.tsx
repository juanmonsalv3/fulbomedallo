import { Player } from '@/types/players';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

interface PlayersListProps {
  items: Player[];
}

function PlayersList({ items }: PropsWithChildren<PlayersListProps>) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar alt='avatar' src='/avatar-icon.svg' />
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default PlayersList;
