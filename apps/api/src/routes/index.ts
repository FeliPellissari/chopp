import { Router } from "express";
import healthRoutes from "./health";
import authRoutes from "./auth";
import { authMiddleware } from "../middlewares/validateToken";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

router.use(authMiddleware);

export default router;
