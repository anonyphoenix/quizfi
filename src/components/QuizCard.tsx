import { addNotification } from '@/store/reducers/notificationSlice';
import { removeQuizCardDatabyId } from '@/store/reducers/quizCardsSlice';
import { QuizType } from '@/types/types';
import { QuestionAnswer, Delete, Edit, Assessment, FileUpload, Source } from '@mui/icons-material';
import { default as MoreVertIcon } from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
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
import Grid from '@mui/material/Grid2';
import QuizIcon from '@mui/icons-material/Quiz';
import {
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from 'next-share'
import QuizStatusTime from './QuizStatusTime';

function QuizCard({ quiz, index }: { quiz: Partial<QuizType>; index: number }) {
  //hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { address } = useAccount();

  //hooks
  //handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event);
    console.log(event.currentTarget);
    console.log(event.target);
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

  return (
    <Card
      className="quiz-card-parent"
      sx={{
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden',
        //border: '2px solid transparent',
      }}
    >
       <CardHeader
        action={<Stack direction="row" spacing={1} alignItems="center" sx={{ mt: -0.3 }}>
        <Chip
          size="small"
          label={quiz.status}
          variant='outlined'
          color="primary" />
        <IconButton sx={{ color: 'gray' }} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        
      </Stack>}
        title={quiz.title}
      />


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
          }
        }}
      >
        {quiz.startTime && quiz.timeLimit && address == quiz.owner &&
          Math.floor(((new Date(quiz.startTime).getTime() - new Date().getTime()) / 1000)) > 0 &&
          <MenuItem onClick={handleEdit}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Edit />
            </IconButton>
            <Typography variant="body1">Edit</Typography>
          </MenuItem>}
        {quiz.startTime && quiz.timeLimit && address == quiz.owner &&
          Math.floor(((new Date(quiz.startTime).getTime() - new Date().getTime()) / 1000)) > 0 &&
          <MenuItem onClick={handleDelete}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Delete />
            </IconButton>
            <Typography variant="body1">Delete</Typography>
          </MenuItem>}
        {quiz.startTime && quiz.timeLimit && Math.floor(((new Date(new Date(quiz.startTime).getTime()
          + (quiz.timeLimit * 60000)).getTime() - new Date().getTime()) / 1000)) > 0 &&
          <MenuItem onClick={() => router.push(`/startquiz/${quiz.id}`)}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <QuestionAnswer />
            </IconButton>
            <Typography variant="body1">Take Quiz</Typography>
          </MenuItem>}
        {quiz.startTime && quiz.timeLimit && Math.floor(((new Date(new Date(quiz.startTime).getTime()
          + (quiz.timeLimit * 60000)).getTime() - new Date().getTime()) / 1000)) < -30 &&
          <MenuItem onClick={() => router.push(`/resultquiz/${quiz.id}`)}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Source />
            </IconButton>
            <Typography variant="body1">View Results</Typography>
          </MenuItem>}
        {address == quiz.owner &&
          <MenuItem onClick={() => router.push(`/statquiz/${quiz.id}`)}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <Assessment />
            </IconButton>
            <Typography variant="body1">Statistics</Typography>
          </MenuItem>}
        {quiz.endTime && new Date(quiz.endTime).getTime() < new Date().getTime() &&
          <MenuItem onClick={() => router.push(`/api/export-quiz-by-id?id=${quiz.id}`)}>
            <IconButton
              size="small"
              sx={{ mr: 1, color: theme.palette.primary.dark }}
            >
              <FileUpload />
            </IconButton>
            <Typography variant="body1">Export</Typography>
          </MenuItem>}
      </Menu>
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
            sx={{ pr: 9 }}
          >
            {/* #{index + 1} */}
            {quiz.startTime && quiz.endTime && (
          <>
            <QuizStatusTime
              startTime={new Date(quiz.startTime)}
              endTime={new Date(quiz.endTime)}/>
          </>
        )}
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
            {quiz.description}
          </Typography>
          {/* < Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          {address == quiz.owner &&
            <Typography align="left" variant="body2">
              {quiz.updatedAt && (
                <>
                  Updated at{' '}
                  {dayjs(quiz.updatedAt).format('YYYY/MM/DD hh:mm:ss A')}
                </>
              )}
            </Typography>}
          {address == quiz.owner &&
            < Divider sx={{ marginTop: 1, marginBottom: 1 }} />} */}
            < Divider sx={{ marginTop: 1, marginBottom: 1 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <Typography variant="body2">Share:</Typography> */}
            <TelegramShareButton
              style={{ paddingTop: '4px' }}
              url={`${window.location.origin}/startquiz/${quiz.id}`}
              title={quiz.title}
            >
              <TelegramIcon size={28} round />
            </TelegramShareButton>
            <TwitterShareButton
              style={{ paddingTop: '4px' }}
              url={`${window.location.origin}/startquiz/${quiz.id}`}
              title={quiz.title}
            >
              <TwitterIcon size={28} round />
            </TwitterShareButton>
            <EmailShareButton
              style={{ paddingTop: '4px' }}
              url={`${window.location.origin}/startquiz/${quiz.id}`}
              subject={quiz.title}
              body={`${quiz.title}: ${window.location.origin}/startquiz/${quiz.id}`}
            >
              <EmailIcon size={28} round />
            </EmailShareButton>
            <WhatsappShareButton
              style={{ paddingTop: '4px' }}
              url={`${window.location.origin}/startquiz/${quiz.id}`}
              title={quiz.title}
              separator='::'
            >
              <WhatsappIcon size={28} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              style={{ paddingTop: '4px' }}
              url={`${window.location.origin}/startquiz/${quiz.id}`}
            >
              <LinkedinIcon size={28} round />
            </LinkedinShareButton>
          </Stack>
          <Button
              variant="contained"
              style={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.secondary.main,
              }}
              onClick={() => {}}
            >
              Start
            </Button>
          </Stack>
        </Box>
      </Link>
      {/* </Box> */}
    </Card>
  );
}

export default QuizCard;