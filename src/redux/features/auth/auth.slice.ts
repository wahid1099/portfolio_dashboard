import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IAuthUser } from "../../../interfaces/auth-user.type";

interface TAuthState {
  user: IAuthUser | null;
  token: null | string;
}

const initialState: TAuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.user = user;
    },

    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
