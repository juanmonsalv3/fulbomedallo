import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Head from 'next/head';
import CustomLink from '@/app/components/common/CustomLink';

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

      <CustomLink variant='contained' type='button' href='/players/index'>
        Lista de Jugadores
      </CustomLink>
    </Box>
  );
}
