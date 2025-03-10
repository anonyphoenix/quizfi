import AttemptQuizModal from '@/components/AttemptQuizModal';
import CreateQuizModal from '@/components/CreateQuizModal';
import ModalWrapper from '@/components/ModalWrapper';
import QuizCard from '@/components/QuizCard';
import useFetchQuizCards from '@/hooks/fetchQuizCards';
import { RootState } from '@/store/reducers';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import Person4Icon from '@mui/icons-material/Person4';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';


const Index = () => {
  const [openCreateQuizModal, setOpenCreateQuizModal] = useState(false);
  const [openAttemptQuizModal, setOpenAttemptQuizModal] = useState(false);
  const theme = useTheme();
  const { address, isConnecting, isConnected } = useAccount();
  // const quizzes = useSelector((state: RootState) => state.quizCards.quizzes);
  const userQuizzes = useSelector((state: RootState) => state.quizCards.userQuizzes);
  const ongoingQuizzes = useSelector((state: RootState) => state.quizCards.ongoingQuizzes);
  const upcomingQuizzes = useSelector((state: RootState) => state.quizCards.upcomingQuizzes);
  const finishedQuizzes = useSelector((state: RootState) => state.quizCards.finishedQuizzes);

  const isLoading = useFetchQuizCards(address, 0);
  const router = useRouter();

  return (
    <Box sx={{ my: 4, width: '100%' }}>

      <Card sx={{ mb: 4, backgroundColor: theme.palette.secondary.main }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon style={{ color: theme.palette.secondary.main }} />}
              sx={{ mr: 1 }}
              style={{
                backgroundColor: theme.palette.highlight.main,
                color: theme.palette.secondary.main,
              }}
              onClick={() => setOpenCreateQuizModal(true)}
            >
              Create Quiz
            </Button>
            {/* Modal To Create The the Quiz */}
            <ModalWrapper openModal={openCreateQuizModal}>
              <CreateQuizModal
                openModal={openCreateQuizModal}
                setOpenModal={setOpenCreateQuizModal}
              />
            </ModalWrapper>
            <Button
              variant="contained"
              startIcon={<QuizIcon style={{ color: theme.palette.secondary.main }} />}
              style={{
                backgroundColor: theme.palette.highlight.main,
                color: theme.palette.secondary.main,
              }}
              onClick={() => setOpenAttemptQuizModal(true)}
            >
              Take Quiz
            </Button>
            <ModalWrapper openModal={openAttemptQuizModal}>
              <AttemptQuizModal
                openModal={openAttemptQuizModal}
                setOpenModal={setOpenAttemptQuizModal}
              />
            </ModalWrapper>
            {isConnected &&
              <Button
                variant="contained"
                startIcon={<Person4Icon style={{ color: theme.palette.secondary.main }} />}
                style={{
                  backgroundColor: theme.palette.highlight.main,
                  color: theme.palette.secondary.main,
                  marginLeft: 10,
                }}
                onClick={() => router.push('/profile')}
              >
                View Profile
              </Button>
            }
          </Box>
        </CardContent>
      </Card>


      {isConnected &&
        <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'transparent' }}>
          <CardContent>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Quizzes made by you ({userQuizzes.length})
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon style={{ color: theme.palette.secondary.main }} />}
                style={{
                  backgroundColor: theme.palette.highlight.main,
                  color: theme.palette.secondary.main,
                  marginLeft: 10,
                }}
                onClick={() => setOpenCreateQuizModal(true)}
              >
                Create a new quiz
              </Button>
            </Box>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="primary" />
              </div>
            ) : (
              <Grid container spacing={2} columns={16}>
                {userQuizzes.map((quiz: any, index: any) => (
                  <Grid key={quiz.id} size={16}>
                    <QuizCard quiz={quiz} index={index} />
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>}

      <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'transparent' }}>
        <CardContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Ongoing Public Quizzes ({ongoingQuizzes.length})
            </Typography>
          </Box>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Grid container spacing={2} columns={16}>
              {ongoingQuizzes.map((quiz: any, index: any) => (
                <Grid key={quiz.id} size={16}>
                  <QuizCard quiz={quiz} index={index} />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'transparent' }}>
        <CardContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Upcoming Public Quizzes ({upcomingQuizzes.length})
            </Typography>
          </Box>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Grid container spacing={2} columns={16}>
              {upcomingQuizzes.map((quiz: any, index: any) => (
                <Grid key={quiz.id} size={16}>
                  <QuizCard quiz={quiz} index={index} />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'transparent' }}>
        <CardContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Finished Public Quizzes ({finishedQuizzes.length})
            </Typography>
          </Box>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Grid container spacing={2} columns={16}>
              {finishedQuizzes.map((quiz: any, index: any) => (
                <Grid key={quiz.id} size={16}>
                  <QuizCard quiz={quiz} index={index} />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

    </Box>
  );
  //render
};

export default Index;
