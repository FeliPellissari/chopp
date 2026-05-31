import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InvalidTokenError } from "../errors/auth";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_jwt_secret";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const validateToken = (
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
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = payload;
    next();
  } catch {
    next(new InvalidTokenError());
  }
};
