import { RootState } from '@/store/reducers';
import { removeNotification } from '@/store/reducers/notificationSlice';
import { AlertProps, default as MuiAlert } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GlobalNotification() {
  const theme = useTheme();
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (notification?.type === 'success' || notification?.type === 'error') {
      timeoutId = setTimeout(() => {
        dispatch(removeNotification());
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, notification]);

  const alertBackgroundColor =
    notification?.type === 'success'
      ? theme.palette.success.main
      : notification?.type === 'error'
      ? theme.palette.error.main
      : theme.palette.info.main;

  const alertColor =
    notification?.type === 'success' || notification?.type === 'error'
      ? theme.palette.common.white
      : undefined;

  return (
    <>
      {notification && (
        <Snackbar
          open={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert
            severity={notification.type}
            sx={{
              backgroundColor: alertBackgroundColor,
              color: alertColor,
              '& .MuiAlert-icon': {
                marginRight: theme.spacing(1),
              },
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default GlobalNotification;
