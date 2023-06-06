import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export const getPlayersList = async () => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  const players = await db
    .collection('players')
    .find({})
    .sort({ name: 1 })
    .collation({ locale: 'en', caseLevel: true })
    .toArray();
  return players;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const players = await getPlayersList();
    res.json(players);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};
