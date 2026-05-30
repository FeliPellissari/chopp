import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const healthController = {
  async check(_req: Request, res: Response): Promise<void> {
    try {
      await prisma.$queryRaw`SELECT 1`;

      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: "connected",
      });
    } catch (error) {
      res.status(503).json({
        status: "error",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async readiness(_req: Request, res: Response): Promise<void> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({ ready: true });
    } catch {
      res.status(503).json({ ready: false });
    }
  },

  liveness(_req: Request, res: Response): void {
    res.status(200).json({ alive: true });
  },
};
