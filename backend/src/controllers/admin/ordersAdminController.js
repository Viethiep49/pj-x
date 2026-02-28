import Order from "../../../models/Order.js";

export const confirmOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = "confirmed";
  await order.save();

  res.json(order);
};

export const completeOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = "completed";
  await order.save();

  res.json(order);
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = "cancelled";
  await order.save();

  res.json(order);
};