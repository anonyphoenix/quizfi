import { QuestionType, QuizType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { DarkMode } from '@mui/icons-material';
/* import { db } from '../../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore'; */

interface ResultType {
  question: string;
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
        (option) => option.isAnswer
      );
      if (userSelectedOption?.id === correctOption?.id) {
        score += Number(question.points);
      }
      maxscore += Number(question.points);
      results.push({
        question: `#${i + 1}:` + question.prompt,
        selectedOption: userSelectedOption?.title,
        correctOption: correctOption?.title || '',
        points: question.points,
      });
    }

    await db.collection('result').updateOne( { 'quizId' : quizId, 'userId' : taker }, 
      {$set: { 'title': quiz.title, 'score' : score, 'maxScore': maxscore,
         'prizeWon': 0, 'time': new Date(), 'results': results}}, {upsert: true});

    res.status(200).json({ score, maxscore, totalQuestions, results, id });

    /* 
    const quizCollectionRef = collection(db, 'quizzes');
    const quizQuery = query(quizCollectionRef, where('id', '==', quiz.id));
    const quizDocs = await getDocs(quizQuery);

    if (quizDocs.size === 0) {
      res.status(404).json({ message: `Quiz with id '${quiz.id}' not found` });
      return;
    }

    const quizData = quizDocs.docs[0].data() as QuizType;
    const userAnswers = quiz.questions;

    let score: number = 0;
    let maxscore: number = 0;
    const results: ResultType[] = [];

    for (let i = 0; i < quizData.questions.length; i++) {
      const question: QuestionType = quizData.questions[i];
      const correctOption = question.options.find((option) => option.isAnswer);
      const userSelectedOption = userAnswers[i].options.find(
        (option) => option.isAnswer
      );
      if (userSelectedOption?.id === correctOption?.id) {
        score += Number(question.points);
      }
      maxscore += Number(question.points);
      results.push({
        question: `Question ${i + 1}`,
        selectedOption: userSelectedOption?.title,
        correctOption: correctOption?.title || '',
        points: question.points,
      });
    }

    res.status(200).json({ score, maxscore, results }); */
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
