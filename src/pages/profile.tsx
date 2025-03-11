import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAccount } from 'wagmi';
import { RootState } from '@/store/reducers';
import { useSelector } from 'react-redux';
import QuizCard from '@/components/QuizCard';
import { useTheme } from '@mui/material/styles';
import GradingIcon from '@mui/icons-material/Grading';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AddIcon from '@mui/icons-material/Add';
import ModalWrapper from '@/components/ModalWrapper';
import WithdrawModal from '@/components/WithdrawModal';

function Profile() {
    const router = useRouter();
    const theme = useTheme();
    const { address, isConnecting, isConnected } = useAccount();
    const [balance, setBalance] = useState(0);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const userQuizzes = useSelector((state: RootState) => state.quizCards.userQuizzes);
    // TODO: fetch userquizzes if state is empty

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
                    <Box sx={{ display: 'flex',
                         justifyContent: 'space-between',
                          alignItems: 'center' }}>
                        <Typography variant="h5">
                            Prize balance: {balance} EDU
                        </Typography>
                        <Box>
                            <Button
                                variant="contained"
                                startIcon={<PriceCheckIcon style={{ color: theme.palette.secondary.main }} />}
                                style={{
                                    backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.secondary.main,
                                    marginLeft: 10,
                                }}
                                onClick={() => setOpenWithdrawModal(true)}
                            >
                                Withdraw
                            </Button>
                            <ModalWrapper openModal={openWithdrawModal}>
                                <WithdrawModal
                                    openModal={openWithdrawModal}
                                    setOpenModal={setOpenWithdrawModal}
                                />
                            </ModalWrapper>
                            <Button
                                variant="contained"
                                startIcon={<GradingIcon style={{ color: theme.palette.secondary.main }} />}
                                style={{
                                    backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.secondary.main,
                                    marginLeft: 10,
                                }}
                                onClick={() => router.push('/myresults')}
                            >
                                View Results
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'transparent' }}>
                <CardContent>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Quizzes made by you
                        </Typography>
                        {/* <Button
                            variant="contained"
                            startIcon={<AddIcon style={{ color: theme.palette.secondary.main }} />}
                            style={{
                                backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.secondary.main,
                                marginLeft: 10,
                            }}
                            onClick={() => console.log("soon")}
                        >
                            Create a new quiz
                        </Button> */}
                    </Box>
                    <Grid container spacing={2} columns={16}>
                        {userQuizzes.map((quiz: any, index: any) => (
                            <Grid key={quiz.id} size={16}>
                                <QuizCard quiz={quiz} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Profile;