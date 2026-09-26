import { AppError } from "../errors/AppError";

export async function validateRequest(request, schema) {
  let body;

  try {
    body = await request.json();
  } catch {
    throw new AppError(
      "Request body must contain valid JSON",
      400,
      "INVALID_JSON"
    );
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }));

    const error = new AppError(
      "Request validation failed",
      400,
      "VALIDATION_ERROR"
    );

    error.details = details;

    throw error;
  }

  return result.data;
}