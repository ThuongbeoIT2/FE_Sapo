export interface Pageable {
  limit: number;
  offset: number;
  sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
  };
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
