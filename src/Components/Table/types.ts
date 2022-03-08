import { ReactElement } from "react";
import { IconType } from "react-icons/lib";
import { IHeaderBusiness } from "../../interface/businessTypes";
import { IHeaderOnlineDeals } from "../../interface/onlineDealsTypes";
import { IHeaderUserDeals } from "../../interface/userDealTypes";
import { IHeaderUser } from "../../interface/userTypes";
import { path } from "../../Routes/path";

export interface ITable {
  headers: IHeaderUser | IHeaderOnlineDeals | IHeaderBusiness | IHeaderUserDeals;
  rows: IRows | null;
  path: path | undefined;
  deleteAction: Function;
  fetchFilter: Function;
  idName: string;
  total: number;
  page: number;
  rowsPerPage: number;
  setPage: Function;
  setRowsPerPage: Function;
  filter: string;
  action: IActionTable | undefined
  updateAction?: boolean
}

export interface IRows {
  [key: string]: any;
}

export interface IActionTable {
  available?: boolean
  action?: any
  actionTitle?: string
  iconAction?: ReactElement<IconType, IconType>
}