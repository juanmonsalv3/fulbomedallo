import PageHeader from '@/app/components/common/pageHeader';
import AddMatchButton from '@/app/components/matches/AddMatchButton';
import MatchesList from '@/app/components/matches/MatchesList';
import { Match } from '@/types/matches';
import { Container, Stack } from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react';

interface MatchesProps {
  _matches: Match[];
}

function Matches({ _matches }: MatchesProps) {
  const [matches, setMatches] = useState(_matches);

  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Cotejos'>
        <Stack direction='row' spacing={2} justifyContent='left'>
          <AddMatchButton onPlayerAdded={console.log} />
        </Stack>
      </PageHeader>
      <Container sx={{ py: 4 }} maxWidth='md'>
        <MatchesList items={matches} />
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const matches = [
      {
        _id: 'asdasdasd',
        name: 'Sr Gol 10 junio',
        place: {
          _id: 'asdasdfdgf',
          name: 'Señor Gol',
          type: '7v7',
        },
      },
    ];
    return {
      props: { _matches: JSON.parse(JSON.stringify(matches)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Matches;
