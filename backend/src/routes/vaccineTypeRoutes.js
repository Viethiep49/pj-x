import express from "express";
import { getVaccineTypes } from "../controllers/vaccineTypeController.js";

const router = express.Router();

router.get("/", getVaccineTypes);

export default router;