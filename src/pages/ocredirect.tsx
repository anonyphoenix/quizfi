'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOCAuth } from '@opencampus/ocid-connect-js';

const RedirectPage = () => {
  const router = useRouter();
  const { isAuthenticated, authState, ocAuth } = useOCAuth();

  const loginSuccess = () => {
    router.push('/user'); // Redirect to user or any other page
  };

  const loginError = () => {
    router.push('/'); // Redirect to login page or show error message
  };

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await ocAuth.handleLoginRedirect();
        loginSuccess();
      } catch (error) {
        loginError();
      }
    };

    handleAuth();
  }, [ocAuth]);

  if (isAuthenticated && authState.error) {
    return <div>Error Logging in: {authState.error.message}</div>;
  }

  return <div>Loading...</div>;
};

export default RedirectPage;
