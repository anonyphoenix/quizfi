import useFetchQuizResult from '@/hooks/useFetchQuizResult';
import { RootState } from '@/store/reducers';
import { setQuizTestData } from '@/store/reducers/quizTestSlice';
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useAccount } from 'wagmi';
import clientPromise from '../../lib/mongodb';


function MyResults() {
  const [result, setResult] = useState<any | undefined>(undefined);
  const {address} = useAccount();
  if (!address) {
    return (
      <Box mt={4} sx={{ width: '80%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Connect your wallet to view your quiz results.
      </Typography>
      </Box>
    );
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          `/api/get-myresults?addr=${address}`
        );
        setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  });

  const questionStyle = {
    backgroundColor: '#FFF9C4',
    p: 2,
    mb: 1,
  };

  const answerStyle = {
    p: 2,
    mb: 1,
  };

  const correctAnswerStyle = {
    ...answerStyle,
    backgroundColor: '#C8E6C9',
  };

  const wrongAnswerStyle = {
    ...answerStyle,
    backgroundColor: '#FFCDD2',
  };

  return (
    <Box mt={4} sx={{ width: '80%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Quiz Report
      </Typography>
      {result ? (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            You took {result.length} exams so far.
          </Typography>
          <Box>
            {result.map((resultItem: any) => (
              <Card sx={{ p: 3, mb: 2 }} key={resultItem.question}>
                <Typography variant="h6" sx={questionStyle}>
                  {resultItem.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={ correctAnswerStyle }
                >
                  <strong>Your score:</strong>{' '}
                  {resultItem.score} out of {resultItem.maxScore}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={ correctAnswerStyle }
                >
                  <strong>Prize won:</strong>{' '}
                  {resultItem.prizeWon}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={answerStyle }
                >
                  <strong>
                    Quiz taken at:
                  </strong>{' '}
                  {resultItem.time}
                </Typography>
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Box>
  );
}

export default MyResults;
