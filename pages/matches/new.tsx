import Head from 'next/head';
import {Container} from '@mui/material';
import {Player} from '@/types/players';
import PageHeader from '@/app/components/common/pageHeader';
import AddMatchForm from '@/app/components/matches/AddMatchForm';

interface PlayersProps {
  _players: Player[];
}

export default function NewMatch({ _players }: PlayersProps) {
  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Lista de Jugadores'></PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        <AddMatchForm onAddMatch={console.log} />
      </Container>
    </>
  );
}
