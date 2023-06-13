import React, {PropsWithChildren, useState} from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText,} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Player} from '@/types/players';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ObjectId} from "mongodb";
import {toast} from "react-hot-toast";
import {PlayersForm} from "../../../../components/players/PlayersForm";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import styles from './PlayersList.module.scss';

interface PlayersListProps {
  items: Player[];
  onUpdatePlayerList: () => void;
}
function PlayersList({ items, onUpdatePlayerList }: PropsWithChildren<PlayersListProps>) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [playerId, setPlayerId] = useState<any>(null);
  const [player, setPlayer] = useState<Player>();

  const onEdit = async (id: ObjectId) => {
    try {
      const response = await axios.get(`/api/players/${id}`);

      setPlayer(response.data)
      setOpenEdit(true);
    } catch (e) {
      toast.error('Algo explotó.');
    }
  };

  const closeEdit = () => {setOpenEdit(false)};

  const onDelete = (id: ObjectId) => {
    setPlayerId(id);
    setOpenDelete(true);
  };

  const closeDelete = () => {setOpenDelete(false)};

  const handleCloseDelete = async () => {
    try {
      await axios.delete(`/api/players/${playerId}`);
      onUpdatePlayerList();
      toast.success('Jugador eliminado.');

      setOpenDelete(false);
    } catch (e) {
      toast.error('Algo explotó.');
    }
  };

  return (
    <>
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
            <EditIcon onClick={onEdit.bind(null, item._id)}/>
            <DeleteIcon onClick={onDelete.bind(null, item._id)}/>
        </ListItem>
      ))}
    </List>
      <Dialog open={openEdit} onClose={closeEdit}>
        <DialogTitle className={styles.dialogTitle}>
                <span>
                    Editar Jugador
                </span>
                <HighlightOffIcon onClick={closeEdit} />
            </DialogTitle>
        <DialogContent>
          <PlayersForm player={player} onUpdatePlayerList={onUpdatePlayerList} closeEdit={closeEdit}/>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={closeDelete}>
        <DialogTitle>Eliminar Jugador</DialogTitle>
        <DialogContent>
          <DialogContentText>Desea eliminar el jugador?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelete}>No</Button>
          <Button onClick={handleCloseDelete} variant="contained">Si</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PlayersList;
