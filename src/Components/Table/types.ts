import { IHeaderBusiness } from "../../interface/businessTypes";
import { IHeaderOnlineDeals } from "../../interface/onlineDealsTypes";
import { IHeaderUser } from "../../interface/userTypes";
import { path } from "../../Routes/path";

export interface ITable {
  headers: IHeaderUser | IHeaderOnlineDeals | IHeaderBusiness;
  rows: IRows;
  path: path;
  deleteAction: Function;
  fetchFilter: Function;
  idName: string;
  total: number;
  page: number;
  rowsPerPage: number;
  setPage: Function;
  setRowsPerPage: Function;
  filter: string;
}

export interface IRows {
  [key: string]: any;
}
