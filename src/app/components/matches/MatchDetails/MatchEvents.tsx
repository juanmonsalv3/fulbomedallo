import { Match } from '@/types/matches'
import { getMatchStats } from '@/utils/match'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
  matchData: Match
}

function MatchEvents({ matchData }: Props) {
  const stats = getMatchStats(matchData)
  return (
    <Box textAlign="center">
      <Typography variant="h5">Marcador</Typography>
      <Typography variant="h5">
        {stats.team1.goals} - {stats.team2.goals}
      </Typography>
    </Box>
  )
}

export default MatchEvents
