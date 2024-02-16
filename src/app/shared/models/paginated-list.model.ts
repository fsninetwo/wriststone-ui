export interface PaginatedList<T>{
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
