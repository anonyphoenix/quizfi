import { QuestionType, QuizType } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface QuizState {
  quiz: QuizType;
  currentQuestion: QuestionType | null;
}

const initialState: QuizState = {
  quiz: {
    id: uuidv4(),
    title: 'Untitled Quiz',
    description: 'enter description',
    questions: [],
    timelimit: 10,
  },
  currentQuestion: null,
};

const quizTestSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizTestData: (state, action) => {
      state.quiz = action.payload;
    },
    selectAnswer: (state, action) => {
      const { questionId, answerId } = action.payload;
      const questionIndex = state.quiz.questions.findIndex(
        (q) => q.id === questionId
      );
      const optionIndex = state.quiz.questions[questionIndex].options.findIndex(
        (o) => o.id === answerId
      );

      // Alternate the boolean value
      state.quiz.questions[questionIndex].options[optionIndex].isAnswer =
        !state.quiz.questions[questionIndex].options[optionIndex].isAnswer;

      // Reset all other options to false
      state.quiz.questions[questionIndex].options.forEach((o) => {
        if (o.id !== answerId) {
          o.isAnswer = false;
        }
      });

      state.currentQuestion = state.quiz.questions[questionIndex];
    },
    setCurrentQuestion: (state, action) => {
      const { id } = action.payload || {};
      if (!id) {
        state.currentQuestion = null;
        return;
      }
      const questionIndex = state.quiz.questions.findIndex((q) => q.id === id);
      state.currentQuestion = state.quiz.questions[questionIndex];
    },
    moveNext: (state) => {
      const currentIndex = state.quiz.questions.findIndex(
        (q) => q.id === state.currentQuestion?.id
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < state.quiz.questions.length) {
        const nextQuestion = state.quiz.questions[nextIndex];
        state.currentQuestion = nextQuestion;
      }
    },
    movePrev: (state) => {
      const currentIndex = state.quiz.questions.findIndex(
        (q) => q.id === state.currentQuestion?.id
      );
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        const prevQuestion = state.quiz.questions[prevIndex];
        state.currentQuestion = prevQuestion;
      }
    },
  },
});

export const {
  setQuizTestData,
  selectAnswer,
  setCurrentQuestion,
  moveNext,
  movePrev,
} = quizTestSlice.actions;

export default quizTestSlice.reducer;
