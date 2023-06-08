import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { Button, Container, Stack } from '@mui/material';
import { Player } from '@/types/players';
import PlayersList from '@/app/components/players/playersList';
import { getPlayersList } from './api/players';
import AddPlayerButton from '@/app/components/players/addPlayerButton';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '@/app/components/common/pageHeader';

interface PlayersProps {
  _players: Player[];
}

export default function Players({ _players }: PlayersProps) {
  const [players, setPlayers] = useState(_players);

  const onPlayerAdded = useCallback(async () => {
    const result = await axios.get('/api/players');
    setPlayers(result.data as Player[]);
  }, []);

  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Lista de Jugadores'>
        <Stack direction='row' spacing={2} justifyContent='left'>
          <AddPlayerButton onPlayerAdded={onPlayerAdded} />
        </Stack>
      </PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        <PlayersList items={players} />
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const players = await getPlayersList();
    return {
      props: { _players: JSON.parse(JSON.stringify(players)) },
    };
  } catch (e) {
    console.error(e);
  }
}
