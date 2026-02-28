import express from "express";
import {
  getVaccinations,
  createVaccination
} from "../controllers/vaccinationsController.js";

const router = express.Router();

router.get("/", getVaccinations);
router.post("/", createVaccination);

export default router;