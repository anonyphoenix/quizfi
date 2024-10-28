import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
//to get data to edit the quiz
import { QuizType } from '@/types/types';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const addr = req.query.addr as string;

  try {

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const data = await db.collection("result").find({ 'userId' : addr }).toArray();
  
    if (!data) {
      res.status(404).json({ message: `not found` });
      return;
    }
    res.status(200).json(JSON.parse(JSON.stringify(data))); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
