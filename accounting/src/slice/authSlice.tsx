import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import initialState from "../store/initialState";

interface Credential {
  credentials?: string;
  email?: string | undefined;
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState.auth,
  reducers: {
    setCredentials: (state: RootState, action: PayloadAction<Credential>) => {
      const { credentials } = action.payload;
      localStorage.setItem("TOKEN", JSON.stringify(credentials));
      localStorage.setItem("Email", action?.payload?.email);
      state.user = action?.payload?.email;
      state.isLogin = credentials ? true : null;
      state.email = action?.payload?.email;
    },
    logOut: (state: RootState) => {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("Email");
      state.user = null;
      state.isLogin = false;
      state.email = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
