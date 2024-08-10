import { addNotification } from '@/store/reducers/notificationSlice';
import { removeQuizCardDatabyId } from '@/store/reducers/quizCardsSlice';
import { QuizType } from '@/types/types';
import { QuestionAnswer, Delete, Edit } from '@mui/icons-material';
import { default as MoreVertIcon } from '@mui/icons-material/MoreVert';
import {
  Box,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function QuizCard({ quiz, index }: { quiz: Partial<QuizType>; index: number }) {
  //hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { address } = useAccount();

  //hooks
  //handlers
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      dispatch(
        addNotification({
          type: 'info',
          message: 'Deleting quiz...',
        })
      );
      const response = await axios.get(`/api/delete-quiz-by-id?id=${quiz.id}`);
      dispatch(
        addNotification({
          type: 'success',
          message: 'Quiz deleted successfully',
        })
      );
      dispatch(removeQuizCardDatabyId(quiz.id));
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          type: 'error',
          message: 'An error occurred while deleting the quiz',
        })
      );
    }
  };
  const handleEdit = () => {
    // Edit the quiz
    router.push(`/editquiz/${quiz.id}`);
  };
  //handlers
  return (
    <Card
      className="quiz-card-parent"
      sx={{
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid transparent',
      }}
    >
      {/* <Box> */}
      <Box
        sx={{
          position: 'absolute',
          right: '0',
          top: '0',
          zIndex: '99',
        }}
      >
        <IconButton sx={{ color: 'white' }} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          disableScrollLock={true}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: 'white',
            },
          }}
        >
              { quiz.startTime && quiz.timelimit && address == quiz.owner && 
                  Math.floor(((new Date(quiz.startTime).getTime() - new Date().getTime())/1000)) > 0 &&
            <MenuItem onClick={handleEdit}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Edit />
            </IconButton>
            <Typography variant="body1">Edit</Typography>
            </MenuItem> }
              { quiz.startTime && quiz.timelimit && address == quiz.owner && 
                  Math.floor(((new Date(quiz.startTime).getTime() - new Date().getTime())/1000)) > 0 &&
            <MenuItem onClick={handleDelete}>
              <IconButton
                size="small"
                sx={{ mr: 1, color: theme.palette.primary.dark }}
              >
                <Delete />
              </IconButton>
              <Typography variant="body1">Delete</Typography>
            </MenuItem> }
              { quiz.startTime && quiz.timelimit && Math.floor(((new Date(new Date(quiz.startTime).getTime()
                + (quiz.timelimit * 60000)).getTime() - new Date().getTime())/1000)) > 0 &&
            <MenuItem onClick={() => router.push(`/startquiz/${quiz.id}`)}>
              <IconButton
                size="small"
                sx={{ mr: 1, color: theme.palette.primary.dark }}
              >
                <QuestionAnswer />
              </IconButton>
              <Typography variant="body1">Take Quiz</Typography>
            </MenuItem> }
              { quiz.startTime && quiz.timelimit && Math.floor(((new Date(new Date(quiz.startTime).getTime()
                + (quiz.timelimit * 60000)).getTime() - new Date().getTime())/1000)) < -30 &&
            <MenuItem onClick={() => router.push(`/resultquiz/${quiz.id}`)}>
              <IconButton
                size="small"
                sx={{ mr: 1, color: theme.palette.primary.dark }}
              >
                <QuestionAnswer />
              </IconButton>
              <Typography variant="body1">View Results</Typography>
            </MenuItem>}
        </Menu>
      </Box>
      {/* ============ */}

      <Link href={address == quiz.owner ? `/editquiz/${quiz.id}` : `/startquiz/${quiz.id}`}>
        <Box
          className="quiz-card-top"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.4rem 1rem',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography
            mr={3}
            textAlign="left"
            variant="body1"
            color={theme.palette.secondary.main}
          >
            #{index + 1} {quiz.title}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '0.4rem 1rem',
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Prize
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {quiz.prizeAmount} EDU
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          { quiz.description }
        </Typography>
        < Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          <Typography align="left" variant="body2">
            {quiz.startTime && (
              <>
                Starts at{' '}
                {new Date(quiz.startTime).toLocaleString(
                  'en-US'
                )}
              </>
            )}
          </Typography>
          < Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          { address == quiz.owner &&
          <Typography align="left" variant="body2">
            {quiz.updatedAt && (
              <>
                Updated at{' '}
                {new Date(quiz.updatedAt).toLocaleString(
                  'en-US'
                )}
              </>
            )}
          </Typography> }
          { address == quiz.owner &&
          < Divider sx={{ marginTop: 1, marginBottom: 1 }} /> }
          <Stack direction="row" spacing={1}>
            <Chip label={quiz.status} size="small" />
          </Stack>
        </Box>
      </Link>
      {/* </Box> */}
    </Card>
  );
}

export default QuizCard;
