import Question from '@/components/QuestionComponent';
import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  removeOption,
  updateOptionIsAnswer,
  updateOptionTitle,
} from '@/store/reducers/quizFormSlice';
import { OptionType } from '@/types/types';
import { Close } from '@mui/icons-material';
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableText from './EditableText';
function Option({
  option,
  questionId,
  rtl
}: {
  option: OptionType;
  questionId: string;
  rtl?: boolean;
}) {
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateOptionIsAnswer({
        questionId: questionId,
        optionId: option.id,
        isAnswer: event.target.checked,
      })
    );
  };

  const options = useSelector((state: RootState) => {
    const question = state.quizform.quiz.questions.find(
      (q: any) => q.id === questionId
    );
    return question ? question.options : [];
  });

  const removeOptionHandler = () => {
    if (options.length > 1) {
      dispatch(removeOption({ questionId: questionId, optionId: option.id }));
    } else {
      dispatch(
        addNotification({
          type: 'error',
          message: 'You need to set at least one option',
        })
      );
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ width: '100%', margin: 0 }}
    >
      <Grid>
        <Checkbox checked={option.isAnswer} onChange={handleCheckboxChange} />
      </Grid>
      <Grid sx={{ flexGrow: 1 }}>
        <EditableText
          rtl={rtl}
          key={option.id}
          fontSize={'16px'}
          text={option.title}
          defaultValue=""
          onChange={(text: string) => {
            dispatch(
              updateOptionTitle({
                questionId: questionId,
                optionId: option.id,
                title: text,
              })
            );
          }}
        />
      </Grid>
      <Grid>
        <Tooltip onClick={removeOptionHandler} title="Remove">
          <IconButton>
            <Close />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Option;
