import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/auth";
import { InvalidTokenError } from "../errors/auth";

/**
 * Middleware factory that restricts access to users with one of the allowed roles.
 *
 * @param allowedRoles - One or more roles permitted to access the route.
 * @returns Express middleware that returns 401 if unauthenticated or 403 if the
 *          user's role is not among the allowed roles.
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new InvalidTokenError("Access token is required"));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new ForbiddenError());
      return;
    }

    next();
  };
};
