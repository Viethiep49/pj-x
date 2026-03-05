import express from "express";
import {
  getAllOrders,
  updateOrderStatus
} from "../../controllers/ordersController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.put("/:id", updateOrderStatus);

export default router;