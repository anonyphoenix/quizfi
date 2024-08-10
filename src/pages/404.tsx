import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <Container maxWidth="sm">
      <ErrorTitle variant="h1">404</ErrorTitle>
      <ErrorSubtitle variant="h5">Page not found</ErrorSubtitle>
      <ErrorDescription variant="body1">
        We are sorry, the page you requested could not be found. Please check
        the URL or go back to the homepage.
      </ErrorDescription>
      <Link href="/">
        <Button variant="contained" color="primary">
          Go back to homepage
        </Button>
      </Link>
    </Container>
  );
};

const ErrorTitle = styled(Typography)({
  marginTop: '3rem',
  fontWeight: 700,
  fontSize: '6rem',
  letterSpacing: '-0.05em',
});

const ErrorSubtitle = styled(Typography)({
  fontWeight: 700,
});

const ErrorDescription = styled(Typography)({
  margin: '2rem 0',
});

export default Custom404;
