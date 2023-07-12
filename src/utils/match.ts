import { Match, MatchEvent } from '@/types/matches'

type TeamStats = {
  goals: number
}

type MatchStats = {
  team1: TeamStats
  team2: TeamStats
}

export const getMatchStats = (matchData: Match): MatchStats => {
  const initialStats = {
    team1: { goals: 0 },
    team2: { goals: 0 },
  } as MatchStats

  const events: MatchStats = matchData.events?.reduce(
    (result: MatchStats, event: MatchEvent) => {
      if (event.eventType === 'goal') {
        if (event.team === 1) {
          result.team1.goals++
        } else {
          result.team2.goals++
        }
      } else if (event.eventType === 'ownGoal') {
        if (event.team === 1) {
          result.team2.goals++
        } else {
          result.team1.goals++
        }
      }

      return result
    },
    { ...initialStats }
  ) || { ...initialStats }

  return events
}
