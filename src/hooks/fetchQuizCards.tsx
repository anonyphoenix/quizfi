import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  addQuizCardsData,
  addUserQuizCardsData,
  addOngoingQuizCardsData,
  addUpcomingQuizCardsData,
  addFinishedQuizCardsData,
  removeQuizCardsData,
} from '@/store/reducers/quizCardsSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useFetchQuizCards = (owner?: string, limit?: number) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        let base_url = '/api/get-all-quizzes?'
        const response_all = await axios.get(base_url);
        dispatch(addQuizCardsData(response_all.data));
        const response_ongoing = await axios.get(base_url + 'ongoing=true&status=public');
        dispatch(addOngoingQuizCardsData(response_ongoing.data));
        const response_upcoming = await axios.get(base_url + 'upcoming=true&status=public');
        dispatch(addUpcomingQuizCardsData(response_upcoming.data));
        const response_finished = await axios.get(base_url + 'finished=true&status=public');
        dispatch(addFinishedQuizCardsData(response_finished.data))
        if (typeof owner !== 'undefined') {
          base_url += 'owner=' + owner + '&';
          const response_user = await axios.get(base_url);
          dispatch(addUserQuizCardsData(response_user.data));
        }
      } catch (error) {
        dispatch(
          addNotification({
            type: 'error',
            message: 'An error occurred while fetching quizzes',
          })
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();

    return () => {
      dispatch(removeQuizCardsData());
    };
  }, [dispatch, owner]);
  // }, [dispatch]);

  return loading;
};

export default useFetchQuizCards;
