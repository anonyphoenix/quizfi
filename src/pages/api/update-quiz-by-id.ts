import { QuizType } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType | { message: string }>
) {
  const quizId = req.query.id as string;

  try {
    if (req.body.questions && req.body.questions.length === 0) {
      res
        .status(400)
        .json({ message: 'Questions length should be greater than zero' });
      return;
    }
    if (
      req.body.questions.some(
        (question: any) => !question.options || question.options.length === 0 ||
          question.options.every((option: any) => option.isAnswer === false)
      )
    ) {
      res
        .status(400)
        .json({ message: 'All questions must have at least one correct option' });
      return;
    }

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB); 
    const quiz = await db.collection("quiz").findOne({ 'id' : quizId});
    const result = await db.collection("result").findOne({ 'quizId' : quizId});

    if (!quiz) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    if (new Date(req.body.startTime) < new Date()) {
      res.status(400).json({ message: `Quiz start time must be in the future!` });
      return;
    }

    if (result) { // TODO check time instead of this
      res.status(400).json({ message: `You cannot edit a quiz after it has started!` });
      return;
    }

    let endTime = new Date(req.body.startTime);
    endTime.setTime(endTime.getTime() + req.body.timeLimit * 60000);
    endTime = new Date(endTime);

    const updatedQuizData: any = {
      ...quiz,
      ...req.body,
      _id: quiz._id,
      updatedAt: new Date(),
      startTime: new Date(req.body.startTime),
      endTime: endTime
    };


    await db.collection('quiz').replaceOne( { 'id' : quizId }, updatedQuizData);

    res.status(200).json(updatedQuizData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
