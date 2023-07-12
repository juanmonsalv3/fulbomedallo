import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { matchesApi } from '@/api'
import Loading from '../../common/Loading'
import MatchNav from './MatchNav'
import { Match } from '@/types/matches'
import { Typography } from '@mui/material'

function MatchDetails() {
  const router = useRouter()
  const matchId = router.query.id as string
  const {
    data: matchData,
    error,
    isLoading,
  } = useSWR([`/api/matches/${matchId}`, matchId], ([_, id]) =>
    matchesApi.getMatch(id)
  )

  const { mutate } = useSWRConfig()

  if (isLoading || !matchData) {
    return <Loading />
  }
  return (
    <>
      <Typography variant="h5" textAlign="center">
        {matchData.name}
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        {matchData.date} - {matchData.field?.name}
      </Typography>
      <MatchNav
        matchData={matchData as Match}
        onChange={() => mutate([`/api/matches/${matchId}`, matchId])}
      />
    </>
  )
}

export default MatchDetails
