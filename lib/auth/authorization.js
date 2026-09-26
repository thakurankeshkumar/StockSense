import { AppError } from "../errors/AppError";

export function authenticateUser(user) {
  if (!user) {
    throw new AppError(
      "Authentication required",
      401,
      "UNAUTHORIZED"
    );
  }

  return user;
}

export function authorizeRoles(...allowedRoles) {
  return function authorize(user) {
    authenticateUser(user);

    if (!allowedRoles.includes(user.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
        "FORBIDDEN"
      );
    }

    return user;
  };
}
