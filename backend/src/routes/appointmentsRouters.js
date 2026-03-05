import express from "express";
import {
  createAppointment,
  getAppointments,
  getAvailableSlots
} from "../controllers/appointmentsController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/slots", getAvailableSlots);

export default router;