// src/routes/index.ts
import { Router } from "express";
import { CreateUserConfirmationController } from "../controllers/userConfirmation/CreateUserConfirmationController";
import { UpdateUserConfirmationController } from "../controllers/userConfirmation/UpdateUserConfirmationController";

const router = Router();

router.post("/signup", new CreateUserConfirmationController().handle);
router.get("/confirm", new UpdateUserConfirmationController().handle);


export default router;
