import Head from 'next/head';
import { Container } from '@mui/material';
import PageHeader from '@/app/components/common/pageHeader';
import { useRouter } from 'next/router';
import MatchStepper from '@/app/components/matches/MatchStepper';

export default function MatchDisplay() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Datos del Partido'></PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        {router.query.id}
        <MatchStepper />
      </Container>
    </>
  );
}
