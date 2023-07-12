import Head from 'next/head'
import MatchDetail from '@/app/components/matches/MatchDetails'

export default function MatchDisplay() {
  
  return (
    <>
      <Head>
        <title>Fulbo Medallo</title>
      </Head>
      <MatchDetail />
    </>
  )
}
