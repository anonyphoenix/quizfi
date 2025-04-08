import { RootState } from '@/store/reducers';
import { addNotification } from '@/store/reducers/notificationSlice';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Person4Icon from '@mui/icons-material/Person4';
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import { useAccount } from 'wagmi';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppKit } from '@reown/appkit/react';
import CreateQuizModal from '@/components/CreateQuizModal';
import { useEffect, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import OCLoginButton from './OCLoginButton';

const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const updatedQuiz = useSelector((state: RootState) => state.quizform.quiz);
  const dispatch = useDispatch();
  const { open: openAppKit, close: closeAppKit } = useAppKit();
  const [openCreateQuizModal, setOpenCreateQuizModal] = useState(false);
  const currentPath = useSelector(
    (state: RootState) => state.currentPath.currentPath
  );
  const { address, isConnecting, isConnected } = useAccount();
  const { isInitialized, authState, ocAuth } = useOCAuth();
  let addr = useAccount().address;
  if (!addr) {
    addr = '0x0';
  }
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);

  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    //[theme.breakpoints.up('lg')]: {
     // display: 'none',
    //},
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        { (!isInitialized || (isInitialized && !authState.idToken)) && <OCLoginButton/> }
        { isInitialized && authState.idToken && <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/profile')}>
            <ListItemIcon>
              <Person4Icon />
            </ListItemIcon>
            <ListItemText primary={'View Profile'} />
          </ListItemButton>
        </ListItem> }
        <ListItem disablePadding>
          <ListItemButton onClick={() => setOpenCreateQuizModal(true)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'Create Quiz'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open('https://github.com/anonyphoenix/quizfi', '_blank')}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={'Source Code'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open('https://x.com/quiz_fi', '_blank')}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={'QuizFi on X'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const saveQuiz = async () => {
    try {
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

  if (!isInitialized) {
    // console.log('loading...');
  }

  if (isInitialized && authState.error) {
    console.log(authState.error.message);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{
        zIndex: '999',
        boxShadow: 'none',
        //width: { lg: `calc(100% - ${drawerWidth}px)` },
        //ml: { lg: `${drawerWidth}px` },
      }}>
        <Toolbar>
          <Grid
            container
            spacing={3}
            sx={{ flexGrow: 1, alignItems: 'center' }}
          >
            <Grid>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { lg: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid sx={{ ml: -2 }}>
              <Link href="/">
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    color={theme.palette.secondary.main}>
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
              {!isConnected &&
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: theme.palette.primary.contrastText,
                    color: theme.palette.secondary.main,
                  }}
                  onClick={() => openAppKit()}
                >
                  <Typography variant="button" color={theme.palette.secondary.main}>
                    Connect Wallet
                  </Typography>
                </Button>}
              {isConnected &&
                  <Avatar
                   onClick={() => openAppKit()}
                   sx={{ bgcolor: theme.palette.primary.contrastText, cursor: 'pointer' }}>
                    <AccountBalanceWalletIcon />
                  </Avatar>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <ModalWrapper openModal={openCreateQuizModal}>
                    <CreateQuizModal
                      openModal={openCreateQuizModal}
                      setOpenModal={setOpenCreateQuizModal}
                    />
                  </ModalWrapper>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 }, zIndex: '100' }}
        aria-label="navigation drawer"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
