// src/routes/index.ts
import { Router } from "express";
import { CreateAppUserValidateController } from "../controllers/appUserValidate/CreateAppUserValidateController";
import { UpdateAppUserValidateController } from "../controllers/appUserValidate/UpdateAppUserValidateController";
import { AuthAppUserController } from "../controllers/appUser/AuthAccountController";

const router = Router();

router.post("/signup", new CreateAppUserValidateController().handle);
router.get("/signup/confirm", new UpdateAppUserValidateController().handle);
router.get("/session", new AuthAppUserController().handle);


export default router;
