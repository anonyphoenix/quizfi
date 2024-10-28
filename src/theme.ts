import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1016bc',
      dark: '#000',
    },
    secondary: {
      main: '#FFF',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#c7b7e3', // Add info color
    },
    success: {
      main: '#00edbe',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
