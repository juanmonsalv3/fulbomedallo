import React, { Key, PropsWithChildren, useCallback, useState } from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Player } from '@/types/players';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ObjectId } from 'mongodb';
import { toast } from 'react-hot-toast';
import { PlayersForm } from './players-form';
import CustomDialog from '../common/dialogs/CustomDialog';

import axios from 'axios';
import ConfirmDialog from '../common/dialogs/ConfirmDialog';

interface PlayersListProps {
  items: Player[];
  onUpdatePlayerList: () => void;
}
function PlayersList({
  items,
  onUpdatePlayerList,
}: PropsWithChildren<PlayersListProps>) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [playerId, setPlayerId] = useState<any>(null);
  const [playerEditing, setPlayerEditing] = useState<Player>();

  const onEdit = async (id: ObjectId) => {
    try {
      const response = await axios.get(`/api/players/${id}`);

      setPlayerEditing(response.data);
      setOpenEdit(true);
    } catch (e) {
      toast.error('Algo explotó.');
    }
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };

  const onDelete = (id: ObjectId) => {
    setPlayerId(id);
    setOpenDelete(true);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = useCallback(async () => {
    try {
      await axios.delete(`/api/players/${playerId}`);
      onUpdatePlayerList();
      toast.success('Jugador eliminado.');

      setOpenDelete(false);
    } catch (e) {
      toast.error('Algo explotó.');
    }
  }, [onUpdatePlayerList, playerId]);

  return (
    <>
      <List>
        {(!items || items.length === 0) && (
          <ListItem>
            <ListItemText primary='No hay jugadores registrados' />
          </ListItem>
        )}
        {items.map((item) => (
          <ListItem
            key={item._id as unknown as Key}
            secondaryAction={
              <>
                <IconButton onClick={onEdit.bind(null, item._id as ObjectId)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={onDelete.bind(null, item._id as ObjectId)}>
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
            <ListItemText primary={item.nickname} secondary={item.name} />
          </ListItem>
        ))}
      </List>
      <CustomDialog title='Editar Jugador' isOpen={openEdit} handleCancel={closeEdit}>
        <PlayersForm
          player={playerEditing}
          onUpdatePlayerList={onUpdatePlayerList}
          closeEdit={closeEdit}
        />
      </CustomDialog>
      <ConfirmDialog
        title='Eliminar Jugador'
        contentText='Desea eliminar el jugador?'
        isOpen={openDelete}
        handleConfirm={handleDelete}
        handleCancel={closeDelete}
      />
    </>
  );
}

export default PlayersList;
