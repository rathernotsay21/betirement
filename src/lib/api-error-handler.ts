import { NextResponse } from 'next/server';

/**
 * Standard API error response structure
 */
export interface ApiErrorResponse {
  error: string;
  message?: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = 'ApiError';

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Common API error types
 */
export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = 'Too Many Requests') {
    super(message, 429);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}

/**
 * Format error response
 */
export function formatErrorResponse(
  error: Error | ApiError,
  path?: string
): ApiErrorResponse {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error.message || 'An unexpected error occurred';

  return {
    error: error.name,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    path,
  };
}

/**
 * Handle API errors and return appropriate NextResponse
 */
export function handleApiError(error: unknown, path?: string): NextResponse {
  // Log error for debugging
  console.error('API Error:', error);

  // Handle known ApiError instances
  if (error instanceof ApiError) {
    const errorResponse = formatErrorResponse(error, path);
    return NextResponse.json(
      {
        error: errorResponse.message,
        success: false,
      },
      { status: error.statusCode }
    );
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    const errorResponse = formatErrorResponse(error, path);
    return NextResponse.json(
      {
        error: errorResponse.message,
        success: false,
      },
      { status: 500 }
    );
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      error: 'An unexpected error occurred',
      success: false,
    },
    { status: 500 }
  );
}

/**
 * Async error handler wrapper for API routes
 * Catches errors and returns formatted error responses
 */
export function withErrorHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

/**
 * Validate request body and throw BadRequestError if invalid
 */
export function validateRequestBody<T>(
  body: any,
  requiredFields: (keyof T)[]
): asserts body is T {
  if (!body || typeof body !== 'object') {
    throw new BadRequestError('Request body is required');
  }

  const missingFields = requiredFields.filter((field) => !(field in body));

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `Missing required fields: ${missingFields.join(', ')}`
    );
  }
}

/**
 * Log error to monitoring service (placeholder for future implementation)
 */
export function logErrorToService(error: Error, context?: Record<string, any>) {
  // TODO: Implement error logging to service like Sentry
  // For now, just log to console
  console.error('Error logged:', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context,
    timestamp: new Date().toISOString(),
  });
}
