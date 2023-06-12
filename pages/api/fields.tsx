import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export const getFieldsList = async () => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  const fields = await db
    .collection('fields')
    .find({})
    .sort({ name: 1 })
    .collation({ locale: 'en', caseLevel: true })
    .toArray();
  return fields;
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fields = await getFieldsList();
    res.json(fields);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};
