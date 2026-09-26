import { errorHandler } from "../errors/errorHandler";
import {
  authenticateUser,
  authorizeRoles,
} from "./authorization";

export function withAuthorization(handler) {
  return async function authorizedHandler(request, context) {
    try {
      const user = authenticateUser(request.user);

      return await handler(request, context, user);
    } catch (error) {
      return errorHandler(error);
    }
  };
}

export function withRoles(roles, handler) {
  return async function roleProtectedHandler(request, context) {
    try {
      const user = authenticateUser(request.user);

      authorizeRoles(...roles)(user);

      return await handler(request, context, user);
    } catch (error) {
      return errorHandler(error);
    }
  };
}
