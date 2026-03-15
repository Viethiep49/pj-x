import { sequelize, Order, OrderItem, Product, User } from '../../models/index.js';

const generateOrderNumber = () =>
    `ORD${Date.now().toString().slice(-8)}`;

export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { user_id: req.user.id },
            include: [{
                model: OrderItem, as: 'items',
                include: [{ model: Product, as: 'product', attributes: ['name', 'image_url', 'price'] }],
            }],
            order: [['created_at', 'DESC']],
        });
        res.json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

export const createOrder = async (req, res, next) => {
    const t = await sequelize.sequelize.transaction();
    try {
        const { items, delivery_method, shipping_address, receiver_name, receiver_phone, notes } = req.body;

        let total_amount = 0;
        const itemsWithPrice = [];

        for (const item of items) {
            const product = await Product.findByPk(item.product_id);
            if (!product || !product.is_active) {
                await t.rollback();
                return res.status(400).json({ success: false, message: `Product ${item.product_id} unavailable` });
            }
            const unit_price = product.sale_price || product.price;
            const subtotal = unit_price * item.quantity;
            total_amount += subtotal;
            itemsWithPrice.push({ product_id: item.product_id, quantity: item.quantity, unit_price, subtotal });
        }

        const shipping_fee = delivery_method === 'shipping' ? 30000 : 0;

        const order = await Order.create({
            user_id: req.user.id,
            order_number: generateOrderNumber(),
            total_amount: total_amount + shipping_fee,
            delivery_method,
            shipping_address,
            shipping_fee,
            receiver_name,
            receiver_phone,
            notes,
        }, { transaction: t });

        await OrderItem.bulkCreate(
            itemsWithPrice.map(i => ({ ...i, order_id: order.id })),
            { transaction: t }
        );

        await t.commit();
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        await t.rollback();
        next(err);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: 'customer', attributes: ['full_name', 'email', 'phone_number'] },
                { model: OrderItem, as: 'items', include: [{ model: Product, as: 'product', attributes: ['name'] }] },
            ],
            order: [['created_at', 'DESC']],
        });
        res.json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        await order.update({ status: req.body.status });
        res.json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};
