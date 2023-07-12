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
}

export type MatchPlayersList = Player[];