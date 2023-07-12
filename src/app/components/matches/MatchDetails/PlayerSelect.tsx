import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import CustomDialog from '../../common/dialogs/CustomDialog'
import { Player } from '@/types/players'
import { Autocomplete, TextField } from '@mui/material'
import { playersApi } from '@/api'
import Loading from '../../common/Loading'

interface Props {
  isOpen: boolean
  onSave: (player: Player) => void
}

function PlayerSelect({ isOpen, onSave }: Props) {
  const {
    data: selectablePlayers,
    error,
    isLoading,
  } = useSWR(`/api/players`, playersApi.getPlayers)

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  useEffect(() => {
    setSelectedPlayer(null)
  }, [isOpen])

  const onPlayerSelected = useCallback(
    (_event: SyntheticEvent, player: Player | null) => {
      if (player) {
        onSave(player)
      }
    },
    [onSave]
  )

  if (!selectablePlayers || isLoading) {
    return <Loading />
  }
  return (
    <CustomDialog title="Selecciona un Jugador" isOpen={isOpen}>
      <Autocomplete
        options={selectablePlayers}
        getOptionLabel={(option: Player) =>
          typeof option === 'string' ? option : option.nickname
        }
        renderOption={(props, option: Player) => (
          <li {...props}>
            {(option as Player).nickname} - {(option as Player).name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Agregar Jugador" />
        )}
        onChange={onPlayerSelected}
        value={selectedPlayer}
      />
    </CustomDialog>
  )
}

export default PlayerSelect
