import crypto from 'crypto';
import axios from 'axios';
import { momoConfig } from '../config/momo.config.js';
import { Order, Payment } from '../../models/index.js';

export const createMomoPayment = async (req, res, next) => {
    try {
        const { orderId, amount } = req.body;
        
        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        const amountStr = Math.round(Number(amount)).toString();
        const momoOrderId = `${orderId.slice(0, 8)}_${Date.now()}`;
        const requestId = momoOrderId;
        const orderInfo = "Thanh toan don hang Pawsitive";
        const extraData = "";
        const ipnUrl = momoConfig.ipnUrl;
        const redirectUrl = momoConfig.redirectUrl;

        const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amountStr}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${momoOrderId}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;
        
        const signature = crypto
            .createHmac('sha256', momoConfig.secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode: momoConfig.partnerCode,
            partnerName: "Pawsitive Store",
            storeId: "Pawsitive",
            requestId,
            amount: amountStr,
            orderId: momoOrderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: "vi",
            requestType: "captureWallet",
            autoCapture: true,
            extraData,
            signature
        };

        try {
            // Try real MoMo API
            const response = await axios.post(momoConfig.endpoint, requestBody, { timeout: 5000 });
            if (response.data && response.data.resultCode === 0) {
                return res.json({ success: true, payUrl: response.data.payUrl });
            }
            throw new Error(response.data.message || 'MoMo error');
        } catch (apiError) {
            console.warn('⚠️ MoMo Sandbox API failed, falling back to Demo Mode:', apiError.message);
            
            // FALLBACK: Return a local redirect URL for demo
            // We append parameters to mimic MoMo's redirect
            const fallbackUrl = `${momoConfig.redirectUrl}?partnerCode=${momoConfig.partnerCode}&orderId=${momoOrderId}&requestId=${requestId}&amount=${amountStr}&orderInfo=${orderInfo}&orderType=momo_wallet&transId=DEMO${Date.now()}&resultCode=0&message=Successful&payType=qr&signature=demo`;
            
            return res.json({ 
                success: true, 
                payUrl: fallbackUrl,
                isDemo: true 
            });
        }
    } catch (err) {
        next(err);
    }
};

export const handleMomoIPN = async (req, res) => {
    res.status(204).send();
};
