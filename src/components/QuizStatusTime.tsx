import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';

function QuizStatusTime({ startTime, endTime }: any) {

  const router = useRouter();
  const [quizStatusTime, setQuizStatusTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime > new Date()) {
        setQuizStatusTime("Starts " + format(startTime, 'en_US'));
      } else if (endTime > new Date()) {
        setQuizStatusTime("Ends " + format(endTime, 'en_US'));
      } else {
        setQuizStatusTime("Ended " + format(endTime, 'en_US'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStatusTime, router]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" fontWeight="bold" suppressHydrationWarning>
        {quizStatusTime}
      </Typography>
    </Box>
  );
}

export default QuizStatusTime;
