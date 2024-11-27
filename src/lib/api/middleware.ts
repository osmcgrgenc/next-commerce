import { NextResponse } from 'next/server';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export function withErrorHandling(handler: Function) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof AppError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            error: {
              code: error.code,
              details: error.details,
            },
          },
          { status: error.statusCode }
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation failed',
            error: {
              code: 'VALIDATION_ERROR',
              details: error.errors,
            },
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Internal Server Error',
          error: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        },
        { status: 500 }
      );
    }
  };
} 