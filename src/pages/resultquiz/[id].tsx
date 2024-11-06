import useFetchPastQuizResult from '@/hooks/useFetchPastQuizResult';
import {
  Box,
  Card,
  CircularProgress,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

type ResultItem = {
  question: string;
  images: string[];
  selectedOption: string;
  correctOption: string;
  points: number;
};

function Result() {
  const router = useRouter();
  const id = router.query.id;
  const { result, loading, error } = useFetchPastQuizResult(id);
  
  const questionStyle = {
    backgroundColor: '#FFF9C4',
    p: 2,
    mb: 1,
    mt: 1
  };

  const answerStyle = {
    p: 2,
    mb: 1,
    mt: 1
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
            {result.results.map((resultItem: ResultItem) => (
              <Card sx={{ p: 3, mb: 2 }} key={resultItem.question}>
                <Typography variant="h6" sx={questionStyle}>
                  {resultItem.question}
                </Typography>
                {resultItem.images && resultItem.images.length > 0 &&
                  <Box>
                    <ImageList variant="masonry" cols={3} gap={8}>
                      {resultItem.images.map((item, index) => (
                        <ImageListItem key={item}>
                          <img
                            srcSet={`${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}${item}?w=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}${item}?w=164&fit=crop&auto=format`}
                            loading="lazy"
                            alt={`${index}`}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>}
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
