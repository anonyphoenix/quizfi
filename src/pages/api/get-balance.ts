import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id as string;

  try {

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const userBalance = await db.collection("balance").findOne({ 'userId' : userId});

    if (!userBalance) {
      res.status(404).json({ message: `User with id '${userId}' not found` });
      return;
    }
    res.status(200).json(JSON.parse(JSON.stringify(userBalance))); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
