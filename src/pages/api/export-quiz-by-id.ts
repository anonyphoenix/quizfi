import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";
import * as AdmZip from 'adm-zip';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
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

    const quizToExport = JSON.parse(JSON.stringify(quiz));

    if (new Date(quiz.endTime).getTime() > new Date().getTime()){
      res.status(403).json({ message: `This quiz has not ended yet` });
      return;
    }

    delete quizToExport["_id"];
    delete quizToExport["owner"];

    const zip = new AdmZip();
    for (let i = 0 ; i < quizToExport.questions.length ; i++) {
      if (quizToExport.questions[i].images) {
        for (let j = 0 ; j < quizToExport.questions[i].images.length ; j++) {
          zip.addLocalFile(process.env.IMAGE_STORAGE_PATH + quizToExport.questions[i].images[j]);
        }
      }
    }
    zip.addFile(`${quizId}.json`, Buffer.from(JSON.stringify(quizToExport), "utf8"));

    const zipFileContents = zip.toBuffer();
    res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${quizId}.zip"`,
        'Content-Type': 'application/zip',
      })
    return void res.end(zipFileContents);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
