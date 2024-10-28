import { QuizType } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import clientPromise from "../../../lib/mongodb";
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizType[] | {}>
) {
  const client = clientPromise;

  if (req.method === 'POST') {
    try {
      
      const form = new multiparty.Form();
      const data : any = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) reject({ err });
          resolve({ fields, files });
        });
      });

      const images: string[] = [];

      for (let i = 0 ; i < data.files.files.length ; i++) {
        const tmp_file = data.files.files[i].path;
        const ext = path.extname(tmp_file);
        // TODO check MIME not extension
        if (ext.toLowerCase() === ".png" || ext.toLowerCase() === ".jpg" || ext.toLowerCase() === ".jpeg" || ext.toLowerCase() === ".webp"){
          const new_name = uuidv4() + ext;
          fs.copyFile(tmp_file, process.env.IMAGE_STORAGE_PATH + new_name, (err) => {});
          images.push(new_name);
        }
      }

      res.status(200).json({"images": images});
    } catch (err) {
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    // Handle other methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }

}

export const config = {
  api: {
    bodyParser: false,
  },
};
