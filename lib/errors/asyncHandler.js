import { errorHandler } from "./errorHandler";

export function asyncHandler(handler) {
  return async function wrappedHandler(request, context) {
    try {
      return await handler(request, context);
    } catch (error) {
      return errorHandler(error);
    }
  };
}
