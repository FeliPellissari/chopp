import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RefreshRequestBody {
  refreshToken: string;
}

export const authController = {
  async login(
    req: Request<unknown, unknown, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: {
            code: "MISSING_CREDENTIALS",
            message: "Email and password are required",
          },
        });
        return;
      }

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async refresh(
    req: Request<unknown, unknown, RefreshRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: {
            code: "MISSING_REFRESH_TOKEN",
            message: "Refresh token is required",
          },
        });
        return;
      }

      const result = await authService.refresh(refreshToken);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(
    req: Request<unknown, unknown, RefreshRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: {
            code: "MISSING_REFRESH_TOKEN",
            message: "Refresh token is required",
          },
        });
        return;
      }

      await authService.logout(refreshToken);

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
