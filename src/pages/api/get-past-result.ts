import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

interface ResultType {
  question: string;
  selectedOption: string | undefined;
  correctOption: string | undefined;
  points: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { score: number; maxscore: number; results: ResultType[] } | {}
  >
) {

  const quizId = req.body.quizId;
  const userId = req.body.userId;

  try {

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const quiz = await db.collection("quiz").findOne({ 'id' : quizId, 'endTime': { '$lte' : new Date()} });
    const result = await db.collection("result").findOne({ 'userId' : userId, 'quizId': quizId});


    if (!result) {
      res.status(404).json({ message: 'You have not taken this test yet.' });
      return;
    }

    if (quiz) {
      const score = result.score;
      const maxscore = result.maxScore;
      const totalQuestions = result.totalQuestions;
      const results = result.results;
      const id = quizId;

      res.status(200).json({ score, maxscore, totalQuestions, results, id });
    } else {
      res.status(403).json({ message: 'You can view results only after the exam ends.' })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
