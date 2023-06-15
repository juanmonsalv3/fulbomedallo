import Head from 'next/head';
import { Button, Container } from '@mui/material';
import { Player } from '@/types/players';
import PlayersList from '@/app/components/players/PlayersList';
import { getPlayers } from '../api/players';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import PageHeader from '@/app/components/common/pageHeader';
import { PlayersForm } from '../../src/app/components/players/players-form';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CustomDialog from '@/app/components/common/dialogs/CustomDialog';

interface PlayersProps {
  _players: Player[];
}

export default function Players({ _players }: PlayersProps) {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState(_players);

  const onUpdatePlayerList = useCallback(async () => {
    const result = await axios.get('/api/players');
    setPlayers(result.data as Player[]);
    handleClose();
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
        <Button variant='contained' onClick={handleClickOpen}>
          Nuevo
        </Button>
      </PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        <PlayersList items={players} onUpdatePlayerList={onUpdatePlayerList} />
        <CustomDialog title='Editar Jugador' isOpen={open} handleCancel={handleClose}>
          <PlayersForm onUpdatePlayerList={onUpdatePlayerList} />
        </CustomDialog>
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
