export interface ApiSuccessResponse<T> {
  error?: string | null;
  data: T;
}

export interface ApiErrorResponse {
  error: string;
  data: null;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
