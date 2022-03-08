export interface IFilter {
  rowsPerPage?: number;
  page?: number;
  filter?: string;
}

export interface IFilterById {
  id: number | string;
  rowsPerPage?: number;
  page?: number;
}
