import axiosInstance from "../Axios/axiosInstance"
import { IBusinessNameResponse, IFormPost, IOnlineDealEdit, IOnlineDealPost, IOnlineDealsResponse, IPaginationOnlineDeals } from "../interface/onlineDealsTypes";

export const getAllOnlineDeals = async (
  rowsPerPage?: number,
  page?: number,
  filter?: string
) => {
  const currentPage = page ? page + 1 : 1
  const params = {
    PageNumber: currentPage,
    PageSize: rowsPerPage,
    SearchQuery: filter ?? "",
  };
  const data = await axiosInstance.get<IOnlineDealsResponse>(
    "/api/deals/online/search",
    { params }
  );
  return data.data.value as IPaginationOnlineDeals
};


export const getOneOnlineDeals= async (id: string | number) => {
  const data = await axiosInstance.get(`/api/deals/online/${id}/info-on-edit`);
  return data.data.value
};

export const postOnlineDeals = async (create: IFormPost) => {
  const dataRequest: IOnlineDealPost = {
    BusinessName: create.businessName,
    Title: create.title,
    Description: create.description,
    PromoCode: create.promoCode,
    Url: create.url,
    imageFile: create.imageFile
  }
    const data = await axiosInstance.post("/api/deals/online/add", dataRequest);
    return data.data
};


export const putOnlineDeals = async (update: IOnlineDealEdit, id: number) => {
  const dataRequest: IOnlineDealPost = {
    BusinessName: update.businessName,
    Title: update.title,
    Description: update.description,
    PromoCode: update.promoCode,
    Url: update.url,
    imageFile: update.imageFile
  }
  const data = await axiosInstance.put(`/api/deals/online/${id}/edit`, dataRequest);
  return data
};

export const deleteOnlineDealsService = async (idDelete: number | string) => {
  const data = await axiosInstance.delete(`/api/deals/online/${idDelete}/remove`);
  return data
};

export const exportOnlineDealsService = async () => {
  const data = await axiosInstance.get("/api/deals/online/admin-export");
  return data.data.value
};

export const bussinessNameService = async () => {
  const data = await axiosInstance.get<IOnlineDealsResponse>("/api/businesses/names");
  return data.data.value as IBusinessNameResponse
};