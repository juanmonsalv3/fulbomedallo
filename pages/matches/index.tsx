import PageHeader from '@/app/components/common/pageHeader';
import AddMatchButton from '@/app/components/matches/AddMatchButton';
import MatchesList from '@/app/components/matches/MatchesList';
import { Match } from '@/types/matches';
import { Container, Stack } from '@mui/material';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { getMatches } from '../api/matches';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';

function Matches() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = useCallback(async () => {
    const response = await axios.get('/api/matches');
    setMatches(response.data as Match[]);
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const updateMatchesList = useCallback(async () => {
    fetchMatches();
  }, [fetchMatches]);

  const onMatchAdded = useCallback(
    (id: ObjectId) => {
      router.push('/matches/' + id);
    },
    [router]
  );

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
        <MatchesList items={matches} updateMatchesList={updateMatchesList} />
      </Container>
    </>
  );
}

// export async function getServerSideProps() {
//   try {
//     const matches = await getMatches();
//     return {
//       props: { _matches: JSON.parse(JSON.stringify(matches)) },
//     };
//   } catch (e) {
//     console.error(e);
//     return { props: { _matches: [] } };
//   }
// }

export default Matches;
