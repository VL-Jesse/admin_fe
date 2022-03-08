import { createSlice } from '@reduxjs/toolkit';
import { authLogin, refreshingLogin } from '../Actions/authActions';
import { IAuth } from '../interface/authType';

const initialState: IAuth = {
  status: "idle",
  data: null,
  isRefreshing: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSucess: (state) => {
      state.data = null;
    },
    loginSuccess: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
      });
    builder  
      .addCase(refreshingLogin.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshingLogin.fulfilled, (state, action) => {
        state.data = action.payload ? action.payload:  null;
        state.isRefreshing = false;
      })
      .addCase(refreshingLogin.rejected, (state) => {
        state.isRefreshing = false;
        state.data = null;
      });
  },
});
export const { logoutSucess, loginSuccess } = authSlice.actions;


export default authSlice.reducer;
