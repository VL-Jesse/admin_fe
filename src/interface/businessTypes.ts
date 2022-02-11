import { IResponseError, IResponseMessages } from "./responseType";
export interface IBusinesses {
  id: number;
  business_name: string;
  address_line: string;
  city_name: string;
  state_code: string;
}

export interface IFormParams {
  register: Function;
  errors: any;
  control: any;
  setValue: Function;
}
export interface IHeaderBusiness {
  business_name: string;
  address_line: string;
  city_name: string;
  state_code: string;
}

export interface IHeaderWeek {
  id: number;
  title: string;
}

export interface IHeaderDeal {
  id: number;
  title: string;
}

export interface IPaginationBusiness {
  totalCount: number;
  business: IBusinesses[];
}

export interface IBusinessReducer {
  status: "idle" | "loading" | "failed";
  data: IBusinesses[];
  edit: IFormPut | null;
  total: number;
  download: IDownloadBusiness[] | string;
}

export interface IBusinessResponse {
  success: boolean;
  errors: IResponseError[];
  messages: IResponseMessages[];
  value: IPaginationBusiness | IBusinesses;
}

export interface IDownloadBusiness {
  Name: string;
  Category: string;
  Description: string;
  WebsiteUrl: string;
  ReservationUrl: string;
  AddressLine: string;
  City: string;
  StateCode: string;
}

export interface IObjectType {
  name: string;
  value: number;
}

export interface IObjectState {
  name: string;
  abbr: string;
}

export interface IAddressModelsJson {
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  workingHours: IWorkingHours[];
  location: ILocation;
}
export interface ILocation {
  longitude: number | null;
  latitude: number | null;
}
export interface IWorkingHours {
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface IDealModels {
  orderIndex: number;
  title: string;
  maxMoneyAmount: number;
  disclaimer: string;
  shortDescription: string;
  isUnlimited: boolean;
}

export interface IFormPost {
  BusinessName: string;
  Category: number;
  Description: string;
  WebsiteUrl: string;
  ReservationUrl: string;
  ContactName: string;
  ContactEmail: string;
  ContactPhone: string;
  AddressModelsJson: IAddressModelsJson[];
  dealModels: IDealModels[];
  imageFile: string;
}

export interface IFormPut {
  businessAddressId: number;
  BusinessName: string;
  Category: number;
  Description: string;
  WebsiteUrl: string;
  ReservationUrl: string;
  ContactName: string;
  ContactEmail: string;
  ContactPhone: string;
  ImageIdsToDelete: number[];
  AddressModels: IAddressModelsJson[];
  dealModels: IDealModels[];
  imageFile: string;
}

export interface IEditData {
  businessId: number;
  businessName: string;
  category: number;
  description: string;
  websiteUrl: string;
  reservationUrl: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressModels: IAddressModels[];
  dealsModels: IDealModels[];
}

export interface IAddressModels {
  businessAddressId: number;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  workingHours: IWorkingHours[];
  images: IImages[];
}

export interface IImages {
  id: number;
  itemHash: string;
  extension: string;
}


export interface ILocationParams {
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  longitude: number;
  latitude: number;
}