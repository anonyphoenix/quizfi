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
  images: string[];
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

function useFetchPastQuizResult(id: string | string[] | undefined) {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
        const { data } = await axios.post<ResultData>(
          '/api/get-past-result',
          {'userId': addr, 'quizId': id}
        );
        setResult(data);
      } catch (error: any) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
      postResult();
  }, [router, dispatch, addr, id]);
  
  return { loading, result, error };
}

export default useFetchPastQuizResult;
