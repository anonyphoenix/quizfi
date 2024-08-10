import clientPromise from "../../lib/mongodb";
import { GetServerSideProps } from 'next';
import { Timestamp } from "mongodb";

interface OptionType {
    id: string;
    title: string;
    isAnswer: boolean;
}
  
interface QuestionType {
    id: string;
    prompt: string;
    points: number;
    options: OptionType[];
}
  
interface QuizType {
    id: string;
    title: string;
    timelimit: number;
    description: string;
    questions: QuestionType[];
    updatedAt?: Timestamp;
    points?: number; // make points property optional
}


interface Movie {
   _id: string;
   title: string;
   metacritic: number;
   plot: string;
}


interface QuestionsProps {
   questions: QuestionType[];
}


const Questions: React.FC<QuestionsProps> = ({ questions }) => {
   return (
       <div>
           <h1>Questions</h1>
           <p>
               <small>(According to Metacritic)</small>
           </p>
           <ul>
               {questions?.map((question) => (
                   <li key={question.id}>
                       <h2>{question.prompt}</h2>
                       <h3>{question.points}</h3>
                   </li>
               ))}
           </ul>
       </div>
   );
};


export default Questions;


export const getServerSideProps: GetServerSideProps = async () => {
   try {
       const client = await clientPromise;
       const db = client.db(process.env.MONGODB_DB);
       const questions = await db
           .collection("questions")
           .find({})
           .sort({ id : -1 })
           .limit(20)
           .toArray();
       return {
           props: { movies: JSON.parse(JSON.stringify(questions)) },
       };
   } catch (e) {
       console.error(e);
       return { props: { questions: [] } };
   }
};