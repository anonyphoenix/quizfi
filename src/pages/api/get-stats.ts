import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { } | {}  >
) {

  const quizId = req.body.quizId;
  const userId = req.body.userId;

  try {

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const quiz = await db.collection("quiz").findOne({ 'id' : quizId, 'owner': userId});

    if (!quiz){
      res.status(404).json({ message: 'You don\'t have a quiz with this ID.' });
      return;
    }

    const results = await db.collection("result").find({ 'quizId': quizId }).toArray();


    res.status(200).json(JSON.parse(JSON.stringify(results)));
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
