import { QuizType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
/* import { db } from '../../../firebase/firebase';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'; */

//to dispay data before the quiz attempt starts ( exclude questions and options )
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<QuizType> | { message: string }>
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

    const totalPoints: number = quiz.questions.reduce(
      (total, question) => total + Number(question.points),
      0
    );

    const modifiedQuizData: Partial<QuizType> = {
      id: quiz.id,
      description: quiz.description,
      title: quiz.title,
      timelimit: quiz.timelimit,
      points: totalPoints,
      startTime: quiz.startTime
    };

    res.status(200).json(modifiedQuizData);


    /* const quizCollectionRef = collection(db, 'quizzes');
    const quizQuery = query(quizCollectionRef, where('id', '==', quizId));
    const quizDocs = await getDocs(quizQuery);

    if (quizDocs.size === 0) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    const quizData = quizDocs.docs[0].data() as QuizType;

    // calculate total points
    const totalPoints: number = quizData.questions.reduce(
      (total, question) => total + Number(question.points),
      0
    );

    const modifiedQuizData: Partial<QuizType> = {
      id: quizData.id,
      description: quizData.description,
      title: quizData.title,
      timelimit: quizData.timelimit,
      points: totalPoints,
    };

    res.status(200).json(modifiedQuizData); */
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
