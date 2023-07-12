import { ObjectId } from 'mongodb'

export interface Player {
  _id: ObjectId | string
  name: string
  nickname: string
}
