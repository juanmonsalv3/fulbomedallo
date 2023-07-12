import { Match, MatchPlayersList } from '@/types/matches'
import useSWR from 'swr'
import Person from '@mui/icons-material/Person'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material'
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { matchesApi, playersApi } from '@/api'
import Loading from '../../common/Loading'
import { Player } from '@/types/players'
import { toast } from 'react-hot-toast'

interface Props {
  matchData: Match
  onSave: () => void
}

function MatchPlayersList({ matchData, onSave }: Props) {
  const {
    data: _selectablePlayers,
    error,
    isLoading,
  } = useSWR(`/api/players`, playersApi.getPlayers)

  // list allowed to select
  const [selectablePlayers, setSelectablePlayers] = useState<MatchPlayersList>(
    _selectablePlayers as MatchPlayersList
  )

  // input list to keep track of selections
  const [selectedPlayers, setSelectedPlayers] = useState<MatchPlayersList>([])

  // Match Selection
  const [matchPlayers, setMatchPlayers] = useState<MatchPlayersList>(
    matchData.playersList || []
  )

  const onPlayerSelected = useCallback(
    (_event: SyntheticEvent, players: (string | Player)[]) => {
      setMatchPlayers((_players) => [..._players, players[0] as Player])
      setSelectablePlayers((list) => list.filter((p) => !players.includes(p)))
      setSelectedPlayers([])
    },
    []
  )

  useEffect(() => {
    const filtered = _selectablePlayers?.filter(
      (p) => !matchData.playersList?.map((_p) => _p._id).includes(p._id)
    )
    setSelectablePlayers(filtered as Player[])
  }, [_selectablePlayers, matchData.playersList])

  const onSaveClick = useCallback(() => {
    matchesApi.editMatch({ ...matchData, playersList: matchPlayers })
    toast.success('Lista guardada')
    onSave()
  }, [matchData, matchPlayers, onSave])

  const onRemovePlayer = useCallback((player: Player) => {
    setMatchPlayers((_players) => _players.filter((p) => p !== player))
    setSelectablePlayers((list) => [...list, player])
  }, [])

  if (!selectablePlayers || isLoading) {
    return <Loading />
  }

  const capacity = matchData.field?.capacity || 18
  const canAdd = selectedPlayers.length < capacity

  return (
    <Box maxWidth="sm" sx={{ margin: 'auto' }}>
      <Grid>
        <Autocomplete
          multiple
          options={selectablePlayers}
          disabled={!canAdd}
          getOptionLabel={(option: Player | string) =>
            typeof option === 'string' ? option : option.nickname
          }
          renderOption={(props, option: Player | string) => (
            <li {...props}>
              {(option as Player).nickname} - {(option as Player).name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Agregar Jugador" />
          )}
          onChange={onPlayerSelected}
          value={selectedPlayers}
        />
      </Grid>
      <Grid>
        {matchPlayers.length > 0 && (
          <List
            sx={{
              mt: 4,
            }}
          >
            {matchPlayers.map((player) => (
              <ListItem disablePadding key={player._id.toString()}>
                <ListItemButton>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={player.nickname || player.name} />
                  <ListItemIcon onClick={() => onRemovePlayer(player)}>
                    <PersonRemoveAlt1Icon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>

      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={onSaveClick} sx={{ mt: 1, mr: 1 }}>
          Guardar lista
        </Button>
      </Box>
    </Box>
  )
}

export default MatchPlayersList
