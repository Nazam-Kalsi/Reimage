import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Tuser = {
  user: { [key: string]: string } | null;
  isLoading: boolean,
};

const initialState: Tuser = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<any>) => {
              state.user = action.payload;
               state.isLoading = false;
    },
    
    signOut: (state) => {
      state.user = null; 
      state.isLoading = true;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
