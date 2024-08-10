import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  type: 'error' | 'success' | 'info';
  message: string;
}

interface NotificationState {
  notification: Notification | null;
}

const initialState: NotificationState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
    removeNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
