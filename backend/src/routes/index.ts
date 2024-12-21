// src/routes/index.ts
import { Router } from "express";
import { CreateAppUserController } from "../controllers/appUser/CreateAppUserController";
import { ReadAppUserController } from "../controllers/appUser/ReadAppUserController";
import { DashboardController } from "../controllers/dashboard/DashboardController";

import { verifyWalletConnection } from "../middlewares/VerifyWalletConnection";

const router = Router();

router.post("/signup", new CreateAppUserController().handle);
router.get("/profile", verifyWalletConnection, new ReadAppUserController().handle);
router.get("/dashboard", verifyWalletConnection, new DashboardController().handle);

export default router;
