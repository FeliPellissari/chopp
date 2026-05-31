import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import {
  InvalidCredentialsError,
  InactiveUserError,
  InvalidTokenError,
  TokenRevokedError,
} from "../errors/auth";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_jwt_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";

const ACCESS_TOKEN_EXPIRES_IN = "8h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

const revokedRefreshTokens = new Set<string>();

function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

function verifyRefreshToken(token: string): TokenPayload {
  if (revokedRefreshTokens.has(token)) {
    throw new TokenRevokedError();
  }
  return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.is_active) {
      throw new InactiveUserError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  },

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    let payload: TokenPayload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new InvalidTokenError();
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.is_active) {
      throw new InvalidTokenError();
    }

    const newTokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(newTokenPayload);

    return { accessToken };
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      revokedRefreshTokens.add(refreshToken);
    } catch {
      throw new InvalidTokenError();
    }
  },
};
