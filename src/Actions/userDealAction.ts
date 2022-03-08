import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFilterById } from "../interface/serviceTypes";
import { IClaimedDeals, IDealId, IUserDealData } from "../interface/userDealTypes";
import { deleteUserDealService, getUserDeals } from "../service/userDealService";

export const fetchUserDeal = createAsyncThunk(
    "userdeal/fetchUsers",
    async ({id, rowsPerPage, page }:IFilterById ) => {
      const response: IUserDealData= await getUserDeals(id, rowsPerPage, page);
      const newDeal: IDealId[] =  response.claimedDeals.map((deal:IClaimedDeals)=>{
        deal.deal_id[0]["userDealId"] = deal.id
        return deal.deal_id[0]
      })
      return {
        data: newDeal,
        total: response.totalCount
      }
    }
  );
  

  export const  deleteUserDeals = createAsyncThunk(
    "userdeal/delete",
    async (id: string | number) => {
      const response = await deleteUserDealService(id)
      return response
    }
  );
  