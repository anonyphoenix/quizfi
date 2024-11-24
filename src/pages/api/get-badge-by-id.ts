import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { QuizType } from '@/types/types';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {

  const badgeId = req.query.id as string;

  try {

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const badge = await db.collection("badge").findOne({ 'id' : badgeId});

    if (!badge) {
      res.status(404).json({ message: `Badge with id '${badgeId}' not found` });
      return;
    }
    res.status(200).json(JSON.parse(JSON.stringify(badge))); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
