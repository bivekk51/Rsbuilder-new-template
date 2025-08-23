// src/utils/errorHandler.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    throw new ApiError(
      error.response.data?.message || 'Server Error',
      error.response.status,
      error.response.data?.code
    );
  } else if (error.request) {
    // Network error
    throw new ApiError('Network Error', 0, 'NETWORK_ERROR');
  } else {
    // Other error
    throw new ApiError(error.message || 'Unknown Error', 0, 'UNKNOWN_ERROR');
  }
};
