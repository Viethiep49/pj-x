import Order from "../models/Order.js";

/**
 * POST /api/orders
 * Create order (User)
 */
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      total_amount,
      delivery_method,
      shipping_address,
      shipping_fee,
      receiver_name,
      receiver_phone,
      notes
    } = req.body;

    const orderNumber = "ORD-" + Date.now();

    const order = await Order.create({
      user_id,
      order_number: orderNumber,
      total_amount,
      delivery_method,
      shipping_address,
      shipping_fee,
      receiver_name,
      receiver_phone,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Order created",
      data: order
    });

  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * GET /api/orders
 * Order history (User)
 */
export const getUserOrders = async (req, res) => {
  try {

    const { user_id } = req.query;

    const orders = await Order.findAll({
      where: { user_id },
      order: [["created_at", "DESC"]]
    });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * GET /api/admin/orders
 * Admin - get all orders
 */
export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.findAll({
      order: [["created_at", "DESC"]]
    });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * PUT /api/admin/orders/:id
 * Admin update order status
 */
export const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    await order.update({
      status
    });

    res.json({
      success: true,
      message: "Order status updated",
      data: order
    });

  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};