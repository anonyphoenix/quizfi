import path from 'path';
import { combineReducers } from 'redux';
import notificationReducer from './notificationSlice';
import pathReducer from './pathSlice';
import quizCardReducer from './quizCardsSlice';
import quizFormReducer from './quizFormSlice';
import quizTestReducer from './quizTestSlice';

const rootReducer = combineReducers({
  quizform: quizFormReducer,
  notification: notificationReducer,
  quizCards: quizCardReducer,
  quizTestData: quizTestReducer,
  currentPath: pathReducer,
  // Add more slices here as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
