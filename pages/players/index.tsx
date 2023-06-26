import Head from 'next/head';
import {Button, Container} from '@mui/material';
import {Player} from '@/types/players';
import PlayersList from '@/app/components/players/PlayersList';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import PageHeader from '@/app/components/common/pageHeader';
import {PlayersForm} from '../../src/app/components/players/players-form';
import CustomDialog from '@/app/components/common/dialogs/CustomDialog';

export default function Players() {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  async function updatePlayers() {
    const result = await axios.get('/api/players');
    setPlayers(result.data as Player[]);
  }

  useEffect(() => {
    updatePlayers();
  }, []);

  const onUpdatePlayerList = useCallback(async () => {
    updatePlayers();
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
        <CustomDialog
          title='Agregar Jugador'
          isOpen={open}
          handleCancel={handleClose}
        >
          <PlayersForm onUpdatePlayerList={onUpdatePlayerList} />
        </CustomDialog>
      </Container>
    </>
  );
}

// export async function getServerSideProps() {
//   try {
//     const players = await getPlayers();
//     return {
//       props: { _players: JSON.parse(JSON.stringify(players)) },
//     };
//   } catch (e) {
//     console.error(e);
//     return { props: { _players: [] } };
//   }
// }
