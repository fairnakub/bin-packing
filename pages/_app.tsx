import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={responsiveFontSizes(createTheme())}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
