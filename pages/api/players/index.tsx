import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { Player } from '@/types/players'

export const addPlayer = async (playerData: Player) => {
  const client = await clientPromise
  const db = client.db('fulbo')

  return await db.collection('players').insertOne(playerData)
}

export const getPlayers = async () => {
  const client = await clientPromise
  const db = client.db('fulbo')

  return await db
    .collection('players')
    .find({})
    .sort({ nickname: 1 })
    .collation({ locale: 'en', caseLevel: true })
    .toArray()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const player = await addPlayer(req.body)

    res.json(player)
  }

  if (req.method === 'GET') {
    const players = await getPlayers()

    res.json(players)
  }
}
