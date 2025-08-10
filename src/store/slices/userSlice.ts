import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  // 필요한 추가 정보도 여기에 (예: nickname, email 등)
}

const initialState: UserState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    // 필요하면 로그아웃 등 리셋 액션도!
    // logout: (state) => {
    //   state.userId = null;
    // },
  },
});

export const { setUserId, logout } = userSlice.actions;
export default userSlice.reducer;
