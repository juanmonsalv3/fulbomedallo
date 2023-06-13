import {ObjectId} from "mongodb";

export interface Player {
  _id?: ObjectId;
  name: string
  lastName: string
  telephone: string
  jerseyNumber: number
  email: string
  position: string
  nickname: string
}