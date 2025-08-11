export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  pageInfo?: {
    page: number;
    size: number;
    hasNext: boolean;
    totalElements: number;
    totalPages: number;
  };
  result: T;
}
