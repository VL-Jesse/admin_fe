import axiosInstance from "../Axios/axiosInstance";
import { IFormImageData } from "../Components/FormImage/types";

export const postPhotoService = async (dataPhoto: IFormImageData) => {
    const data = await axiosInstance.post("api/storage-item/admin/upload", dataPhoto);
    return data.data
};