import PageHeader from '@/app/components/common/pageHeader';
import AddMatchButton from '@/app/components/matches/AddMatchButton';
import MatchesList from '@/app/components/matches/MatchesList';
import { Match } from '@/types/matches';
import { Container, Stack } from '@mui/material';
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import { getMatches } from '../api/matches';

interface MatchesProps {
  _matches: Match[];
}

function Matches({ _matches }: MatchesProps) {
  const [matches, setMatches] = useState(_matches);

  const onMatchAdded = useCallback(() => {
    console.log('redirect to match');
  }, []);

  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <PageHeader title='Cotejos'>
        <Stack direction='row' spacing={2} justifyContent='left'>
          <AddMatchButton onMatchAdded={onMatchAdded} />
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
    const matches = await getMatches();
    return {
      props: { _matches: JSON.parse(JSON.stringify(matches)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Matches;
