import { IResponseError, IResponseMessages } from "./responseType";

export interface IUsers {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  free_membership: boolean;
}

export interface IHeaderUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IPaginationUser {
  total: number;
  page: IUsers[];
}

export interface IUserReducer {
  status: "idle" | "loading" | "failed";
  data: IUsers[] | null;
  edit: IUsers | null;
  total: number;
  download: IDownloadUser | string;
}

export interface IUserResponse {
  success: boolean;
  errors: IResponseError[];
  messages: IResponseMessages[];
  value: IPaginationUser | IUsers;
}

export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  userDealIdsToRemove: number[];
  complimentaryEndDate: string;
  birthDate: string;
  state: string;
}

export interface IEditUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  dealsModels: IDealModels[];
  memberSinceDate: string;
  complimentaryEndDate: string;
  expiration: string;
  birthDate: string;
  state: string;
  free_membership: boolean;
}

export interface IDealModels {
  userDealId: number;
  title: string;
  businessName: string;
  maxMoneyAmount: number;
  disclaimer: string;
  shortDescription: string;
  isUnlimited: boolean;
}

export interface IDownloadUser {
  FirstName: string;
  LastName: string;
  Email: string;
  State: string;
  BirthDate: string;
  MemberSinceDate: string;
  MembershipExpirationDate: string;
  ComplimentaryExpirationDate: string;
}

export interface IDealYup{
  title: string;
  maxMoneyAmount: number;
  disclaimer: string;
  shortDescription: string;
  isUnlimited: boolean;
  orderIndex: number
}