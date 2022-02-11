import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFilter } from "../interface/serviceTypes";
import { IEditUser, IUsers } from "../interface/userTypes";
import { deleteUserService, exportUserService, getAllUsers, getOneUser, postUser, putUser } from "../service/userService";

export const getAllData = createAsyncThunk(
    "user/fetchUsers",
    async ({rowsPerPage, page, filter}:IFilter ) => {
      const response = await getAllUsers(rowsPerPage, page,filter);
      return response;
    }
  );
  
  export const getEditData = createAsyncThunk(
    "user/get",
    async (id: string | number ) => {
      const response = await getOneUser(id);
      return response;
    }
  );
  
  export const  createUser = createAsyncThunk(
    "user/create",
    async (data: IUsers) => {
      try {
        const response = await postUser(data)
        return response
      } catch (err) {
        return err
      }
    }
  );

  export const  updateUser = createAsyncThunk(
    "user/update",
    async (data: IEditUser) => {
      try {
        if(!data.userId) return
        const response = await putUser(data,data.userId)
        return response
      } catch (err) {
        return err
      }
    }
  );

  export const  deleteUser = createAsyncThunk(
    "user/delete",
    async (id: string | number) => {
      const response = await deleteUserService(id)
      return response
    }
  );
  
  export const  exportUser = createAsyncThunk(
    "user/export",
    async () => {
      const response = await exportUserService()
      return response
    }
  );