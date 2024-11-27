export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SingleResponse<T> extends BaseResponse {
  data: T;
}

export interface ErrorResponse extends BaseResponse {
  error: {
    code: string;
    details?: string;
  };
} 