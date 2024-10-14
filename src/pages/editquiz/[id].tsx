import { default as EditableNumber } from '@/components/EditableNumber';
import { default as EditableText } from '@/components/EditableText';
import Question from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
import { removePath, setPath } from '@/store/reducers/pathSlice';
import {
  addQuestion,
  removeQuiz,
  setQuiz,
  updateQuizDescription,
  updateQuizTimeLimit,
  updateQuizTitle,
  updateQuizStatus,
  updateQuizStartTime,
  updateQuizPrizeAmount
} from '@/store/reducers/quizFormSlice';
import { QuestionType, QuizType } from '@/types/types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useAccount } from 'wagmi';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { 
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi';
import { parseEther } from 'viem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function EditQuiz() {
  const router = useRouter();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quizform.quiz);
  const [timeLimit, setTimeLimit] = useState<number>(quiz.timelimit);
  const [status, setStatus] = useState(false);
  // to autofocus the last element
  const [lastAddedIndex, setLastAddedIndex] = useState(-1);
  let addr = useAccount().address;
  if (!addr) {
    addr = '0x0';
  }

  const { 
    data: hash,
    error, 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  const theme = useTheme();
  const [amount, setAmount] = useState(0);

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = '0xfa2358D363673784eB03c94BdFA2751089508a7f';
    const value = formData.get('value') as string;
    if (parseEther(value) > 0){
      sendTransaction({ to, value: parseEther(value) });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = Number(e.target.value);
    setAmount(newNumber);
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    });

  useEffect(() => {
    async function saveTx() {
      try {
        dispatch(updateQuizPrizeAmount(amount));
        const response = await axios.get(
          `/api/save-tx?quizId=${quiz.id}&amount=${amount}&hash=${hash}`
        );
        const m = response.data;
      } catch (e) {
        console.log('error in save tx');
      }
      console.log('tx processed');
    };
    if (amount > 0){
      saveTx();
    }
  },[isConfirmed]);


  const addQuestionHandler = () => {
    const newQuestion = {
      id: uuidv4(),
      prompt: '',
      images: [],
      points: 1,
      options: [{ id: uuidv4(), title: '', isAnswer: false }],
    };
    setLastAddedIndex(quiz.questions.length);
    dispatch(addQuestion(newQuestion));
  };

  useEffect(() => {
    dispatch(updateQuizTimeLimit(timeLimit));
  }, [timeLimit, dispatch]);

  useEffect(() => {
    dispatch(setPath('quiz_edit'));
    return () => {
      dispatch(removePath());
    };
  }, [dispatch]);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `/api/get-quiz-by-id?id=${router.query.id}`
        );
        const quizData = response.data;
        setStatus(quizData.status == 'public' ? true : false);
        if (addr == quizData.owner || quizData.owner == '0x0') {
          dispatch(setQuiz(quizData as QuizType));
        } else {
          console.log('403 forbidden');
          dispatch(removeQuiz());
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (router.query.id) {
      fetchQuiz();
    }
    return () => {
      dispatch(removeQuiz());
    };
  }, [router.query.id, dispatch]);

  return (
    <Box
      sx={{
        maxWidth: 'md',
        width: '100%',
        mt: 4,
      }}
    >
      <Card sx={{ backgroundColor: '#fff', px: 2, py: 1, mt: 1, mb: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <EditableText
            text={quiz.title}
            onChange={(text: string) => {
              dispatch(updateQuizTitle(text));
            }}
            defaultValue={quiz.title}
            fontSize={'32px'}
            bold
          />
          <EditableText
            text={quiz.description}
            onChange={(text: string) => {
              dispatch(updateQuizDescription(text));
            }}
            defaultValue={quiz.description}
            fontSize={'16px'}
          />
          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
              label={'Start time'}
              value={dayjs(quiz.startTime)}
              onAccept={(value) => {value && dispatch(updateQuizStartTime(value))}}
              onChange={(value) => {value && dispatch(updateQuizStartTime(value))}}/>
            </LocalizationProvider>
            &nbsp;&nbsp;&nbsp;
            <EditableNumber
              defaultValue={10}
              number={quiz.timelimit}
              onChange={(value: number) => {
                dispatch(updateQuizTimeLimit(value));
              }}
              fontSize={'16px'}
              label={'Time Limit (minutes)'}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
              { quiz.prizeAmount && quiz.prizeAmount > 0 ? `Prize: ${quiz.prizeAmount} EDU` : 
                  <form autoComplete="off" onSubmit={submit}>
                  <TextField 
                                label="Prize in EDU"
                                required
                                type="number"
                                onChange={handleNumberChange}
                                defaultValue={0}
                                disabled={isPending || isConfirming || isConfirmed}
                                sx={{
                                  border: 'none',
                                  borderRadius: 0,
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  maxWidth: '%60'
                                }}
                                inputProps={{
                                  step: 0.0001,
                                }}
                                name="value"
                             />
                             &nbsp;&nbsp;&nbsp;
                             { amount > 0 &&
                             <Button variant="contained" disabled={isConfirmed}
                                startIcon={<AttachMoneyIcon style={{ color: theme.palette.secondary.main }} />}
                                style={{
                                  backgroundColor: theme.palette.primary.main,
                                  color: theme.palette.secondary.main,
                                  height:54,
                                }} type="submit">
                                          {isPending || isConfirming ?
                                           'Confirming...' : isConfirmed ?
                                           'Paid' : 'Pay'} 
                            </Button>  }
                    </form> }
              <FormGroup sx={{ mb: 2}}>
              {addr != '0x0' ? <FormControlLabel
              control={<Switch
                checked={status}
                disabled={!isConfirmed && quiz.prizeAmount == 0}
                onChange={() => {
                  if (isConfirmed || (quiz.prizeAmount && quiz.prizeAmount > 0)){
                    dispatch(updateQuizStatus());
                    setStatus(!status);
                  }
                }} />}
                label={isConfirmed || (quiz.prizeAmount && quiz.prizeAmount > 0) ? "Public Quiz" : "Public Quiz (requires payment)"} /> : 
              <FormControlLabel disabled control={<Switch />} label="Public Quiz (connect wallet first)" />}
            </FormGroup>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#666', display: 'flex', mt: 2, alignItems: 'center' }}
          >
            Note:&nbsp;Mark the correct option for all questions&nbsp;
          </Typography>
        </CardContent>
      </Card>

      {quiz.questions &&
        quiz.questions.map((question: QuestionType, index: number) => (
          <Question
            key={question.id}
            index={index + 1}
            question={question}
            autofocus={index == lastAddedIndex}
          />
        ))}

      <Tooltip title="Add question">
        <IconButton
          onClick={addQuestionHandler}
          sx={{
            backgroundColor: 'primary',
          }}
        >
          {/* <IconButton onClick={addQuestion}> */}
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default EditQuiz;
