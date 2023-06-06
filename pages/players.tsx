import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { Button, Container, Stack } from '@mui/material';
import { Player } from '@/types/players';
import PlayersList from '@/app/components/players/playersList';
import { getPlayersList } from './api/players';
import AddPlayerButton from '@/app/components/players/addPlayerButton';

interface PlayersProps {
  players: Player[];
}

export default function Players({ players }: PlayersProps) {
  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 4,
          pb: 2,
        }}
      >
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom
          >
            Lista de Jugadores
          </Typography>
          <Stack direction='row' spacing={2} justifyContent='center'>
            <AddPlayerButton />
          </Stack>
        </Container>
      </Box>
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
      props: { players: JSON.parse(JSON.stringify(players)) },
    };
  } catch (e) {
    console.error(e);
  }
}
