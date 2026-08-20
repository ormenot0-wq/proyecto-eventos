import { Router } from "express";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();

router.post("/login", SessionsController.login);

export default router;