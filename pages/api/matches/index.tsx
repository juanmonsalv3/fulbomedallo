import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { Match } from '@/types/matches'
import { ObjectId } from 'mongodb'

export const getMatches = async () => {
  const client = await clientPromise
  const db = client.db('fulbo')

  const matches = await db
    .collection('matches')
    .find({})
    .sort({ date: 1 })
    .toArray()

  return matches;
}

export const saveMatch = async (matchData: Match) => {
  const client = await clientPromise
  const db = client.db('fulbo')

  const insertData = {
    ...matchData,
  }

  if (matchData.field) {
    insertData.field = {
      ...matchData.field,
      _id: new ObjectId(matchData.field._id),
    }
  }

  return await db.collection('matches').insertOne(insertData)
}

const updateMatch = async (matchData: Match) => {
  const client = await clientPromise
  const db = client.db('fulbo')

  const filter = { _id: matchData._id }
  const options = { upsert: true }
  const updateDoc = {
    $set: {
      ...matchData,
    },
  }

  const result = await db
    .collection('matches')
    .updateOne(filter, updateDoc, options)

  return result
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const match = await updateMatch(req.body)
    res.json(match)
  }

  if (req.method === 'POST') {
    const match = await saveMatch(req.body)
    res.json(match)
  }

  if (req.method === 'GET') {
    await delay(2000)
    const matches = await getMatches()
    res.json(matches)
  }
}
