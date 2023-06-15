import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export const deleteMatch = async (id: any) => {
  const client = await clientPromise;
  const db = client.db('fulbo');
  return await db.collection('matches').deleteOne({ _id: new ObjectId(id) });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    const match = await deleteMatch(id);

    if (!match) {
      res.status(404);
    }

    res.json(match);
  }
};
