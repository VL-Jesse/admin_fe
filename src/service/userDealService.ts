import axiosInstance from "../Axios/axiosInstance";
import { IUserDealsResponse } from "../interface/userDealTypes";

export const getUserDeals = async (
  userId: number | string,
  rowsPerPage?: number,
  page?: number
) => {
  const currentPage = page ? page + 1 : 1;
  const params = {
    PageNumber: currentPage,
    PageSize: rowsPerPage,
  };
  const data = await axiosInstance.get<IUserDealsResponse>(
    `/api/deals/admin/claimed/${userId}`,
    { params }
  );
  return data.data.value;
};

export const deleteUserDealService = async (idDelete: number | string) => {
  const data = await axiosInstance.delete(
    `/api/deals/admin/claimed/${idDelete}/remove`
  );
  return data;
};
