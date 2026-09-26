import { AppError } from "./AppError";

export function errorHandler(error) {
  console.error("[API ERROR]", error);

  if (error instanceof AppError) {
    return Response.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details ? { details: error.details } : {}),
        },
      },
      { status: error.statusCode }
    );
  }

  return Response.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    },
    { status: 500 }
  );
}