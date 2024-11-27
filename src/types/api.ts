export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

export interface ApiError extends BaseResponse {
  error: {
    code: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 