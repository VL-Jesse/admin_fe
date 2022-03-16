import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IBusinessName,
  IFormPost,
  IOnlineDealEdit,
} from "../interface/onlineDealsTypes";
import { IFilter } from "../interface/serviceTypes";
import {
  bussinessNameService,
  deleteOnlineDealsService,
  exportOnlineDealsService,
  getAllOnlineDeals,
  getOneOnlineDeals,
  postOnlineDeals,
  putOnlineDeals,
} from "../service/onlineDealService";
import { onlineDealsFormat } from "../utils/onlineDealsFormat";

export const fecthOnlineDeals = createAsyncThunk(
  "onlineDeals/fetch",
  async ({ rowsPerPage, page, filter }: IFilter, { rejectWithValue }) => {
    try {
      const response = await getAllOnlineDeals(rowsPerPage, page, filter);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getEditOnlineDeal = createAsyncThunk(
  "onlineDeals/get",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await getOneOnlineDeals(id);
      const newformatResponse = onlineDealsFormat(response);
      return newformatResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createOnlineDeals = createAsyncThunk(
  "onlineDeals/create",
  async (data: IFormPost, { rejectWithValue }) => {
    try {
      const response = await postOnlineDeals(data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateOnlineDeals = createAsyncThunk(
  "onlineDeals/update",
  async (data: IOnlineDealEdit, { rejectWithValue }) => {
    try {
      if (!data.onlineDealId) return;
      const response = await putOnlineDeals(data, data.onlineDealId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteOnlineDeals = createAsyncThunk(
  "onlineDeals/delete",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await deleteOnlineDealsService(id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const exportOnlineDeals = createAsyncThunk(
  "onlineDeals/export",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await exportOnlineDealsService();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBussinessName = createAsyncThunk(
  "onlineDeals/getBussinessName",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await bussinessNameService();
      const newResponse = response[0].businessNameWithIds.map(
        (name: IBusinessName) => name.businessName
      );
      return newResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
