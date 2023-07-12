import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Match } from '@/types/matches'

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
      ...newMatch.field,
      _id: new ObjectId(newMatch.field._id),
    }
  }
  if (newMatch.playersList) {
    insertData.playersList = insertData.playersList?.map((p) => ({
      ...p,
      _id: new ObjectId(p._id),
    }))
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
