import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormPut } from "../interface/businessTypes";
import { IFilter } from "../interface/serviceTypes";
import {
  deleteBusinessService,
  exportBusinessService,
  getAllBusiness,
  getOneBusiness,
  postBusiness,
  putBusiness,
} from "../service/businessService";
import { BusinessTransform } from "../utils/businessTransform";
import { dateFormat } from "../utils/dateFormat";
import { exitsModel } from "../utils/exitsModel";

export const fecthBusiness = createAsyncThunk(
  "business/fetch",
  async ({ rowsPerPage, page, filter }: IFilter, { rejectWithValue }) => {
    try {
      const response = await getAllBusiness(rowsPerPage, page, filter);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createBusiness = createAsyncThunk(
  "business/create",
  async (data: IFormPut, { rejectWithValue }) => {
    try {
      const dateFormatData = dateFormat(data);
      const newData =  exitsModel(dateFormatData)
      const response = await postBusiness(newData);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateBusiness = createAsyncThunk(
  "business/update",
  async (data: IFormPut, { rejectWithValue }) => {
    try {
      if (!data.businessAddressId) return;
      const dateFormatData = dateFormat(data);
      const newData =  exitsModel(dateFormatData)
      const response = await putBusiness(newData, data.businessAddressId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteBusiness = createAsyncThunk(
  "business/delete",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await deleteBusinessService(id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const exportBusiness = createAsyncThunk(
  "business/export",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await exportBusinessService();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getEditBusiness = createAsyncThunk(
  "business/get",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await getOneBusiness(id);
      const newformatResponse = BusinessTransform(response);
      return newformatResponse;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
