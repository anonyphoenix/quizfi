import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';

function QuizStatusTime({ startTime, endTime }: any) {

  const router = useRouter();

  let initalStatusTime = "..."

  if (startTime > new Date()) {
    initalStatusTime = "Starts " + format(startTime, 'en_US');
  } else if (endTime > new Date()) {
    initalStatusTime = "Ends " + format(endTime, 'en_US');
  } else {
    initalStatusTime = "Ended " + format(endTime, 'en_US');
  }

  const [quizStatusTime, setQuizStatusTime] = useState<string>(initalStatusTime);


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
