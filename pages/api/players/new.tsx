import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Player } from '@/types/players';

export const addPlayer = async ({ name, nickname }: Player) => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  const result = await db.collection('players').insertOne({
    name,
    nickname,
  });
  return result;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const newPlayer = await addPlayer(req.body as Player);
      res.json(newPlayer);
    } else {
      throw new Error('Invalid method');
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};
