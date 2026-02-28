import { Order, OrderItem } from "../../models/index.js";
import sequelize from "../config/db.js";

/* GET /api/orders */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "items"
        }
      ],
      order: [["created_at", "DESC"]]
    });

    res.json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Get orders failed" });
  }
};

/* GET /api/orders/:id */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: "items"
        }
      ]
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (e) {
    res.status(500).json({ message: "Get order failed" });
  }
};

/* POST /api/orders */
export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      items,
      ...orderData
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "Order items is required" });
    }

    const order = await Order.create(orderData, { transaction: t });

    const orderItems = items.map(i => ({
      ...i,
      order_id: order.id
    }));

    await OrderItem.bulkCreate(orderItems, { transaction: t });

    await t.commit();

    const result = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: "items" }]
    });

    res.status(201).json(result);
  } catch (e) {
    await t.rollback();
    console.error(e);
    res.status(400).json({
      message: "Create order failed",
      error: e.message
    });
  }
};