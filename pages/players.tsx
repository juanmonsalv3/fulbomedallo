import clientPromise from '../lib/mongodb';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getPlayersList } from './api/players';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Lista de Rodillones
      </Typography>
    </Box>
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
