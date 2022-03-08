import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDeal, deleteUserDeals } from "../Actions/userDealAction";
import { IReducerUserDeal } from "../interface/userDealTypes";

const initialState: IReducerUserDeal = {
  status: "idle",
  data: [],
  total: 0,
};

export const userDealsSlice = createSlice({
  name: "userdeal",
  initialState,
  reducers: {
    clearDeals: (state) => {
      state.data = null;
      state.total = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDeal.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload ? action.payload.data : null;
        state.total = action.payload ? action.payload.total : 0;
      })
      .addCase(fetchUserDeal.rejected, (state) => {
        state.status = "failed";
      });


    builder
      .addCase(deleteUserDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserDeals.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUserDeals.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});
export const { clearDeals } = userDealsSlice.actions;

export default userDealsSlice.reducer;
