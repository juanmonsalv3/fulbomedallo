import Head from 'next/head'
import PlayersList from '@/app/components/players/PlayersList'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import Loading from '@/app/components/common/Loading'

export default function Players() {
  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <PlayersList />
      </Suspense>
    </>
  )
}

// export async function getServerSideProps() {
//   try {
//     const players = await getPlayers();
//     return {
//       props: { _players: JSON.parse(JSON.stringify(players)) },
//     };
//   } catch (e) {
//     console.error(e);
//     return { props: { _players: [] } };
//   }
// }
