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

//to dispay data after the quiz attempt starts ( including questions and options but excluding correct answers)
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

    const modifiedQuestions = quiz.questions.map((question: any) => {
      const modifiedOptions = question.options.map((option: any) => ({
        ...option,
        isAnswer: false,
      }));
      return {
        ...question,
        options: modifiedOptions,
      };
    });

    const modifiedQuizData = {
      ...quiz,
      questions: modifiedQuestions,
    };

    res.status(200).json(modifiedQuizData);


/*     const quizCollectionRef = collection(db, 'quizzes');
    const quizQuery = query(quizCollectionRef, where('id', '==', quizId));
    const quizDocs = await getDocs(quizQuery);

    if (quizDocs.size === 0) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    const quizData = quizDocs.docs[0].data() as QuizType;

    // modify quizData to make all isAnswer values false
    const modifiedQuestions = quizData.questions.map((question) => {
      const modifiedOptions = question.options.map((option) => ({
        ...option,
        isAnswer: false,
      }));
      return {
        ...question,
        options: modifiedOptions,
      };
    });

    const modifiedQuizData = {
      ...quizData,
      questions: modifiedQuestions,
    };

    res.status(200).json(modifiedQuizData); */
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
