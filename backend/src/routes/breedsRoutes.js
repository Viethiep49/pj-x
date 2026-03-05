import express from "express";
import { getAllBreeds, getBreedById } from "../controllers/breedsController.js";

const router = express.Router();

// GET /api/breeds
router.get("/", getAllBreeds);

// GET /api/breeds/:id
router.get("/:id", getBreedById);

export default router;