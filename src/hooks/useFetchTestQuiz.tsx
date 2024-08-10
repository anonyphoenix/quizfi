import { addNotification } from '@/store/reducers/notificationSlice';
import {
  setCurrentQuestion,
  setQuizTestData,
} from '@/store/reducers/quizTestSlice';
import { QuestionType, QuizType } from '@/types/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useFetchTestQuiz = (id: string) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/get-quiz-by-id-test?id=${id}`);
        const data = response.data as QuizType;
        dispatch(setQuizTestData(data));
        dispatch(setCurrentQuestion(data.questions[0]));
        setIsLoading(false);
      } catch (error) {
        dispatch(
          addNotification({
            type: 'error',
            message: 'An error occurred while fetching quizzes',
          })
        );
        setIsLoading(false);
        console.error(error);
      }
    }
    if (id) {
      fetchQuiz();
    }
  }, [id, dispatch]);

  return isLoading;
};
