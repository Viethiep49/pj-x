import express from "express";
import { updateAppointmentStatus } from "../../controllers/admin/appointmentsAdminController.js";

const router = express.Router();

router.put("/:id", updateAppointmentStatus);

export default router;