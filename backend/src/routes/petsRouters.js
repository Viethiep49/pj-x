import express from "express";
import {
  getPets,
  createPet,
  updatePet,
  deletePet
} from "../controllers/petsController.js";

const router = express.Router();

router.get("/", getPets);
router.post("/", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

export default router;