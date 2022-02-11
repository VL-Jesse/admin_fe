import { IResponseError, IResponseMessages } from "./responseType";

export interface IOnlineDeals {
  onlineDealId: number;
  businessName: string;
  title: string;
  businessId: number;
}
export interface IHeaderOnlineDeals {
  businessName: string;
  title: string;
}
export interface IPaginationOnlineDeals {
  totalCount: number;
  onlineDeals: IOnlineDeals[];
}
export interface IDownloadOnlineDeals {
  businessName: string;
  title: string;
}
export interface IOnlineDealsReducer {
  status: "idle" | "loading" | "failed";
  data: IOnlineDeals[];
  edit: IOnlineDealEdit | null;
  total: number;
  download: IDownloadOnlineDeals | string;
  businessNames: string[] | null;
}

export interface IOnlineDealsResponse {
  success: boolean;
  errors: IResponseError[];
  messages: IResponseMessages[];
  value: IPaginationOnlineDeals | IOnlineDealEdit | IBusinessNameResponse;
}
export interface IOnlineDealEdit {
  onlineDealId: number;
  businessName: string;
  title: string;
  description: string;
  promoCode: string;
  url: string;
  image: {
    id: number;
    itemHash: string;
    extension: string;
  };
}

export interface IOnlineDealPost {
  BusinessName: string;
  Title: string;
  Description: string;
  PromoCode: string;
  Url: string;
}
export interface IFormPost {
  businessName: string;
  title: string;
  description: string;
  promoCode: string;
  url: string;
}

export interface IBusinessNameResponse {
  0: {businessNameWithIds: IBusinessName[]}
}

export interface IBusinessName {
  businessId: number;
  businessName: string;
}
