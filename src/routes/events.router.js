import { Router } from "express";
import { EventsController } from "../controllers/events.controller.js";

const router = Router();

router.get("/", EventsController.list);
router.post("/", EventsController.create);
router.get("/:id", EventsController.getById);
router.put("/:id", EventsController.update);
router.delete("/:id", EventsController.delete);

export default router;