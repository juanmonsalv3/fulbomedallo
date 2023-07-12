import React, { useCallback, useEffect, useState } from 'react'
import {
  Match,
  MatchEvent,
  MatchEventType,
  PlayerPosition,
} from '@/types/matches'
import CustomDialog from '../../../common/dialogs/CustomDialog'
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Player } from '@/types/players'

interface Props {
  matchData: Match
  eventType: MatchEventType
  isOpen: boolean
  onCancel: () => void
  onSave: (event: MatchEvent) => void
}

function MatchEventDialog({
  matchData,
  isOpen,
  onCancel,
  onSave,
  eventType,
}: Props) {
  const [selectablePlayers, setSelectablePlayers] = useState<PlayerPosition[]>(
    matchData.playersList?.team1 || []
  )
  const [selectedTeam, setSelectedTeam] = useState<1 | 2>(1)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const onTeamSelected = useCallback(
    (team: 1 | 2) => {
      setSelectedTeam(team)
      setSelectablePlayers(
        (team === 1
          ? matchData.playersList?.team1
          : matchData.playersList?.team2) || []
      )
    },
    [matchData]
  )

  const onSelectChange = useCallback(
    (event: SelectChangeEvent) => {
      const selected = selectablePlayers.find(
        (p) => p.player._id.toString() === event.target.value
      ) as PlayerPosition
      setSelectedPlayer(selected.player)
    },
    [selectablePlayers]
  )
  const onSaveClick = useCallback(() => {
    onSave({ player: selectedPlayer!, team: selectedTeam, eventType })
  }, [eventType, onSave, selectedPlayer, selectedTeam])

  return (
    <CustomDialog
      title={`Registrar ${eventType === 'goal' ? 'Gol' : 'AutoGol'}`}
      isOpen={isOpen}
      handleCancel={onCancel}
    >
      <Grid justifyContent="center" minWidth={'270px'}>
        <ButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={selectedTeam === 1 ? 'contained' : 'outlined'}
            onClick={() => onTeamSelected(1)}
          >
            Equipo 1
          </Button>
          <Button
            variant={selectedTeam === 2 ? 'contained' : 'outlined'}
            onClick={() => {
              onTeamSelected(2)
            }}
          >
            Equipo 2
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Jugador</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Jugador"
            value={selectedPlayer?._id.toString() || ''}
            onChange={onSelectChange}
          >
            {selectablePlayers.map((p) => (
              <MenuItem
                key={p.player._id.toString()}
                value={p.player._id.toString()}
              >
                {p.player.nickname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ my: 2 }} textAlign="center">
          <Button
            variant="contained"
            onClick={onSaveClick}
            sx={{ mt: 1, mr: 1 }}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    </CustomDialog>
  )
}

export default MatchEventDialog
