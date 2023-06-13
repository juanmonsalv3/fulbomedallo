import clientPromise from "../../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from 'mongodb';
import {Player} from "@/types/players";

export const getPlayer = async (id: any) => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  return await db.collection('players').findOne({_id: new ObjectId(id)});
}

export const updatePlayer = async (id: any, player: Player) => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  delete player._id;

  return await db.collection('players').updateOne({_id: new ObjectId(id)},  { $set: { ...player } });
}

export const deletePlayer = async (id: any) => {
  const client = await clientPromise;
  const db = client.db('fulbo');

  return await db.collection('players').deleteOne({_id: new ObjectId(id)});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (req.method === 'GET') {
    const player = await getPlayer(id);

    if (!player) {
     res.status(404);
    }

    res.json(player)
  }

  if (req.method === 'PATCH') {
    const player = await updatePlayer(id, req.body);

    if (!player) {
     res.status(404);
    }

    res.json(player)
  }

  if (req.method === 'DELETE') {
    const player = await deletePlayer(id);

    if (!player) {
     res.status(404);
    }

    res.json(player)
  }
}