import { Match, MatchEvent, MatchEventType } from '@/types/matches'
import { getMatchStats } from '@/utils/match'
import { Box, Fab, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useCallback, useState } from 'react'
import MatchEventDialog from './MatchEventDialog'
import { matchesApi } from '@/api'

interface Props {
  matchData: Match
  onChange: () => void
}

function MatchEvents({ matchData, onChange }: Props) {
  const stats = getMatchStats(matchData)

  const [eventType, setEventType] = useState<MatchEventType | null>(null)

  const onEventSave = useCallback(
    async (event: MatchEvent) => {
      await matchesApi.editMatch({
        ...matchData,
        events: [...(matchData.events || []), event],
      })

      onChange()
    },
    [matchData, onChange]
  )

  return (
    <Box textAlign="center">
      <Typography variant="h5">Marcador</Typography>
      <Typography variant="h5">
        {stats.team1.goals} - {stats.team2.goals}
      </Typography>

      <Grid gap={1} display="flex" justifyContent="center">
        <Fab
          size="medium"
          variant="extended"
          color="primary"
          onClick={() => setEventType('goal')}
        >
          <AddIcon sx={{ mr: 1 }} />
          Gol
        </Fab>
        <Fab
          size="medium"
          variant="extended"
          color="primary"
          onClick={() => setEventType('ownGoal')}
        >
          <AddIcon sx={{ mr: 1 }} />
          AutoGol
        </Fab>
      </Grid>
      <Grid>
        {matchData.events?.map((e, i) => (
          <Typography key={i} textAlign={e.team === 1 ? 'left' : 'right'}>
            {e.eventType === 'goal' ? 'GOL' : 'AUTOGOL'}: {e.player.nickname}
          </Typography>
        ))}
      </Grid>
      {eventType && (
        <MatchEventDialog
          matchData={matchData}
          isOpen={!!eventType}
          eventType={eventType}
          onCancel={() => setEventType(null)}
          onSave={onEventSave}
        />
      )}
    </Box>
  )
}

export default React.memo(MatchEvents)
