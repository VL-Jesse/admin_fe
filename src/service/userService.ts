import axiosInstance from "../Axios/axiosInstance";
import { IDealModels, IEditUser, IPaginationUser, IUserRequest, IUserResponse, IUsers } from "../interface/userTypes";

export const getAllUsers = async (
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
  const data = await axiosInstance.get<IUserResponse>(
    `/api/users/search`,
    { params }
  );
  return data.data.value as IPaginationUser
};
export const getOneUser = async (userId: string | number) => {
  const data = await axiosInstance.get("/api/users/info-on-edit", {params: {UserId: userId}});
  return data.data.value
};

export const postUser = async (create: IUsers) => {
    const data = await axiosInstance.post("/api/users/add-user", create);
    return data.data
};


export const putUser = async (update: IEditUser, id: number) => {
const userDealIds = update.dealsModels ? update.dealsModels.map((deal: IDealModels)=> deal.userDealId) : []
  const dataUser: IUserRequest = {
    firstName: update.firstName,
    lastName: update.lastName,
    email: update.email,
    userDealIdsToRemove: userDealIds,
    complimentaryEndDate: update.complimentaryEndDate,
    birthDate: update.birthDate,
    state: update.state

  }
  const data = await axiosInstance.put(`/api/users/${id}/edit`, dataUser);
  return data
};

export const deleteUserService = async (idDelete: number | string) => {
  const data = await axiosInstance.delete(`/api/users/${idDelete}/delete`);
  return data
};

export const exportUserService = async () => {
  const data = await axiosInstance.get("/api/users/admin-export");
  return data.data.value
};