'use client'

import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();

  const { authState, ocAuth, OCId, ethAddress } = useOCAuth();

  const loginSuccess = () => {
    router.push('/'); // Redirect after successful login
  };

  const loginError = (error: any) => {
    console.error('Login error:', error);
  };

  function CustomErrorComponent() {
    const { authState } = useOCAuth();
    return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent() {
    useEffect(() => {
      async function handleAuth() {
        try {
          const authState = await ocAuth.handleLoginRedirect();
          if (authState.idToken) {
            console.log("C"); // login process is completed
          } else {
            console.log("N"); // login process is not completed
          }
        } catch (e) {
          console.log(e);
        }
      }
  
      handleAuth();
    }, []);
  
    return <div>Loading....</div>;
  }

  return (
    <LoginCallBack 
      errorCallback={loginError} 
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />} 
    />
  );
}