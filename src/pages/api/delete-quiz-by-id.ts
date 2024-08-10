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


//post requeqst to delete the quiz with it's id
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  try {
    const id = req.query.id as string;

    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);
    const quiz = await db.collection("quiz").findOne({ 'id' : id});

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    await db.collection('quiz').deleteOne({ 'id' : id })

    /* 
    const quizCollection = collection(db, 'quizzes');
    const quizQuery = query(quizCollection, where('id', '==', id));
    const quizSnapshot = await getDocs(quizQuery);

    if (quizSnapshot.empty) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const quizDoc = quizSnapshot.docs[0];
    await deleteDoc(quizDoc.ref); */
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
