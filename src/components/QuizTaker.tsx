import { useFetchTestQuiz } from '@/hooks/useFetchTestQuiz';
import { usePreventBrowserRedirect } from '@/hooks/usePreventBrowserRedirect';
import { useStopClientSideRedirect } from '@/hooks/useStopClientSideRedirect';
import { RootState } from '@/store/reducers';
import { removePath, setPath } from '@/store/reducers/pathSlice';
import {
  moveNext,
  movePrev,
  selectAnswer,
  setCurrentQuestion,
} from '@/store/reducers/quizTestSlice';
import { QuestionType } from '@/types/types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function QuizTaker() {
  const router = useRouter();
  const quiz = useSelector((state: RootState) => state.quizTestData.quiz);
  const id = router.query.id as string;
  const currentQuestion = useSelector(
    (state: RootState) => state.quizTestData.currentQuestion
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPath('quiz_take'));
    return () => {
      dispatch(removePath());
      dispatch(setCurrentQuestion(null));
    };
  }, [dispatch]);

  const questionIndex =
    quiz.questions.findIndex(
      (question: any) => question.id === currentQuestion?.id
    ) + 1;

  const totalQuestionsAttempted = quiz.questions.reduce(
    (count: any, question: any) =>
      question.options.some((option: any) => option.isAnswer) ? count + 1 : count,
    0
  );

  const points = quiz.questions[questionIndex - 1]?.points || 1;

  //fetch quiz data
  const isLoading = useFetchTestQuiz(id);

  //stop client side re-direct
  useStopClientSideRedirect();
  //stop browser re-direct
  usePreventBrowserRedirect();

  const handleOptionChange = (question: QuestionType, optionId: string) => {
    dispatch(selectAnswer({ questionId: question.id, answerId: optionId }));
  };

  const handlePrevClick = () => {
    dispatch(movePrev());
  };

  const handleNextClick = () => {
    dispatch(moveNext());
  };

  if (isLoading) {
    return (
      <Box mt={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Quiz Title — {quiz.title}
      </Typography>

      {currentQuestion && (
        <Card sx={{ p: 4 }}>
          <CardContent>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Question {questionIndex}/{quiz.questions.length}
            </Typography>
            <Typography variant="body1" sx={{ ml: 0 }}>
              {currentQuestion.prompt}
            </Typography>

            <div style={{"paddingTop":"10px"}}>
              {currentQuestion.images.map((imgSrc, index) => (<p><img src={process.env.NEXT_PUBLIC_IMAGE_HOST_URL + imgSrc} key={index}/></p>))}
            </div>

            <Typography variant="body2" sx={{ mt: 2 }}>
              {points} {points > 1 ? 'points' : 'point'}
            </Typography>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup name={`question-${currentQuestion.id}`}>
                {currentQuestion.options.map((option: any) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.title}
                    checked={option.isAnswer}
                    onClick={() =>
                      handleOptionChange(currentQuestion, option.id)
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {totalQuestionsAttempted} out of {quiz.questions.length} questions
              attempted
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={questionIndex - 1 === 0}
              onClick={handlePrevClick}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={questionIndex === quiz.questions.length}
              onClick={handleNextClick}
              sx={{ ml: 2 }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}

export default QuizTaker;
