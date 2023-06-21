import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Match } from '@/types/matches';
import { ObjectId } from 'mongodb';

export const getMatches = async () => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  const matches = await db
    .collection('matches')
    .aggregate([
      {
        $lookup: {
          from: 'fields',
          localField: 'field_id',
          foreignField: '_id',
          as: 'field',
        },
      },
    ])
    .sort({ date: 1 })
    .toArray();

  return matches.map((match) => ({
    ...match,
    field: match.field.length > 0 ? match.field[0] : {},
  }));
};

export const saveMatch = async (
  matchData: Omit<Match, 'field'> & { field_id: string }
) => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  return await db
    .collection('matches')
    .insertOne({ ...matchData, field_id: new ObjectId(matchData.field_id) });
};

const updateMatch = async (matchData: Match) => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  const filter = { _id: matchData._id };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      ...matchData,
    },
  };

  const result = await db
    .collection('matches')
    .updateOne(filter, updateDoc, options);

  return result;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const match = await updateMatch(req.body);
    res.json(match);
  }

  if (req.method === 'POST') {
    const match = await saveMatch(req.body);
    res.json(match);
  }

  if (req.method === 'GET') {
    const matches = await getMatches();

    res.json(matches);
  }
};
