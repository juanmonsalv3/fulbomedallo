import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import { Player } from '@/types/players'
import PlayerSelect from './PlayerSelect'

type Point = { x: number; y: number; player?: Player }

let generated: Point[] = []

for (let x = 20; x <= 80; x += 15) {
  for (let y = 20; y <= 80; y += 12) {
    generated.push({ x, y })
  }
}

const _points: Point[] = [{ x: 50, y: 10 }, ...generated, { x: 50, y: 90 }]

function MatchTeams() {
  const [points, setPoints] = useState<Point[]>(_points)
  const [isPickingPlayer, setIsPickingPlayer] = useState<number>(-1)

  const onPlayerSelected = useCallback(
    (player: Player) => {
      points[isPickingPlayer].player = player
      setPoints(points)
      setIsPickingPlayer(-1)
    },
    [isPickingPlayer, points]
  )
  return (
    <>
      <Box
        marginX="auto"
        sx={{
          position: 'relative',
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
      <PlayerSelect
        isOpen={isPickingPlayer > -1}
        onSave={onPlayerSelected}
        onCancel={() => setIsPickingPlayer(-1)}
      />
    </>
  )
}

export default MatchTeams
