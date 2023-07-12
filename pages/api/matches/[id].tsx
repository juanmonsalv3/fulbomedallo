import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Match } from '@/types/matches'
import { setObjectId } from '@/utils/mongo'

export const getMatch = async (id: string) => {
  const client = await clientPromise
  const db = client.db('fulbo')
  return await db.collection('matches').findOne({ _id: new ObjectId(id) })
}

export const deleteMatch = async (id: any) => {
  const client = await clientPromise
  const db = client.db('fulbo')
  return await db.collection('matches').deleteOne({ _id: new ObjectId(id) })
}

export const updateMatch = async (id: any, match: Match) => {
  const client = await clientPromise
  const db = client.db('fulbo')

  const { _id, ...newMatch } = match

  const insertData = {
    ...newMatch,
  }

  if (newMatch.field) {
    insertData.field = {
      ...setObjectId(newMatch.field),
    }
  }
  if (newMatch.playersList) {
    insertData.playersList = {
      team1: newMatch.playersList.team1.map((p) => ({
        ...p,
        player: { ...setObjectId(p.player) },
      })),
      team2: newMatch.playersList.team2.map((p) => ({
        ...p,
        player: { ...setObjectId(p.player) },
      })),
    }
  }

  return await db
    .collection('matches')
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...insertData } })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string

  let match

  switch (req.method) {
    case 'GET':
      match = await getMatch(id)
      break
    case 'DELETE':
      match = await deleteMatch(id)
      break
    case 'PATCH':
      match = await updateMatch(id, req.body)
      break
    default:
      break
  }

  if (!match) {
    res.status(500)
  }
  res.json(match)
}
