import axiosInstance from "../Axios/axiosInstance";
import { IFormImageData } from "../Components/FormImage/types";
import { IUsers } from "../interface/userTypes";

export const postPhotoService = async (dataPhoto: IFormImageData) => {
    const data = await axiosInstance.post("/api/users/add-user", dataPhoto);
    return data.data
};