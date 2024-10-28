import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
//to get data to edit the quiz
import { QuizType } from '@/types/types';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const quizId = req.query.id as string;

  try {

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const quiz = await db.collection("quiz").findOne({ 'id' : quizId});

    if (!quiz) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }
    res.status(200).json(JSON.parse(JSON.stringify(quiz))); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
