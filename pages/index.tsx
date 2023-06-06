import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Head from 'next/head';
import Link from '@/app/components/common/Link';

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
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <Typography variant='h4'>
        Fulbo Medallo
      </Typography>

      <Link variant='contained' type='button' href='/players'>
        Lista de Jugadores
      </Link>
    </Box>
  );
}
