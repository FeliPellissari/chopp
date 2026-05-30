import { Router } from "express";
import { healthController } from "../controllers/health";

const router = Router();

router.get("/", healthController.check);
router.get("/ready", healthController.readiness);
router.get("/live", healthController.liveness);

export default router;
