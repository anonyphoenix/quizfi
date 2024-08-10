import { default as EditableNumber } from '@/components/EditableNumber';
import EditableText from '@/components/EditableText';
import Option from '@/components/OptionComponent';
import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  addOption,
  removeQuestion,
  updateQuestionPoints,
  updateQuestionPrompt,
} from '@/store/reducers/quizFormSlice';
import { OptionType, QuestionType } from '@/types/types';
import { Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  question: QuestionType;
  index: number;
  autofocus?: boolean;
}

function Question({ question, index, autofocus }: Props) {
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  const questions = useSelector(
    (state: RootState) => state.quizform.quiz.questions
  );

  const removeQuestionHandler = () => {
    if (questions.length > 1) {
      dispatch(removeQuestion(question.id));
    } else {
      dispatch(
        addNotification({
          type: 'error',
          message: 'You need to have at least one question',
        })
      );
    }
  };

  useEffect(() => {
    if (autofocus && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autofocus]);

  const addOptionHandler = () => {
    const newOption = {
      id: uuidv4(),
      title: '',
      isAnswer: false,
    } as OptionType;
    dispatch(addOption({ questionId: question.id, option: newOption }));
  };

  return (
    <Card
      ref={autofocus ? cardRef : null}
      sx={{ my: 2, py: { xs: 0, sm: 1 }, px: { xs: 0, sm: 2 } }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{ flexGrow: 1, mr: 1, fontSize: '16px' }}
            component="div"
          >
            {`${index}.`}
          </Typography>
          <EditableText
            defaultValue=""
            text={question.prompt}
            onChange={(text: string) =>
              dispatch(
                updateQuestionPrompt({
                  questionId: question.id,
                  prompt: text,
                })
              )
            }
            fontSize={'16px'}
            autoFocus={autofocus}
          />
        </Box>

        {question.options?.map((option) => (
          <Option key={option.id} option={option} questionId={question.id} />
        ))}

        <Box sx={{ ml: 2 }}>
          <Tooltip title="Add option" onClick={addOptionHandler} sx={{ my: 0 }}>
            <IconButton>
              <AddCircleIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Divider orientation="horizontal" flexItem />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <EditableNumber
              onChange={(value: number) => {
                dispatch(
                  updateQuestionPoints({
                    questionId: question.id,
                    points: value,
                  })
                );
              }}
              defaultValue={1}
              number={question.points}
              fontSize={'24px'}
              label={'Points'}
            />

            <Tooltip title="Delete question">
              <IconButton onClick={removeQuestionHandler}>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Question;
