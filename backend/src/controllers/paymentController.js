import crypto from 'crypto';
import axios from 'axios';
import { momoConfig } from '../config/momo.config.js';
import { Order, Payment } from '../../models/index.js';

export const createMomoPayment = async (req, res, next) => {
    try {
        const { orderId, amount } = req.body;
        
        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        const requestId = orderId + '_' + Date.now();
        const orderInfo = `Pay for order ${order.order_number}`;
        const orderGroupId = '';
        const autoCapture = true;
        const extraData = ''; 

        const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${momoConfig.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.redirectUrl}&requestId=${requestId}&requestType=captureWallet`;
        
        const signature = crypto
            .createHmac('sha256', momoConfig.secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode: momoConfig.partnerCode,
            partnerName: "Pawsitive Pet Spa",
            storeId: "PawsitiveStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl: momoConfig.redirectUrl,
            ipnUrl: momoConfig.ipnUrl,
            lang: "vi",
            requestType: "captureWallet",
            autoCapture,
            extraData,
            signature
        };

        const response = await axios.post(momoConfig.endpoint, requestBody);
        
        res.json({ success: true, payUrl: response.data.payUrl });
    } catch (err) {
        console.error('Momo Error:', err.response?.data || err.message);
        next(err);
    }
};

export const handleMomoIPN = async (req, res) => {
    // MoMo calls this URL to notify payment status
    const { orderId, resultCode, message, transId } = req.body;
    
    try {
        const order = await Order.findByPk(orderId);
        if (order && resultCode === 0) {
            await order.update({ status: 'confirmed' });
            await Payment.create({
                user_id: order.user_id,
                order_id: order.id,
                payment_type: 'order',
                amount: order.total_amount,
                payment_method: 'momo',
                status: 'completed',
                transaction_id: transId.toString()
            });
        }
        res.status(204).send();
    } catch (err) {
        console.error('IPN Error:', err);
        res.status(500).send();
    }
};
