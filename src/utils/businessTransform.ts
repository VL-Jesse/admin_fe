import {
  IAddressModelsJson,
  IEditData,
  IFormPut,
  IImages,
} from "../interface/businessTypes";
import { stringFormat } from "./dateFormat";

export const BusinessTransform = (data: IEditData): IFormPut => {
    const newHours = stringFormat(data.addressModels[0].workingHours);
    const address: IAddressModelsJson[] = [{
      addressLine: data.addressModels[0].addressLine,
      city: data.addressModels[0].city,
      state: data.addressModels[0].state,
      zipCode: data.addressModels[0].zipCode,
      workingHours: newHours,
      location : {
        latitude: null,
        longitude: null
      }
    }];
    let imgDelete: number[] = []
    if(data.addressModels[0].images){
      imgDelete =  data.addressModels[0].images.map(
        (img: IImages) => img.id
      );
    }

  return {
    businessAddressId: data.businessId,
    BusinessName: data.businessName,
    Category: data.category,
    Description: data.description,
    WebsiteUrl: data.websiteUrl,
    ReservationUrl: data.reservationUrl,
    ContactName: data.contactName,
    ContactEmail: data.contactEmail,
    ContactPhone: data.contactPhone,
    ImageIdsToDelete: imgDelete,
    AddressModels: address,
    dealModels: data.dealsModels,
    imageFile: "",
  };
};
