import AttemptQuizModal from '@/components/AttemptQuizModal';
import CreateQuizModal from '@/components/CreateQuizModal';
import WithdrawModal from '@/components/WithdrawModal';
import ModalWrapper from '@/components/ModalWrapper';
import QuizCard from '@/components/QuizCard';
import useFetchQuizCards from '@/hooks/fetchQuizCards';
import { RootState } from '@/store/reducers';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import Person4Icon from '@mui/icons-material/Person4';
import GradingIcon from '@mui/icons-material/Grading';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
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
import axios from 'axios';


const Index = () => {
  const [openCreateQuizModal, setOpenCreateQuizModal] = useState(false);
  const [openAttemptQuizModal, setOpenAttemptQuizModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const theme = useTheme();
  const { address, isConnecting, isConnected } = useAccount();
  // const quizzes = useSelector((state: RootState) => state.quizCards.quizzes);
  const userQuizzes = useSelector((state: RootState) => state.quizCards.userQuizzes);
  const ongoingQuizzes = useSelector((state: RootState) => state.quizCards.ongoingQuizzes);
  const upcomingQuizzes = useSelector((state: RootState) => state.quizCards.upcomingQuizzes);
  const finishedQuizzes = useSelector((state: RootState) => state.quizCards.finishedQuizzes);

  const isLoading = useFetchQuizCards(address, 0);
  const router = useRouter();

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await axios.get(
          `/api/get-balance?id=${address}`
        );
        const data = response.data;
        setBalance(data.balance);
      } catch (error) {
      }
    }
    if (address) {
      fetchBalance();
    } else {
      setBalance(0);
    }
  }, [isConnecting, isConnected, address]);

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
                backgroundColor: theme.palette.primary.main,
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
                backgroundColor: theme.palette.primary.main,
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
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  marginLeft: 10,
                }}
                onClick={() => router.push('/profile')}
              >
                Profile
              </Button>
            }
          </Box>
        </CardContent>
      </Card>

      {isConnected && <div style={{ marginTop: '4rem' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={2}
        >
          Your Created Quizzes ({userQuizzes.length})
        </Typography>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'start' }}>
            {userQuizzes.map((quiz: any, index: any) => (
              <Grid key={quiz.id}>
                <QuizCard quiz={quiz} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>}

      <div style={{ marginTop: '4rem' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={2}
        >
          Ongoing Public Quizzes ({ongoingQuizzes.length})
        </Typography>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'start' }}>
            {ongoingQuizzes.map((quiz: any, index: any) => (
              <Grid key={quiz.id}>
                <QuizCard quiz={quiz} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={2}
        >
          Upcoming Public Quizzes ({upcomingQuizzes.length})
        </Typography>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'start' }}>
            {upcomingQuizzes.map((quiz: any, index: any) => (
              <Grid key={quiz.id}>
                <QuizCard quiz={quiz} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={2}
        >
          Finished Public Quizzes ({finishedQuizzes.length})
        </Typography>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'start' }}>
            {finishedQuizzes.map((quiz: any, index: any) => (
              <Grid key={quiz.id}>
                <QuizCard quiz={quiz} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {/* <div style={{ marginTop: '4rem' }}>
        <Typography
          variant="h6"
          component="h6"
          align="left"
          gutterBottom
          fontWeight="bold"
          mb={2}
        >
          All Quizzes ({quizzes.length})
        </Typography>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={2} sx={{ justifyContent: 'start' }}>
            {quizzes.map((quiz, index) => (
              <Grid key={quiz.id} item>
                <QuizCard quiz={quiz} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </div> */}

    </Box>
  );
  //render
};

export default Index;
