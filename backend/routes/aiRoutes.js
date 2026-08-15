import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { validateAIMessage } from "../validators/aiValidators.js";

const router = express.Router();

router.post("/chat", validateAIMessage, chatWithAI);

export default router;