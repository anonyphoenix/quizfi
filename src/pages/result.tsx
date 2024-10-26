import useSetQuizResult from '@/hooks/useSetQuizResult';
import {
  Box, Link,
  Typography
} from '@mui/material';


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
  const { result, loading, error } = useSetQuizResult();
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
