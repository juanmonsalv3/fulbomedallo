import Head from 'next/head';
import { Container } from '@mui/material';
import { Player } from '@/types/players';
import PageHeader from '@/app/components/common/pageHeader';
import { useRouter } from 'next/router';

export default function MatchDisplay() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Lista de Jugadores'></PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        {router.query.id}
      </Container>
    </>
  );
}
