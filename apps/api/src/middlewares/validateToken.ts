import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InvalidTokenError } from "../errors/auth";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_jwt_secret";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new InvalidTokenError("Access token is required"));
    return;
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch {
    next(new InvalidTokenError());
  }
};
