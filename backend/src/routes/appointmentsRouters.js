import express from "express";
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  getAvailableSlots
} from "../controllers/appointmentsController.js";

const router = express.Router();

router.get("/slots", getAvailableSlots);

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);

export default router;