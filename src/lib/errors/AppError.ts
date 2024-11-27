export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }

  static BadRequest(message: string, code = 'BAD_REQUEST', details?: unknown) {
    return new AppError(400, code, message, details);
  }

  static NotFound(message: string, code = 'NOT_FOUND', details?: unknown) {
    return new AppError(404, code, message, details);
  }

  static Unauthorized(message: string, code = 'UNAUTHORIZED', details?: unknown) {
    return new AppError(401, code, message, details);
  }

  static ValidationError(details: unknown) {
    return new AppError(400, 'VALIDATION_ERROR', 'Validation failed', details);
  }
} 