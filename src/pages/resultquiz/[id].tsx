import useFetchPastQuizResult from '@/hooks/useFetchPastQuizResult';
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
};

function Result() {
  const router = useRouter();
  const id = router.query.id;
  const { result, loading, error } = useFetchPastQuizResult(id);
  
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
            You scored {result.score} out of {result.maxscore}
          </Typography>
          <Box>
            {result.results.map((resultItem) => (
              <Card sx={{ p: 3, mb: 2 }} key={resultItem.question}>
                <Typography variant="h6" sx={questionStyle}>
                  {resultItem.question}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={
                    resultItem.selectedOption === resultItem.correctOption
                      ? correctAnswerStyle
                      : wrongAnswerStyle
                  }
                >
                  <strong>Your answer:</strong>{' '}
                  {resultItem.selectedOption ? resultItem.selectedOption : 'NA'}
                </Typography>
                <Typography variant="subtitle1" sx={correctAnswerStyle}>
                  <strong>Correct answer:</strong> {resultItem.correctOption}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={
                    resultItem.selectedOption === resultItem.correctOption
                      ? correctAnswerStyle
                      : wrongAnswerStyle
                  }
                >
                  <strong>
                    {resultItem.selectedOption === resultItem.correctOption
                      ? 'Points Scored:'
                      : 'Points Lost:'}
                  </strong>{' '}
                  {resultItem.points}
                </Typography>
              </Card>
            ))}
          </Box>
        </>
      ) : error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" align="center" gutterBottom>
            {error}
          </Typography>
        </Box>
      ) : 
      (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Box>
  );
}

export default Result;
