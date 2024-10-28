import { QuestionType, QuizType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

interface ResultType {
  question: string;
  images: string[];
  selectedOption: string | undefined;
  correctOption: string | undefined;
  points: number;
}

// calculate quiz result based on user's answers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { score: number; maxscore: number; results: ResultType[] } | {}
  >
) {

  // TODO make sure time is not passed

  const quizId: QuizType = req.body.id;
  const userAnswers = req.body.questions;
  const taker = req.body.taker;

  try {

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const quiz = await db.collection("quiz").findOne({ 'id' : quizId});


    if (!quiz) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    let score: number = 0;
    let maxscore: number = 0;
    const totalQuestions = quiz.questions.length;
    const results: ResultType[] = [];
    const id = quizId;

    for (let i = 0; i < quiz.questions.length; i++) {
      const question: QuestionType = quiz.questions[i];
      const correctOption = question.options.find((option) => option.isAnswer);
      const userSelectedOption = userAnswers[i].options.find(
        (option: any) => option.isAnswer
      );
      if (userSelectedOption?.id === correctOption?.id) {
        score += Number(question.points);
      }
      maxscore += Number(question.points);
      results.push({
        question: `#${i + 1}:` + question.prompt,
        images: question.images,
        selectedOption: userSelectedOption?.title,
        correctOption: correctOption?.title || '',
        points: question.points,
      });
    }

    await db.collection('result').updateOne( { 'quizId' : quizId, 'userId' : taker }, 
      {$set: { 'title': quiz.title, 'score' : score, 'maxScore': maxscore,
         'prizeWon': 0, 'time': new Date(), 'endTime': quiz.endTime, 'results': results}}, {upsert: true});

    res.status(200).json({ score, maxscore, totalQuestions, results, id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
