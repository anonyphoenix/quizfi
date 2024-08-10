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
