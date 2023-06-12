import React, { PropsWithChildren, useEffect } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Match } from '@/types/matches';

interface PlayersListProps {
  items: Match[];
}

function MatchesList({ items }: PropsWithChildren<PlayersListProps>) {
  return (
    <List>
      {(!items || items.length === 0) && (
        <ListItem>
          <ListItemText primary='No hay cotejos registrados' />
        </ListItem>
      )}
      {items.map((item) => (
        <ListItem key={item._id}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.place.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default MatchesList;
