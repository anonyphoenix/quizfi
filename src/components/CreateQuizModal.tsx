import { QuizType } from '@/types/types';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
// import 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useTheme } from '@mui/material/styles';

type CreateQuizModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create Quiz Modal
const CreateQuizModal: FC<CreateQuizModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [quizName, setQuizName] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const theme = useTheme();
  let addr = useAccount().address;
  if (!addr) {
    addr = '0x0';
  }

  const router = useRouter();
  // router.push(`/edit/${docRef.id}`);

  const handleQuizNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(event.target.value);
  };

  const addQuiz = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/add-quiz', { 
        title: quizName,
        owner: addr
       });
      setIsSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
        setOpenModal(false);
        router.push(`/editquiz/${data.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error adding quiz: ', error);
      setError(error);
      setLoading(false);
    }
  };

  const createButtonDisabled = quizName.trim().length < 1;

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="create-quiz-modal-title"
      aria-describedby="create-quiz-modal-description"
      disableScrollLock={true}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '4px',
          p: 4,
          zIndex: 9999, // Or any other high value
        }}
      >
        <Typography
          id="create-quiz-modal-title"
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Create Quiz
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Enter Quiz Title"
            fullWidth
            value={quizName}
            onChange={handleQuizNameChange}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={() => setOpenModal(false)}
            color="primary"
            variant="contained"
            sx={{ ml: 1 }}
          >
            <Typography
              variant="button"
              color={theme.palette.secondary.main}>
            Cancel
            </Typography>
          </Button>
          <Button
            onClick={addQuiz}
            color="primary"
            variant="contained"
            disabled={createButtonDisabled}
            sx={{ ml: 1 }}
          >
            <Typography
              variant="button"
              color={theme.palette.secondary.main}>
            Create
              </Typography>
          </Button>
        </Box>
        {loading && (
          <Box sx={{ mt: 2 }}>
            <Typography color="black">Creating Quiz...</Typography>
          </Box>
        )}
        {isSuccess && (
          <Box sx={{ mt: 2 }}>
            <Typography color="green">Quiz successfully created!</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CreateQuizModal;
