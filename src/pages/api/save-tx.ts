import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {

  const quizId = req.query.quizId as string;
  const amount = parseFloat(req.query.amount as string);
  const hash = req.query.hash as string;

  try {

    // TODO check hash!

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    await db.collection('quiz').updateOne( { 'id' : quizId }, 
      {$set: { 'prizeAmount': amount}}, {upsert: true});

    await db.collection('payment').insertOne({
      'quizId': quizId,
      'amount': amount,
      'hash': hash,
      'time': new Date()
    })
  
    res.status(200).json({ 'message': 'done'}); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
