import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useStopClientSideRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      const confirmationMessage =
        'Are you sure you want to leave this page? Your quiz data will be lost.';
      if (
        !shallow &&
        !url.includes('/result') &&
        !confirm(confirmationMessage)
      ) {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
};
