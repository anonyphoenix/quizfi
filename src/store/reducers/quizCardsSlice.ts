import { QuizType } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Timestamp } from 'firebase/firestore';

// Define the shape of the state
interface QuizState {
  quizzes: Partial<QuizType>[];
  userQuizzes: Partial<QuizType>[];
  upcomingQuizzes: Partial<QuizType>[];
  finishedQuizzes: Partial<QuizType>[];
  ongoingQuizzes: Partial<QuizType>[];
}

// Initialize the state
const initialState: QuizState = {
  quizzes: [],
  userQuizzes: [],
  upcomingQuizzes: [],
  finishedQuizzes: [],
  ongoingQuizzes: []
};

// Create the slice
const quizCardSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuizCardsData: (state, action: PayloadAction<Partial<QuizType>[]>) => {
      // Update the state with the new quizzes
      state.quizzes = action.payload;
    },
    addUserQuizCardsData: (state, action: PayloadAction<Partial<QuizType>[]>) => {
      state.userQuizzes = action.payload;
    },
    addOngoingQuizCardsData: (state, action: PayloadAction<Partial<QuizType>[]>) => {
      state.ongoingQuizzes = action.payload;
    },
    addUpcomingQuizCardsData: (state, action: PayloadAction<Partial<QuizType>[]>) => {
      state.upcomingQuizzes = action.payload;
    },
    addFinishedQuizCardsData: (state, action: PayloadAction<Partial<QuizType>[]>) => {
      state.finishedQuizzes = action.payload;
    },
    removeQuizCardDatabyId: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      // Filter out the quiz with the given id
      if (action.payload) {
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz.id !== action.payload
        );
      }
    },
    removeQuizCardsData: (state) => {
      // Clear all the quizzes
      state.quizzes = [];
    },
  },
});

// Export the action creators
export const { addQuizCardsData, addUserQuizCardsData, addOngoingQuizCardsData, addUpcomingQuizCardsData,
  addFinishedQuizCardsData, removeQuizCardDatabyId, removeQuizCardsData } =
  quizCardSlice.actions;

// Export the reducer
export default quizCardSlice.reducer;
