import { default as EditableNumber } from '@/components/EditableNumber';
import EditableText from '@/components/EditableText';
import Option from '@/components/OptionComponent';
import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  addOption,
  removeQuestion,
  updateQuestionPoints,
  updateQuestionDirection,
  updateQuestionPrompt,
  updateQuestionImages
} from '@/store/reducers/quizFormSlice';
import { OptionType, QuestionType } from '@/types/types';
import { Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';


interface Props {
  question: QuestionType;
  index: number;
  autofocus?: boolean;
  rtl?: boolean;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Question({ question, index, autofocus, rtl=false }: Props) {
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isRTL, setIsRTL] = React.useState(rtl);

  const questions = useSelector(
    (state: RootState) => state.quizform.quiz.questions
  );

  const handleFileUpload = (event: any) => {
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append("files", event.target.files[i]);
    }
    axios.post('/api/upload-quiz-img', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
        setUploadProgress(percentCompleted);
      }
    })
      .then(response => {
        dispatch(updateQuestionImages({ questionId: question.id, images: response.data.images }));
      })
      .catch(error => {
        console.error(error);
        // handle error here
      });
  };

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

  const changeRTLHandler = () => {
    const newState = !isRTL;
    setIsRTL(newState);
    dispatch(updateQuestionDirection({
      questionId: question.id,
      rtl: newState
    }));
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
            rtl={isRTL}
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

          <Button
            variant="contained"
            style={{
              "width": "-webkit-fill-available",
              "maxWidth": "fit-content",
              "whiteSpace": "nowrap",
              "marginLeft": "3%",
              "marginBottom": "1%",
              color: theme.palette.secondary.main
            }}
            startIcon={<AddPhotoAlternateIcon />}
            component="label"
          >
            Set Images
            <VisuallyHiddenInput
              type="file"
              onChange={(event: any) => handleFileUpload(event)}
              multiple
            />
          </Button>
        </Box>
        {question.images && question.images.length > 0 &&
          <Box>
            <ImageList variant="masonry" cols={3} gap={8}>
              {question.images.map((item, index) => (
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

        {question.options?.map((option) => (
          <Option rtl={isRTL} key={option.id} option={option} questionId={question.id} />
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

            <FormControlLabel
            onChange={changeRTLHandler}
            control={isRTL? <Switch defaultChecked/> : <Switch />}
            label="RTL" />

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
