import { IResponseError, IResponseMessages } from "./responseType";

export interface IUserDealData {
  totalDealsAmount: number;
  totalCount: number;
  claimedDeals: IClaimedDeals[];
}
export interface IClaimedDeals {
  id: number;
  user_id: 1;
  deal_id: IDealId[];
  claimed_amount: 1;
  creation_date: string;
  user_local_expiration_date: string;
  is_active: boolean;
}

export interface IDealId {
  id: number;
  title: string;
  disclaimer: string;
  short_description: string;
  is_unlimited: true;
  max_money_amount: number;
  order_index: number;
  creation_date: string;
  business_address_id: number;
  userDealId: number | undefined;
}

export interface IUserDealsResponse {
  success: boolean;
  errors: IResponseError[];
  messages: IResponseMessages[];
  value: IUserDealData;
}

export interface IReducerUserDeal {
  status: "idle" | "loading" | "failed";
  data: IDealId[] | null;
  total: number;
}

export interface IResponseUserDeal {
  data: IDealId[];
  total: number;
}

export interface IHeaderUserDeals {
  title: string;
  short_description: string;
}
