import { QuizType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";
/* import { db } from '../../../firebase/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'; */

//to get data to display the quiz cards on index page
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<QuizType>[] | { message: string }>
) {
  try {

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); 
    const q : { [key: string]:string | any} = {};
    if (req.query){
      if (req.query.status){
        q['status'] = req.query.status;
      }
      if (req.query.owner){
        q['owner'] = req.query.owner;
      }
      if (req.query.ongoing) {
        q['startTime'] = { '$lte' : new Date() }
        q['endTime'] = { '$gte' : new Date() }
      }
      if (req.query.upcoming) {
        q['startTime'] = { '$gte' : new Date()}
      }
      if (req.query.finished) {
        q['endTime'] = { '$lte' : new Date()}
      }
    }
    const quizList = await db.collection("quiz").find(q).sort({ 'updatedAt' : -1}).limit(10).toArray();


    /* const quizCollection = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(
      query(quizCollection, orderBy('updatedAt', 'desc'))
    ); */

    res.status(200).json(JSON.parse(JSON.stringify(quizList)));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
