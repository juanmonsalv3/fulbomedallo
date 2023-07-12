import { ObjectId } from 'mongodb'
import { Player } from './players'

export interface Field {
  _id: ObjectId
  name: string
  capacity: number
}

export interface Stats {
  id: string
  goles: number
  asistencias: number
}

export interface Match {
  _id: ObjectId
  name: string
  field?: Field
  date: string
  playersList?: MatchPlayersList
  events?: MatchEvent[]
}

export type MatchPlayersList = {
  team1: PlayerPosition[]
  team2: PlayerPosition[]
}

export interface Point {
  x: number
  y: number
}

export interface PlayerPosition extends Point {
  player: Player
}

export type MatchEventType = 'goal' | 'ownGoal'

export type MatchEvent = {
  eventType: MatchEventType
  team: 1 | 2
  player: Player
}
