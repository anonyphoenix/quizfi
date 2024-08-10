import useFetchQuizResult from '@/hooks/useFetchQuizResult';
import { RootState } from '@/store/reducers';
import { setQuizTestData } from '@/store/reducers/quizTestSlice';
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Link,
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
  const { result, loading, error } = useFetchQuizResult();
  const resultLink = `/resultquiz/${result?.id}`;

  return (
    <Box mt={4} sx={{ width: '80%' }}>
      <Typography variant="h4" align="center" gutterBottom>
            Answers Submitted
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
            This quiz had {result?.totalQuestions} questions with a total of {result?.maxscore} points.
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
            You can <Link href={resultLink}>view your result</Link> a few seconds after the quiz ends.
      </Typography>
    </Box>
  );
}

export default Result;
