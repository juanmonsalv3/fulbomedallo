import React, { Suspense } from 'react'
import Head from 'next/head'
import MatchesList from '@/app/components/matches/MatchesList'
import Loading from '@/app/components/common/Loading'

function Matches() {
  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <MatchesList />
      </Suspense>
    </>
  )
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

export default Matches
