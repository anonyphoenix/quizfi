// pages/api/addQuiz.js
import { QuizType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import clientPromise from "../../../lib/mongodb";
/* import { db } from '../../../firebase/firebase';
import {
  addDoc,
  collection,
  getDoc,
  getFirestore,
  Timestamp,
} from 'firebase/firestore'; */

//post request to create a new quiz with quiz title as body
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const client = await clientPromise;

  // Check for POST request
  if (req.method === 'POST') {
    try {
      // Get data from request body
      const data = req.body as QuizType; // Type assertion for data

      const db = client.db(process.env.MONGODB_DB); 
      const collection = db.collection<QuizType>('quiz'); 

      const endTime = new Date(new Date().getTime() + 600000);

      const quiz: QuizType = {
        id: uuidv4(),
        title: req.body.title,
        description: 'Enter description',
        questions: [
          {
            id: uuidv4(),
            prompt: 'Enter question',
            points: Number(1),
            options: [{ id: uuidv4(), title: 'Enter option', isAnswer: false }],
          },
        ],
        updatedAt: new Date(),
        timelimit: 10,
        owner: req.body.owner,
        status: 'private',
        startTime: new Date(),
        endTime: endTime,
        prizeAmount: 0
      };

      await collection.insertOne(quiz);

      res.status(200).json(quiz);
    } catch (err) {
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    // Handle other methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }


  /* const quiz: QuizType = {
    id: uuidv4(),
    title: req.body.title,
    description: 'enter description',
    questions: [
      {
        id: uuidv4(),
        prompt: 'New Question',
        points: Number(1),
        options: [{ id: uuidv4(), title: 'Option', isAnswer: false }],
      },
    ],
    updatedAt: Timestamp.fromDate(new Date()),
    timelimit: 10,
  };

  // Initialize quizzes collection
  const quizzesCollection = collection(db, 'quizzes');

  try {
    const docRef = await addDoc(quizzesCollection, quiz);
    // Get the newly added document from the database to retrieve the id field
    const docSnapshot = await getDoc(docRef);
    const quizData = docSnapshot.data();
    res.status(200).json({ ...quizData });
  } catch (error) {
    console.error('Error adding quiz: ', error);
    res.status(500).json({ error });
  } */
}
