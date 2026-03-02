import express from "express";

import {
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
  getAllAppointmentsForAdmin
} from "../controllers/admin/appointmentsAdminController.js";

import {
  confirmOrder,
  completeOrder,
  cancelOrder
} from "../controllers/admin/ordersAdminController.js";

const router = express.Router();

// GET /api/admin/appointments
router.get("/appointments", getAllAppointmentsForAdmin);

/* appointments */
router.patch("/appointments/:id/confirm", confirmAppointment);
router.patch("/appointments/:id/complete", completeAppointment);
router.patch("/appointments/:id/cancel", cancelAppointment);

/* orders */
router.patch("/orders/:id/confirm", confirmOrder);
router.patch("/orders/:id/complete", completeOrder);
router.patch("/orders/:id/cancel", cancelOrder);

export default router;