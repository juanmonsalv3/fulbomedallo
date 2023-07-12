import { Match } from '@/types/matches'

export const getMatchStats = (matchData: Match) => {
  return {
    team1: {
      goals: 1,
    },
    team2: {
      goals: 2,
    },
  }
}
