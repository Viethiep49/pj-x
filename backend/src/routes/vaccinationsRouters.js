import express from "express";
import {
  createVaccination,
  getVaccinationsByPet,
} from "../controllers/vaccinationsController.js";

const router = express.Router();

router.post("/", createVaccination);
router.get("/:petId", getVaccinationsByPet);

export default router;