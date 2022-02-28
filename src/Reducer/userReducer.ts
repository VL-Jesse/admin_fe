import { createSlice } from "@reduxjs/toolkit";
import {
  getAllData,
  getEditData,
  createUser,
  updateUser,
  deleteUser,
  exportUser,
} from "../Actions/userAction";
import { IUserReducer } from "../interface/userTypes";

const initialState: IUserReducer = {
  status: "idle",
  data: [],
  edit: null,
  total: 0,
  download: "No Available",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearEditUser: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload ? action.payload.page : null;
        state.total = action.payload ? action.payload.total : 0;
        state.edit = null;
      })
      .addCase(getAllData.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(getEditData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEditData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getEditData.fulfilled, (state, action) => {
        state.status = "idle";
        state.edit = action.payload;
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "idle";
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "idle";
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "idle";
      });

    builder.addCase(exportUser.fulfilled, (state, action) => {
      state.download = action.payload;
    });
  },
});
export const { clearEditUser } = userSlice.actions;

export default userSlice.reducer;
