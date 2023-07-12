import { ObjectId } from 'mongodb'

export interface Player {
  _id: ObjectId
  name: string
  nickname: string
}
