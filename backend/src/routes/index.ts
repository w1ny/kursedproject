// src/routes/index.ts
import { Router } from "express";
import { CreateAppUserValidateController } from "../controllers/appUserValidate/CreateAppUserValidateController";
import { UpdateAppUserValidateController } from "../controllers/appUserValidate/UpdateAppUserValidateController";
import { AuthAppUserController } from "../controllers/appUser/AuthAppUserController";
import { DetailAppUserController } from "../controllers/appUser/DetailAppUserController";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.post("/signup", new CreateAppUserValidateController().handle);
router.post("/signup/validation", new UpdateAppUserValidateController().handle);
router.post("/session", new AuthAppUserController().handle);
router.get("/user/profile", isAuthenticated, new DetailAppUserController().handle);

export default router;
