import { createSlice } from "@reduxjs/toolkit";
import {
  createBusiness,
  deleteBusiness,
  exportBusiness,
  fecthBusiness,
  getEditBusiness,
  updateBusiness,
} from "../Actions/businessAction";
import { IBusinessReducer } from "../interface/businessTypes";

const initialState: IBusinessReducer = {
  status: "idle",
  data: [],
  edit: null,
  total: 0,
  download: "No available",
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearEditBusiness: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fecthBusiness.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload ? action.payload.business : null;
        state.total = action.payload ? action.payload.totalCount : 0;
        state.edit = null;
      })
      .addCase(fecthBusiness.rejected, (state) => {
        state.status = "failed";
      });

    builder.addCase(exportBusiness.fulfilled, (state, action) => {
      state.download = action.payload;
    });

    builder
      .addCase(getEditBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEditBusiness.fulfilled, (state, action) => {
        state.status = "idle";
        state.edit = action.payload;
      });

    builder
      .addCase(createBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBusiness.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(createBusiness.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(updateBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBusiness.fulfilled, (state) => {
        state.status = "idle";
      });

    builder
      .addCase(deleteBusiness.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBusiness.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export const { clearEditBusiness } = businessSlice.actions;

export default businessSlice.reducer;
