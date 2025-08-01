import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  selectedStep: 0 | 1 | 2;
  selectedPostId: number| null;
}

const initialState: PostState = {
  selectedStep: 0,
  selectedPostId: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSelectedStep: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.selectedStep = action.payload;
    },
    setSelectedPostId: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const { setSelectedStep, setSelectedPostId } = postSlice.actions;
export default postSlice.reducer;
