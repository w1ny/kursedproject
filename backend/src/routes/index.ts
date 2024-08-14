// src/routes/index.ts
import { Router } from "express";
import { CreateAccountConfirmationController } from "../controllers/accountConfirmation/CreateAccountConfirmationController";
import { UpdateAccountConfirmationController } from "../controllers/accountConfirmation/UpdateAccountConfirmationController";

const router = Router();

router.post("/signup", new CreateAccountConfirmationController().handle);
router.get("/signup/confirm", new UpdateAccountConfirmationController().handle);


export default router;
