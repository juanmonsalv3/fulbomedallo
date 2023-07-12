import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { Player } from '@/types/players'
import PlayerSelect from './PlayerSelect'
import { Match, PlayerPosition, Point } from '@/types/matches'
import { matchesApi } from '@/api'
import { toast } from 'react-hot-toast'

interface Props {
  matchData: Match
}

type PlayerPoint = Point & {
  player?: Player
}

let generated: PlayerPoint[] = []

for (let x = 20; x <= 80; x += 15) {
  for (let y = 20; y <= 80; y += 12) {
    generated.push({ x, y })
  }
}

const _points = [{ x: 50, y: 10 }, ...generated, { x: 50, y: 90 }]

const teams = {
  team1: [],
  team2: [],
}

function MatchTeams({ matchData }: Props) {
  const [points, setPoints] = useState<PlayerPoint[]>(_points)
  const [isPickingPlayer, setIsPickingPlayer] = useState<number>(-1)

  const onPlayerSelected = useCallback(
    (player: Player) => {
      points[isPickingPlayer].player = player
      setPoints(points)
      setIsPickingPlayer(-1)
    },
    [isPickingPlayer, points]
  )

  const onSaveClick = useCallback(async () => {
    const pointsSelected1 = points.filter((p) => !!p.player && p.y < 50)
    const pointsSelected2 = points.filter((p) => !!p.player && p.y > 50)

    const response = await matchesApi.editMatch({
      ...matchData,
      playersList: {
        team1: pointsSelected1 as PlayerPosition[],
        team2: pointsSelected2 as PlayerPosition[],
      },
    })
    if ((response.status = 200)) {
      toast.success('Cambios guardados')
    }
  }, [matchData, points])

  return (
    <>
      <Box
        marginX="auto"
        sx={{
          position: 'relative',
          width: '320px',
          height: '500px',
        }}
      >
        <Image src="/field.jpg" width={320} height={500} alt="field" />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        >
          {points.map((point, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: point.y + '%',
                left: point.x + '%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'gray',
                cursor: 'pointer',
                borderRadius: '12px',
              }}
            >
              {point.player && (
                <Typography
                  variant="body2"
                  sx={{ backgroundColor: '#FFF', px: 1 }}
                >
                  {point.player.nickname}
                </Typography>
              )}
              {!point.player && (
                <Box
                  sx={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '12px',
                    opacity: 0.7,
                    ':hover': {
                      outline: '1px solid blue',
                      outlineOffset: '2px',
                      backgroundColor: 'blue',
                    },
                  }}
                  onClick={() => setIsPickingPlayer(i)}
                ></Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ my: 2 }} textAlign="center">
        <Button variant="contained" onClick={onSaveClick} sx={{ mt: 1, mr: 1 }}>
          Guardar
        </Button>
      </Box>
      <PlayerSelect
        isOpen={isPickingPlayer > -1}
        onSave={onPlayerSelected}
        onCancel={() => setIsPickingPlayer(-1)}
      />
    </>
  )
}

export default MatchTeams
