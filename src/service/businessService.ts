import axiosInstance from "../Axios/axiosInstance";
import { IBusinessResponse, IFormPut, IPaginationBusiness } from "../interface/businessTypes";

export const getAllBusiness = async (
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
  const data = await axiosInstance.get<IBusinessResponse>(
    "api/businesses/admin/search",
    { params }
  );
  return data.data.value as IPaginationBusiness
};

export const exportBusinessService = async () => {
  const data = await axiosInstance.get("/api/businesses/admin-export");
  return data.data.value
};

export const postBusiness = async (create: IFormPut) => {
  const newCreate = {
    BusinessName: create.BusinessName,
  Category: create.Category,
  Description: create.Description,
  WebsiteUrl: create.WebsiteUrl,
  ReservationUrl: create.ReservationUrl,
  ContactName: create.ContactName,
  ContactEmail: create.ContactEmail,
  ContactPhone: create.ContactPhone,
  AddressModelsJson: create.AddressModels,
  dealModels: create.dealModels,
  imageFile: create.imageFile
  } 
    const data = await axiosInstance.post("/api/businesses/add-new", newCreate);
    return data.data
};

export const putBusiness = async (update: IFormPut, id: number) => {
  const data = await axiosInstance.put(`/api/businesses/edit-new/${id}`, update);
  return data
};

export const deleteBusinessService = async (idDelete: number | string) => {
  const data = await axiosInstance.delete(`/api/businesses/delete/${idDelete}`);
  return data
};

export const getOneBusiness= async (id: string | number) => {
  const data = await axiosInstance.get(`/api/businesses/${id}/business-info-on-edit`);
  return data.data.value
};