export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: {
    code: string;
    details: string;
  };
}

export interface SingleResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

export interface PaginatedResponse<T> extends BaseResponse {
  success: true;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}