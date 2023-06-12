import Head from 'next/head';
import { Container, Stack } from '@mui/material';
import { Player } from '@/types/players';
import PlayersList from '@/app/components/players/playersList';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
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
