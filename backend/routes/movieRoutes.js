import { Router } from "express";
import * as movieController from "../controllers/movieController.js";

const router = Router();

router.get("/", movieController.getMovies);
router.post("/", movieController.addMovie);
router.get("/:id", movieController.getMovieById);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

export default router;