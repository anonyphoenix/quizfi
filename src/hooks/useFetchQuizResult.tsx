import { RootState } from '@/store/reducers';
import { setQuizTestData } from '@/store/reducers/quizTestSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import test from 'node:test';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

type ResultItem = {
  question: string;
  selectedOption: string;
  correctOption: string;
  points: number;
};

type ResultData = {
  score: number;
  maxscore: number;
  totalQuestions: number;
  results: ResultItem[];
  id: string;
};

function useFetchQuizResult() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const testData = useSelector((state: RootState) => state.quizTestData.quiz);
  const router = useRouter();
  const dispatch = useDispatch();
  let addr = useAccount().address;
  if (!addr) {
    addr = '0x0';
  }

  useEffect(() => {
    const postResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const myTestData = { ...testData, 'taker': addr}
        const { data } = await axios.post<ResultData>(
          '/api/get-result',
          myTestData
        );
        setResult(data);
      } catch (error) {
        setError('An error occurred while fetching quiz result');
      } finally {
        setLoading(false);
      }
    };

    if (testData.questions.length > 0) {
      postResult();
    } else {
      router.push('/');
    }
  }, [testData, router, dispatch, addr]);
  
  return { loading, result, error };
}

export default useFetchQuizResult;
