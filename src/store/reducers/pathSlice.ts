import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PathType = 'quiz_take' | 'quiz_edit';

interface PathState {
  currentPath: PathType | null;
}

const initialState: PathState = {
  currentPath: null,
};

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<PathType>) => {
      state.currentPath = action.payload;
    },
    removePath: (state) => {
      state.currentPath = null;
    },
  },
});

export const { setPath, removePath } = pathSlice.actions;

export default pathSlice.reducer;
