import Head from 'next/head';
import {Button, Container} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {Player} from '@/types/players';
import PlayersList from '@/app/components/players/PlayersList';
import {getPlayers} from '../api/players';
import React, {useCallback, useState} from 'react';
import axios from 'axios';
import PageHeader from '@/app/components/common/pageHeader';
import {PlayersForm} from "../../components/players/PlayersForm";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface PlayersProps {
  _players: Player[];
}

export default function Players({ _players }: PlayersProps) {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState(_players);

  const onUpdatePlayerList = useCallback(async () => {
    const result = await axios.get('/api/players');
    setPlayers(result.data as Player[]);
    handleClose()
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Lista de Jugadores'>
          <Button variant="contained" onClick={handleClickOpen}>Nuevo Jugador</Button>
      </PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        <PlayersList items={players} onUpdatePlayerList={onUpdatePlayerList} />
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <span>
                    Agregar Jugador
                </span>
                <HighlightOffIcon onClick={handleClose} />
            </DialogTitle>
            <DialogContent>
                <PlayersForm onUpdatePlayerList={onUpdatePlayerList}/>
            </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const players = await getPlayers();
    return {
      props: { _players: JSON.parse(JSON.stringify(players)) },
    };
  } catch (e) {
    console.error(e);
  }
}
