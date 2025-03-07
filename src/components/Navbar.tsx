'use client'

import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

import { useEffect } from 'react';
import OCLoginButton from '@/components/OCLoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';

const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const updatedQuiz = useSelector((state: RootState) => state.quizform.quiz);
  const dispatch = useDispatch();
  const currentPath = useSelector(
    (state: RootState) => state.currentPath.currentPath
  );
  let addr = useAccount().address;
  if (!addr) {
    addr = '0x0';
  }

  const { authState, ocAuth, OCId, ethAddress } = useOCAuth();

  // if (authState.error) {
  //   return <div>Error: {authState.error.message}</div>;
  // }

  // Add a loading state
  // if (authState.isLoading) {
  //   return <div>Loading...</div>;
  // }

  const saveQuiz = async () => {
    try {
      // call the API method with updated quiz data
      dispatch(
        addNotification({
          type: 'info',
          message: 'Saving quiz...',
        })
      );
      if (addr == '0x0' || addr == updatedQuiz.owner) {
        const response = await axios.put(
          `/api/update-quiz-by-id?id=${id}`,
          updatedQuiz
        );
        if (response.status == 200) {
          dispatch(
            addNotification({
              type: 'success',
              message: 'Quiz saved successfully',
            })
          );
        }
      } else {
        dispatch(
          addNotification({
            type: 'error',
            message: 'Permission denied',
          })
        );
      }
    } catch (error: any) {
      try {
        dispatch(
          addNotification({
            type: 'error',
            message: error.response.data.message,
          })
        );
      } catch (error2) {
        dispatch(
          addNotification({
            type: 'error',
            message: 'An error occurred while updating the quiz',
          })
        );
      }
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: '999' }}>
      <Toolbar>
        <Grid
          container
          spacing={3}
          sx={{ flexGrow: 1 }}
        >
          <Grid>
            <Link href="/">
              <Box>
                <Typography variant="h6" component="div">
                  QuizFi
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid>
            {currentPath === 'quiz_edit' && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                }}
                onClick={() => saveQuiz()}
              >
                <Typography variant="button" color={theme.palette.primary.main}>
                  Save Quiz
                </Typography>
              </Button>
            )}
          </Grid>

          <Grid offset="auto">
            {/* {authState.isAuthenticated ? ( */}
            {authState && authState.isAuthenticated ? (
              <p>You are logged in! {JSON.stringify(ocAuth.getAuthState())}</p>

            ) : (
              <OCLoginButton />
            )}
          </Grid>
          <w3m-button />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
