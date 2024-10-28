import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const quizId = req.query.id as string;

  try {

    // TODO incomplete

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB); 
    const quiz = await db.collection("quiz").findOne({ 'id' : quizId});

    if (!quiz) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    const quiz_to_export = JSON.parse(JSON.stringify(quiz));
    delete quiz_to_export["_id"];
    delete quiz_to_export["owner"];

    res.status(200).json(quiz_to_export);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
