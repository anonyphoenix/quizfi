import GlobalNotification from '@/components/GlobalNotification';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import createEmotionCache from '../createEmotionCache';
import store from '../store';
import theme from '../theme';

/* import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import { config } from '@/config'; */
import Web3ModalProvider from '@/context';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();

  const [bgColor, setBgColor] = useState('#fff');


  useEffect(() => {
    const handleRouteChange = () => {
      const path = router.pathname;
      if (path === '/' || path === '/profile') {
        document.body.style.backgroundColor = '#E7DDD6';
      } else {
        document.body.style.backgroundColor = '#f0f0f0';
      }
    };
    handleRouteChange(); // initial route
  }, [router.pathname]);

/*   useEffect(() => {
    const fetchData = async () => {
      const initState = cookieToInitialState(config, headers().get('cookie'));
    };
    fetchData();
  }); */

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Web3ModalProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.
        remove the margins of all browsers and apply the material design background color */}
          <CssBaseline />
          <GlobalNotification />
          <Navbar />

          <Container
            maxWidth="md"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 8,
            }}
          >
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
        </Web3ModalProvider>
      </CacheProvider>
    </Provider>
  );
}
