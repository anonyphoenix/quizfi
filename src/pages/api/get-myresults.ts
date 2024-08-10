import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
//to get data to edit the quiz
import { QuizType } from '@/types/types';
/* import { db } from '../../../firebase/firebase';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'; */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const addr = req.query.addr as string;

  try {

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const data = await db.collection("result").find({ 'userId' : addr }).toArray();
  
    if (!data) {
      res.status(404).json({ message: `not found` });
      return;
    }
    res.status(200).json(JSON.parse(JSON.stringify(data))); 

    /*  const quizCollectionRef = collection(db, 'quizzes');
    const quizQuery = query(quizCollectionRef, where('id', '==', quizId));
    const quizDocs = await getDocs(quizQuery); 

    if (quizDocs.size === 0) {
      res.status(404).json({ message: `Quiz with id '${quizId}' not found` });
      return;
    }

    const quizData = quizDocs.docs[0].data() as QuizType;
    res.status(200).json(quizData); */
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
