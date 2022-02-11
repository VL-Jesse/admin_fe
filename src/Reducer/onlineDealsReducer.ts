import { createSlice } from "@reduxjs/toolkit";
import {
  createOnlineDeals,
  deleteOnlineDeals,
  exportOnlineDeals,
  fecthOnlineDeals,
  getBussinessName,
  getEditOnlineDeal,
  updateOnlineDeals,
} from "../Actions/onlineDealAction";
import { IOnlineDealsReducer } from "../interface/onlineDealsTypes";

const initialState: IOnlineDealsReducer = {
  status: "idle",
  data: [],
  edit: null,
  total: 0,
  download: "No Available",
  businessNames: null,
};

export const onlineDealsSlice = createSlice({
  name: "onlineDeals",
  initialState,
  reducers: {
    clearEditOnlineDeal: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthOnlineDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fecthOnlineDeals.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload.onlineDeals;
        state.total = action.payload.totalCount;
        state.edit = null;
      });

    builder
      .addCase(getEditOnlineDeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEditOnlineDeal.fulfilled, (state, action) => {
        state.status = "idle";
        state.edit = action.payload;
      });

    builder
      .addCase(createOnlineDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOnlineDeals.fulfilled, (state) => {
        state.status = "idle";
      });

    builder
      .addCase(updateOnlineDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOnlineDeals.fulfilled, (state) => {
        state.status = "idle";
      });

    builder
      .addCase(deleteOnlineDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOnlineDeals.fulfilled, (state) => {
        state.status = "idle";
      });

    builder.addCase(exportOnlineDeals.fulfilled, (state, action) => {
      state.download = action.payload;
    });

    builder
      .addCase(getBussinessName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBussinessName.fulfilled, (state, action) => {
        state.status = "idle";
        state.businessNames = action.payload;
      });
  },
});
export const { clearEditOnlineDeal } = onlineDealsSlice.actions;

export default onlineDealsSlice.reducer;
