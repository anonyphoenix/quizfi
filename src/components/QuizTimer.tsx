import { RootState } from '@/store/reducers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function QuizTimer() {
  const minutes : number = useSelector(
    (state: RootState) => state.quizTestData.quiz.timeLimit
  );
  const startTime : Date = useSelector(
    (state: RootState) => state.quizTestData.quiz.startTime
  );

  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const seconds = Math.floor(((new Date(new Date(startTime).getTime() + (minutes * 60000)).getTime()
     - new Date().getTime())/1000));
    setTimeLeft(seconds);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, startTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/result');
    }
  }, [timeLeft, router]);

  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor(timeLeft / 60) % 60;
  const secondsLeft = timeLeft % 60;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AccessTimeIcon sx={{ mr: 1 }} />
      <Typography variant="h6" sx={{ mr: 1 }}>
        Time Left —
      </Typography>
      <Typography variant="h6" fontWeight="bold" suppressHydrationWarning>
        {hoursLeft}:
        {minutesLeft < 10 ? '0' : ''}{minutesLeft}&apos;:
        {secondsLeft < 10 ? '0' : ''}{secondsLeft}&quot;
      </Typography>
    </Box>
  );
}

export default QuizTimer;
