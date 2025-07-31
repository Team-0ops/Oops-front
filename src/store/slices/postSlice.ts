// src/store/slices/postSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OopsPost } from "../../types/OopsList";

interface PostState {
  posts: OopsPost[];
  selectedStep: 0 | 1 | 2;
  selectedPostId: string | null;
}

const initialState: PostState = {
  posts: [],
  selectedStep: 0,
  selectedPostId: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<OopsPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<OopsPost>) => {
      state.posts.push(action.payload);
    },
    setSelectedStep: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.selectedStep = action.payload;
    },
    setSelectedPostId: (state, action: PayloadAction<string | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const { setPosts, addPost, setSelectedStep, setSelectedPostId } =
  postSlice.actions;

export default postSlice.reducer;
